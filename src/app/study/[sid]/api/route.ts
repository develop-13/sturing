import mongoose from "mongoose";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import { TStudyDetail } from "@/types/study";

export async function GET(req: NextRequest) {
  await dbConnect();

  console.log("study/[sid]/api/route.ts called");

  const { searchParams } = new URL(req.url);
  const studyId = searchParams.get("sid") || "";

  console.log(`studyId=${studyId}`);
  console.log(typeof studyId);

  try {
    // studyId를 ObjectId로 변환
    const objectId = new mongoose.Types.ObjectId(studyId);

    // Study 문서에서 필요한 필드만 선택
    const study: TStudyDetail | null = await Study.findOne(
      { _id: objectId },
      {
        _id: 1,
        type: 1,
        categories: 1,
        title: 1,
        imgSrc: 1,
        dayOfWeek: 1,
        maxMembersNum: 1,
        time: 1,
        tasks: 1,
        location: 1,
        atmospheres: 1,
        currentMembers: 1,
        necessaryRoles: 1,
        preferentialAge: 1,
        preferentialLevel: 1,
        rate: 1,
        "period.startDate": 1,
        "period.endDate": 1,
      }
    );

    console.log("study");
    console.log(study);

    if (!study) {
      return new Response(JSON.stringify({ error: "Study not found" }), {
        status: 404,
      });
    }
    // 응답으로 Study 데이터를 보냄
    return new Response(JSON.stringify(study), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Study not found" }), {
      status: 404,
    });
  }
}
