import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Apply from "@/models/Apply";
import mongoose from "mongoose";

// User 도큐먼트의 applyInfo에 applyId 추가
export async function POST(
  req: NextRequest,
  context: { params: { sid: string } }
) {
  await dbConnect(); // MongoDB 연결

  try {
    console.log(req.url);

    const { applyInfo, userEmail } = await req.json();
    const studyId = context.params.sid; // URL 경로 파라미터에서 studyId 가져옴

    const studyObjectId = new mongoose.Types.ObjectId(studyId);

    if (!studyObjectId) {
      return NextResponse.json(
        { message: "Study ID not provided" },
        { status: 400 }
      );
    }
    console.log("applyInfo");
    console.log(applyInfo);

    console.log("userEmail");
    console.log(userEmail);

    // console.log("searchParams");
    // console.log(searchParams);

    // const studyId = searchParams.get("sid") || "";

    console.log("studyId");
    console.log(studyId);

    // `userEmail`로 사용자 찾기
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Apply 문서 생성 후 저장
    const newApply = new Apply({
      userEmail: userEmail,
      studyId: studyId,
      title: applyInfo.applicationTitle,
      content: applyInfo.commitment,
      desiredRole: applyInfo.desiredRole,
      status: "pending",
    });
    await newApply.save();

    // 사용자의 applies 필드에 applyId 추가
    user.applies.push(newApply._id);
    await user.save();

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
