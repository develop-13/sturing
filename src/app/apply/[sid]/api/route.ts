import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Apply from "@/models/Apply";
import mongoose from "mongoose";
import Study from "@/models/Study";

// User 도큐먼트의 applyInfo에 applyId 추가
export async function POST(
  req: NextRequest,
  context: { params: { sid: string } }
) {
  await dbConnect(); // MongoDB 연결

  try {
    // console.log(req.url);

    const { applyInfo, userEmail, userName } = await req.json();
    const studyId = context.params.sid; // URL 경로 파라미터에서 studyId 가져옴

    const studyObjectId = new mongoose.Types.ObjectId(studyId);

    if (!studyObjectId) {
      return NextResponse.json(
        { message: "Study ID not provided" },
        { status: 400 }
      );
    }
    // console.log("applyInfo");
    // console.log(applyInfo);

    // console.log("userEmail");
    // console.log(userEmail);

    // console.log("userName");
    // console.log(userName);

    // console.log("searchParams");
    // console.log(searchParams);

    // const studyId = searchParams.get("sid") || "";

    // console.log("studyId");
    // console.log(studyId);

    // `userEmail`로 사용자 찾기
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // studyId를 통해 Study를 찾기
    const study = await Study.findById(studyObjectId);
    if (!study) {
      return NextResponse.json({ message: "Study not found" }, { status: 404 });
    }

    // Apply 문서 생성 후 저장
    const newApply = new Apply({
      userEmail: userEmail,
      userName: userName,
      applicantNickname: user.name,
      applicantImgSrc: user.imgSrc,
      studyId: study._id,
      title: applyInfo.applicationTitle,
      content: applyInfo.commitment,
      desiredRole: applyInfo.desiredRole,
      status: "pending",
      // Study 문서에서 가져온 필드 추가
      applicationDate: new Date(), // 현재 날짜로 설정
      studyType: study.type, // Study의 type 필드
      studyStartDate: study.period.startDate, // Study의 시작 날짜
      studyEndDate: study.period.endDate, // Study의 종료 날짜
      studyLocation: study.location, // Study의 장소
      studyTitle: study.title, // Study의 제목
    });

    await newApply.save();

    // 사용자의 applies 필드에 applyId 추가
    user.applies.push(newApply._id);
    await user.save();

    // 스터디 생성자의 accepted_applies 필드에 새 Apply 추가
    const creator = await User.findOne({ email: study.creatorEmail });
    if (creator) {
      creator.accepted_applies.push(newApply._id);
      await creator.save();
    }

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
