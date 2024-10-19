import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongodb";
import { getNewStudies, getPopularStudies } from "@/lib/studyUtils";
import User from "@/models/User";
import { TUser } from "@/types/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(reqeust: Request) {
  // const popularStudies = await getPopularStudies();
  // const newStudies = await getNewStudies();

  try {
    // 여러 개의 데이터를 병렬로 가져오기
    const [popularStudies, newStudies] = await Promise.all([
      await getPopularStudies(),
      await getNewStudies(),
    ]);
    // 모든 데이터를 응답으로 반환
    return NextResponse.json({
      popularStudies,
      newStudies,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
export async function POST(req: Request) {
  await dbConnect();

  const session = await getServerSession(); // 세션 정보 가져오기
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userEmail = session.user.email;
  const userName = session.user.name;

  try {
    let existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      // DB에 사용자 정보가 없으면 생성
      existingUser = await User.create({
        email: userEmail,
        name: userName,
        matchingInfo: null,
        recentQueries: [],
        recentViewedStudies: [],
        study_in_participants: [],
        schedules: [],
        watchList: [],
        Accepted_applies: [],
        applies: [],
      });
    }

    // 매칭 정보가 있는지 확인
    const hasMatchingInfo = !!existingUser.matchingInfo;

    return NextResponse.json({ hasMatchingInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to handle user document" },
      { status: 500 }
    );
  }
}
