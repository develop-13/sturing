import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  await dbConnect(); // MongoDB 연결

  const session = await getServerSession(authOptions);
  // next auth에서는 로그인이 성공할 시 세션이 자동으로 업데이트 되므로
  // 따로 post로 사용자 정보를 보내줄 필요가 없다고 함ㄴ

  if (!session) {
    console.log("session 없음");
    return NextResponse.json({ message: "로그인 필요" }, { status: 401 });
  }

  const userEmail = session.user?.email;

  console.log("api permitted");

  const existingUser = await User.findOne({ email: userEmail });

  if (!existingUser) {
    // 새로운 사용자 추가
    const newUser = new User({
      email: userEmail,
      name: session.user?.name,
      // 필요한 추가 필드들을 설정
      createdAt: new Date(),
      matchingInfo: {
        interests: [],
        fieldLevels: {},
        studyTypePreference: "not_decided",
        studyPlacePreference: {},
        studyAtmospherePreference: {},
      },
      recentQueries: [],
      recentViewedStudies: [],
      study_in_participants: [],
      schedules: [],
      watchList: [],
      Accepted_applies: [],
      applies: [],
    });

    await newUser.save();
    console.log(newUser);
    return NextResponse.json(newUser);
  }
  console.log(existingUser);
}
