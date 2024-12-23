import dbConnect from "@/lib/mongodb";
import Study, { IStudy } from "@/models/Study";
import User, { IUser } from "@/models/User";
import { TCheckListItem, TSchedule, TStudyMember } from "@/types/study";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { sid: string } }
) {
  await dbConnect();

  const studyId = params.sid;

  try {
    const objectId = new mongoose.Types.ObjectId(studyId);

    // studyBoards와 noticeBoards를 populate하여 각 게시판의 정보를 가져옴
    // const study = await Study.findOne({ _id: objectId });
    // // 여기서 populate 하면 에러가 나는 군..?

    console.log("joining Study get Called!");

    const study = await Study.findOne({ _id: objectId })
      .populate("studyBoards") // studyBoards 필드에 참조된 Board 도큐먼트 채우기
      .populate("noticeBoards"); // noticeBoards 필드에 참조된 Board 도큐먼트 채우기

    console.log(study);

    if (!study) {
      return new Response(JSON.stringify({ error: "Study not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(study), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch study" }), {
      status: 500,
    });
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();

  console.log("Joining Study patch called!");

  try {
    const { studyId, userEmail, todoId, done, attendance } =
      await request.json();

    // 유효성 검사 보류
    if (
      !studyId ||
      !userEmail ||
      (attendance === undefined && done === undefined && !todoId) || // 세 값이 모두 없는 경우
      (attendance !== undefined && typeof attendance !== "boolean") ||
      (done !== undefined && typeof done !== "boolean") ||
      (todoId && typeof todoId !== "string")
    ) {
      console.log(`studyId=${studyId}`);
      console.log(`userEmail=${userEmail}`);
      console.log(`attendance=${attendance}`);
      console.log(`todoId=${todoId}`);
      console.log(`done=${done}`);

      return NextResponse.json(
        { message: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    const study = await Study.findById(studyId);
    if (!study) {
      return NextResponse.json({ message: "Study not found" }, { status: 404 });
    }

    // currentMembers에서 해당 userEmail을 가진 멤버를 찾기
    const memberIndex = study.currentMembers.findIndex(
      (member: any) => member.userEmail === userEmail
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { message: "User not found in study" },
        { status: 404 }
      );
    }

    // 출석 상태 업데이트 처리 (attendance가 있을 경우)
    if (attendance !== undefined) {
      await updateAttendance(study._id, memberIndex, attendance);
    }

    // 체크리스트 업데이트 처리 (todoId와 done이 있을 경우)
    if (todoId && done !== undefined) {
      await updateTodoStatus(study, memberIndex, todoId, done);
    }

    await study.save();

    console.log("Study updated!");

    return NextResponse.json(
      { message: "Attendance and/or Todo updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating attendance or todo:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// 출석 상태 업데이트 함수
async function updateAttendance(
  studyId: string,
  memberIndex: number,
  attendance: boolean
) {
  const objectId = new mongoose.Types.ObjectId(studyId);
  const updateQuery: Record<string, any> = {}; // 타입 명시
  updateQuery[`currentMembers.${memberIndex}.attendance`] = attendance;

  await Study.updateOne({ _id: objectId }, { $set: updateQuery });

  console.log(`Updated attendance to: ${attendance}`);
}

// 체크리스트 할 일 상태 업데이트 함수
async function updateTodoStatus(
  study: IStudy,
  memberIndex: number,
  todoId: string,
  done: boolean
) {
  const member = study.currentMembers[memberIndex];
  const todoIndex = member.checkList.findIndex(
    (todo: any) => todo.todoId === todoId
  );

  if (todoIndex === -1) {
    throw new Error("Todo not found");
  }

  member.checkList[todoIndex].done = done;
  console.log(`Updated todo ${todoId} status to: ${done}`);
}

// .. post

const postTodo = async (
  study: IStudy,
  userEmail: string,
  todo: TCheckListItem
) => {
  // console.log("postTodo called!");

  const updatedMembers = study.currentMembers.map((member: TStudyMember) => {
    if (member.userEmail === userEmail) {
      member.checkList.push(todo); // 새로운 todo 추가
    }
    return member;
  });

  // console.log(`updatedMembers`);
  // console.log(updatedMembers);

  try {
    // Study 문서 업데이트
    await study.updateOne(
      { _id: study._id },
      { $set: { currentMembers: updatedMembers } }
    );

    await study.save(); // 중복된 저장 제거

    return NextResponse.json({ message: "Todo added successfully" });
  } catch (error) {
    console.error("Error adding todo:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

const postSchedule = async (
  study: IStudy,
  user: IUser,
  schedule: TSchedule
) => {
  console.log("postSchedule called!");
  console.log(study);
  console.log("schedules");
  console.log(study.schedules);
  try {
    console.log("schedule");
    console.log(schedule);
    study.schedules.push(schedule);
    await study.save();

    user.schedules.push(schedule);
    await user.save();

    return NextResponse.json({ message: "Schedule added successfully" });
  } catch (error) {
    console.error("Error adding schedule to study:", error);
    throw new Error("Failed to add schedule");
  }
};

export async function POST(req: Request) {
  await dbConnect();

  console.log("Joining Study post called!");

  try {
    const { userEmail, todo, studyId, schedule } = await req.json();

    //유효성 검사 new
    if (!studyId || !userEmail) {
      return NextResponse.json(
        { message: "Missing userEmail or studyId" },
        { status: 400 }
      );
    }

    // 해당 사용자에 속한 study 찾기
    const study = await Study.findById(studyId);

    const user = await User.findOne({ email: userEmail });

    if (!study) {
      return NextResponse.json({ message: "Study not found" }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (todo) {
      return await postTodo(study, userEmail, todo);
    }

    if (schedule) {
      return await postSchedule(study, user, schedule);
    }
  } catch (error) {
    console.error("Error adding post:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  console.log("Delete route handler called");

  try {
    const { userEmail, todoId, scheduleId, studyId } = await req.json();

    if (userEmail && todoId) {
      // 해당 사용자에 속한 study 찾기
      const study = await Study.findOne({
        "currentMembers.userEmail": userEmail,
      });

      console.log("study");
      console.log(study);

      if (!study) {
        return NextResponse.json({ error: "Study not found" }, { status: 404 });
      }

      // 해당 사용자의 체크리스트에서 todo를 찾아 삭제
      const updatedMembers = study.currentMembers.map(
        (member: TStudyMember) => {
          if (member.userEmail === userEmail) {
            const updatedCheckList = member.checkList.filter(
              (todo: TCheckListItem) => todo.todoId !== todoId // todoId로 해당 todo 삭제
            );
            member.checkList = updatedCheckList;
          }
          return member;
        }
      );

      // Study 문서 업데이트
      await study.updateOne(
        { _id: study._id },
        { $set: { currentMembers: updatedMembers } }
      );

      await study.save();
      return NextResponse.json({ message: "Todo deleted successfully" });
    } else if (userEmail && scheduleId && studyId) {
      console.log("delete schedule called!");

      const studyDocumentId = new mongoose.Types.ObjectId(studyId);

      // 해당 스터디를 찾기
      const study = await Study.findById(studyDocumentId);
      if (!study) {
        return NextResponse.json(
          { message: "Study not found" },
          { status: 404 }
        );
      }

      // 해당 스터디에서 스케줄을 삭제
      const updatedSchedules = study.schedules.filter(
        (schedule: TSchedule) => schedule.scheduleId !== scheduleId // scheduleId가 일치하지 않는 항목만 남김
      );

      // 만약 schedules 배열에 해당 scheduleId가 없으면
      if (updatedSchedules.length === study.schedules.length) {
        return NextResponse.json(
          { message: "Schedule not found in study" },
          { status: 404 }
        );
      }

      // 스케줄 삭제 후, 해당 study의 schedules 배열을 업데이트
      study.schedules = updatedSchedules;

      // 스터디 문서 저장
      await study.save();

      const user = await User.findOne({ email: userEmail });

      console.log("foundUser");
      console.log(user);

      const updatedUserSchedules = user.schedules.filter(
        (schedule: TSchedule) => schedule.scheduleId !== scheduleId // scheduleId가 일치하지 않는 항목만 남김
      );

      // 만약 schedules 배열에 해당 scheduleId가 없으면
      if (updatedUserSchedules.length === user.schedules.length) {
        return NextResponse.json(
          { message: "Schedule not found in user" },
          { status: 404 }
        );
      }

      user.schedules = updatedUserSchedules;

      await user.save();

      // 성공적으로 삭제된 경우 응답
      return NextResponse.json({ message: "Schedule deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { studyId, status } = await req.json();
    const studyDocumentId = new mongoose.Types.ObjectId(studyId);

    // 해당 스터디를 찾기
    const study = await Study.findById(studyDocumentId);

    study.status = "ongoing";

    await study.save();

    return NextResponse.json({
      message: "Study started successfully",
    });
  } catch (error) {
    console.error("Error start study:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
