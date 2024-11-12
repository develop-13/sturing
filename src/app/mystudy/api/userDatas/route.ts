import Apply from "@/models/Apply"; // Apply 모델을 추가로 import
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: Request) {
  console.log("API called");
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
    return NextResponse.json(
      { message: "User email is required" },
      { status: 400 }
    );
  }

  try {
    console.log("email exist!");

    // User 문서 조회 및 연관된 데이터 populate
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

    console.log(user);
    console.log("user");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 필요한 데이터만 응답으로 보내기
    return NextResponse.json({
      studies: {
        active: user.study_in_participants.filter(
          (study: any) => study.status === "recruiting" || "in progress"
        ),
        completed: user.study_in_participants.filter(
          (study: any) => study.status === "completed"
        ),
      },
      acceptedApplies: user.accepted_applies,
      pendingApplies: user.applies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
