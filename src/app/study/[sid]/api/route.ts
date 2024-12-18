import mongoose, { Types } from "mongoose";
import { NextRequest } from "next/server";
import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import { TStudyDetail } from "@/types/study";
import User from "@/models/User";
import { TStatus } from "@/types/apply";

export async function GET(
  req: NextRequest,
  { params }: { params: { sid: string } }
) {
  await dbConnect();

  const studyId = params.sid;

  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");

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
        createdAt: 1,
        applyCount: 1,
        score: 1,
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

    let status: TStatus = "notApplied";
    const user = await User.findOne({ email: userEmail });

    if (user) {
      const hasJoined = user.study_in_participants?.some(
        (participant: Types.ObjectId) => participant.equals(objectId)
      );

      const hasApplied = user.applies?.some((apply: Types.ObjectId) =>
        apply.equals(objectId)
      );

      if (hasJoined) {
        status = "joined";
      } else if (hasApplied) {
        status = "hasApplied";
      }
    }

    console.log(`study`);
    console.log(study);

    console.log(`status=${status}`);

    if (!study) {
      return new Response(JSON.stringify({ error: "Study not found" }), {
        status: 404,
      });
    }

    if (!study) {
      return new Response(JSON.stringify({ error: "Study not found" }), {
        status: 404,
      });
    }
    // 응답으로 Study 데이터를 보냄
    return new Response(
      JSON.stringify({ study, status }), // Combine study and hasApplied in the response
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Study not found" }), {
      status: 404,
    });
  }
}
