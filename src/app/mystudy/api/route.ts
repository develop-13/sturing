import Apply from "@/models/Apply";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { TApply } from "@/types/apply"; // TApply 타입을 임포트
import Study from "@/models/Study";
import { TStudy } from "@/types/study";

export async function GET(request: NextRequest) {
  console.log("API GET called");
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("userEmail");
  const type = searchParams.get("type");
  const applyId = searchParams.get("applyId");

  try {
    // Apply 도큐먼트 조회 (applyId가 존재하는 경우)
    if (applyId) {
      return await fetchApplyById(applyId);
    }

    // User 도큐먼트 조회 (type과 userEmail이 존재하는 경우)
    if (userEmail && type) {
      return await fetchUserDataByType(userEmail, type);
    }

    // 적합한 파라미터가 없는 경우
    return NextResponse.json(
      { message: "Invalid request: Missing parameters" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Apply 도큐먼트 조회 함수
async function fetchApplyById(applyId: string) {
  if (!mongoose.Types.ObjectId.isValid(applyId)) {
    return NextResponse.json(
      { message: "Invalid Apply ID format" },
      { status: 400 }
    );
  }

  const applyData = await Apply.findById(new mongoose.Types.ObjectId(applyId));
  console.log("applyData");
  console.log(applyData);
  if (!applyData) {
    return NextResponse.json(
      { message: "Apply document not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(applyData, { status: 200 });
}

// User 데이터 조회 함수
async function fetchUserDataByType(userEmail: string, type: string) {
  const user = await User.findOne({ email: userEmail });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  switch (type) {
    case "joinedStudy":
      console.log("getJoinedStudy called");
      // return NextResponse.json(user.study_in_participants, { status: 200 });
      const populatedUser = await User.findOne({ email: userEmail }).populate({
        path: "study_in_participants",
      });

      if (!populatedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      const recrutingStudies = populatedUser.study_in_participants.filter(
        (study: TStudy) => study.status == "recruiting"
      );

      const onGoingStudies = populatedUser.study_in_participants.filter(
        (study: TStudy) => study.status == "in progress"
      );

      const studies = { recrutingStudies, onGoingStudies };

      return NextResponse.json(studies, {
        status: 200,
      });

    case "accepted_applies": {
      // Populate applies to include all fields of the Apply document
      const populatedUser = await User.findOne({ email: userEmail }).populate({
        path: "accepted_applies",
      });

      if (!populatedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(populatedUser.accepted_applies, { status: 200 });
    }
    case "applies": {
      // Populate applies to include all fields of the Apply document
      const populatedUser = await User.findOne({ email: userEmail }).populate({
        path: "applies",
      });

      if (!populatedUser) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(populatedUser.applies, { status: 200 });
    }

    default:
      return NextResponse.json(
        { message: "Invalid type parameter" },
        { status: 400 }
      );
  }
}
// Apply 도큐먼트를 업데이트하는 POST 핸들러
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    console.log("Post handler called!");

    // 요청 본문에서 TApply 객체를 파싱
    const applyUpdateData: TApply = await request.json();
    const {
      _id,
      userEmail,
      studyId,
      userName,
      applicantImgSrc,
      desiredRole,
      ...updateData
    } = applyUpdateData;

    // _id 및 studyId의 유효성 검사
    if (!_id || !mongoose.Types.ObjectId.isValid(_id) || !studyId) {
      return NextResponse.json(
        { message: "Invalid or missing Apply ID or Study ID" },
        { status: 400 }
      );
    }

    // 사용자를 찾고 applies 배열에서 지원 문서 제거
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // applies 배열에서 해당 지원 도큐먼트 제거
    const applyObjectId = new mongoose.Types.ObjectId(_id);
    user.applies = user.applies.filter(
      (applyId: mongoose.Types.ObjectId) => !applyId.equals(applyObjectId)
    );

    // studyId로 Study 도큐먼트를 찾아서 해당 사용자의 study_in_participants 필드에 추가
    const study = await Study.findById(new mongoose.Types.ObjectId(studyId));
    if (!study) {
      return NextResponse.json(
        { message: "Study document not found" },
        { status: 404 }
      );
    }

    // study_in_participants에 스터디 추가
    user.study_in_participants.push(study._id);
    await user.save();

    console.log("study in participants added!");

    // Study 도큐먼트의 currentMembers 필드에 { userEmail, applicantImgSrc, desiredRole } 추가
    console.log(desiredRole);
    const newMember = {
      userEmail,
      applicantImgSrc,
      userName,
      role: desiredRole[0],
    };
    console.log("newMember");
    console.log(newMember);
    const isMemberAlreadyAdded = study.currentMembers.some(
      (member: any) =>
        member.userName === userName &&
        member.userEmail === userEmail &&
        member.applicantImgSrc === applicantImgSrc &&
        JSON.stringify(member.desiredRole) === JSON.stringify(desiredRole)
    );

    if (!isMemberAlreadyAdded) {
      study.currentMembers.push(newMember);
      await study.save();
    }

    console.log("User added to Study currentMembers!");

    applyUpdateData.status = "accepted";

    // Apply 도큐먼트 찾고 업데이트
    const updatedApply = await Apply.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      applyUpdateData,
      { new: true }
    );

    console.log("Apply updated!");

    if (!updatedApply) {
      return NextResponse.json(
        { message: "Apply document not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message:
          "Apply updated successfully, user and study documents modified",
        updatedApply,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating apply data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  await dbConnect();

  console.log("delete handler called");

  try {
    // 요청 본문에서 applyId를 받아옵니다.
    const { applyId } = await request.json();

    if (!applyId) {
      return NextResponse.json(
        { message: "Apply ID is required" },
        { status: 400 }
      );
    }

    // applyId를 ObjectId 형식으로 변환
    if (!mongoose.Types.ObjectId.isValid(applyId)) {
      return NextResponse.json(
        { message: "Invalid Apply ID format" },
        { status: 400 }
      );
    }
    const applyObjectId = new mongoose.Types.ObjectId(applyId);

    // Apply 문서를 삭제합니다.
    const deletedApply = await Apply.findOneAndDelete({ _id: applyObjectId });

    if (!deletedApply) {
      return NextResponse.json(
        { message: "Apply document not found" },
        { status: 404 }
      );
    }
    console.log("study found!");

    return NextResponse.json(
      { message: "Apply deleted successfully", deletedApply },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting apply:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
