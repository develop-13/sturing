import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await dbConnect();

  console.log("/joiningStudy/[sid]/api/route.ts called");

  const { searchParams } = new URL(req.url);
  const studyId = searchParams.get("sid") || "";

  console.log(`studyId=${studyId}`);
  console.log(typeof studyId);

  try {
    const objectId = new mongoose.Types.ObjectId(studyId);

    const study = await Study.findOne({ _id: objectId });

    console.log(study);

    if (!study) {
      return new Response(JSON.stringify({ error: "Study not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(study), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Study not found" }), {
      status: 404,
    });
  }
}

export async function PATCH(request: NextRequest) {
  await dbConnect();

  console.log("Joining Study patch called!");

  try {
    const { studyId, userEmail, attendance } = await request.json();

    // 유효성 검사
    if (!studyId || !userEmail || typeof attendance !== "boolean") {
      return NextResponse.json(
        { message: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    console.log(`studyId=${studyId}`);
    console.log(`userEmail=${userEmail}`);
    console.log(`attendance=${attendance}`);

    const study = await Study.findById(studyId);
    if (!study) {
      return NextResponse.json({ message: "Study not found" }, { status: 404 });
    }

    console.log("study");
    console.log(study);

    // currentMembers에서 해당 userEmail을 가진 멤버를 찾고 attendance 값을 수정
    const memberIndex = study.currentMembers.findIndex(
      (member: any) => member.userEmail === userEmail
    );

    if (memberIndex === -1) {
      return NextResponse.json(
        { message: "User not found in study" },
        { status: 404 }
      );
    }

    // attendance 값 변경
    study.currentMembers[memberIndex].attendance = attendance;
    await study.save();

    console.log("saved!");

    return NextResponse.json(
      { message: "Attitude updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating attendance:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
