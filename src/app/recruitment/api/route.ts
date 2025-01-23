import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import { uploadImagesToCloudinary } from "@/lib/cloudinary";
import { SessionUser } from "@/app/utils/authOptions";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    // MongoDB 연결
    await dbConnect();

    // FormData 파싱
    const formData = await req.formData();
    // formData의 타입은 formData 타입

    const file = formData.get("studyImgSrc");

    if (!file) {
      NextResponse.json({ error: "file Data missing" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      // file의 타입은 FormDataEntryValue | null
      //FormDataEntryValue 는 string 과 File 타입
      // 즉, file의 타입은 string | File | null
      console.log("error happend because of file type");
      return NextResponse.json({ error: "Invalid file data" }, { status: 400 });
    }

    const studyDataString = formData.get("studyData") as string | null;
    const userString = formData.get("user") as string;
    const user: SessionUser = JSON.parse(userString);

    console.log("studyDataString");
    console.log(studyDataString);

    if (!studyDataString) {
      return NextResponse.json(
        { error: "Study data is required" },
        { status: 400 }
      );
    }

    const studyData = JSON.parse(studyDataString);
    const imageUrl = await uploadImagesToCloudinary(
      file,
      "sturing/studyImages"
    );

    const me = {
      userEmail: user.email,
      userName: user.name,
      applicantImgSrc: user.image,
      role: "team_leader",
      attendance: false, // 당일 출석 여부
      checkList: [],
    };

    // Mongoose 모델 사용하여 데이터 저장
    const studyDocument = new Study({
      ...studyData,
      imgSrc: imageUrl[0],
      status: "recruiting",
      currentMembers: [me],
    });

    const userDoc = await User.findOne({ email: user.email });

    userDoc.study_in_participants.push(studyDocument._id);

    userDoc.save();

    const savedStudy = await studyDocument.save().catch((error: unknown) => {
      if (error instanceof Error) {
        console.error("Error saving study document:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      // 추가적인 에러 핸들링
    });

    return NextResponse.json({
      message: "Study created successfully",
      imageUrl,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create study" },
      { status: 500 }
    );
  }
}
