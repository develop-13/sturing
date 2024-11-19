import Apply from "@/models/Apply";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { TApply } from "@/types/apply"; // TApply 타입을 임포트
import Study from "@/models/Study";

export async function GET(request: NextRequest) {
  console.log("API called");
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("userEmail");
  const applyId = searchParams.get("applyId");
  console.log(`userEmail=${userEmail}`);
  console.log(`applyId=${applyId}`);

  try {
    // Apply 도큐먼트 조회 (applyId가 존재하는 경우)
    if (applyId) {
      return await fetchApplyById(applyId);
    }

    // User 도큐먼트 조회 (applyId가 없는 경우)
    if (userEmail) {
      return await fetchUserStudies(userEmail);
    }

    // userEmail이나 applyId가 없는 경우
    return NextResponse.json(
      { message: "User email or Apply ID is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Apply 도큐먼트 조회 함수
async function fetchApplyById(applyId: string) {
  console.log("fetchApplyById called!");

  if (!mongoose.Types.ObjectId.isValid(applyId)) {
    return NextResponse.json(
      { message: "Invalid Apply ID format" },
      { status: 400 }
    );
  }

  const applyData = await Apply.findById(new mongoose.Types.ObjectId(applyId));
  if (!applyData) {
    return NextResponse.json(
      { message: "Apply document not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(applyData, { status: 200 });
}

// User 도큐먼트 조회 함수
async function fetchUserStudies(userEmail: string) {
  console.log("fetchUserStudies called!");
  const user = await User.findOne({ email: userEmail })
    .populate({
      path: "study_in_participants",
      select:
        "title status categories maxMembersNum currentMembers startDate endDate",
    })
    .populate({
      path: "applies",
    })
    .populate({
      path: "accepted_applies",
    });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // 반환할 데이터 객체
  const responseData = {
    studies: {
      active: user.study_in_participants.filter(
        (study: any) =>
          study.status === "recruiting" || study.status === "in progress"
      ),
      completed: user.study_in_participants.filter(
        (study: any) => study.status === "completed"
      ),
    },
    acceptedApplies: user.accepted_applies,
    pendingApplies: user.applies,
  };

  return NextResponse.json(responseData, { status: 200 });
}

// Apply 도큐먼트를 업데이트하는 POST 핸들러
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    console.log("Post handler called!");

    // 요청 본문에서 TApply 객체를 파싱
    const applyUpdateData: TApply = await request.json();
    const { _id, userEmail, studyId, ...updateData } = applyUpdateData;

    // _id 및 studyId의 유효성 검사
    if (!_id || !mongoose.Types.ObjectId.isValid(_id) || !studyId) {
      return NextResponse.json(
        { message: "Invalid or missing Apply ID or Study ID" },
        { status: 400 }
      );
    }

    updateData.status = "accepted";

    // Apply 도큐먼트 찾고 업데이트
    const updatedApply = await Apply.findByIdAndUpdate(
      new mongoose.Types.ObjectId(_id),
      updateData,
      { new: true }
    );

    console.log("Apply updated!");

    if (!updatedApply) {
      return NextResponse.json(
        { message: "Apply document not found" },
        { status: 404 }
      );
    }

    // 사용자를 찾고 applies 배열에서 지원 문서 제거
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // applies 배열에서 해당 지원 도큐먼트 제거
    // _id를 ObjectId로 변환하여 비교
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

    return NextResponse.json(
      {
        message: "Apply updated successfully and user document modified",
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
