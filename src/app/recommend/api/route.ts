import dbConnect from "@/lib/mongodb";
import {
  getNewStudies,
  getPopularStudies,
  getUserInterestStudies,
  getUserCloseStudies,
} from "@/lib/studyUtils";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { NextApiResponse } from "next";

export async function GET(request: Request, res: NextResponse) {
  // const popularStudies = await getPopularStudies();
  // const newStudies = await getNewStudies();

  await dbConnect();

  const { searchParams } = new URL(request.url);
  const studyType = searchParams.get("studyType"); // 'studyType' 쿼리 파라미터 가져오기
  const email = searchParams.get("userEmail"); // 'email' 쿼리 파라미터 가져오기

  console.log(`studyType=${studyType} email=${email}`);

  if (studyType === "common") {
    // common 스터디를 가져옴 (인기 스터디와 새로 개설된 스터디)
    const [popularStudies, newStudies] = await Promise.all([
      await getPopularStudies(), // 인기 스터디 가져오는 함수
      await getNewStudies(), // 새로 개설된 스터디 가져오는 함수
    ]);

    return NextResponse.json(
      { firstStudies: popularStudies, secondStudies: newStudies },
      { status: 200 }
    );
  } else if (studyType === "userMatching") {
    // 사용자 맞춤형 스터디를 가져옴 (관심 스터디와 주변 스터디)

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자 입니다." },
        { status: 400 }
      );
    }

    const userMatchingInfo = existingUser.matchingInfo;

    const userInterestingStudies = await getUserInterestStudies(
      userMatchingInfo
    ); // 사용자 관심 스터디
    const userCloseStudies = await getUserCloseStudies(userMatchingInfo); // 주변 스터디

    return NextResponse.json(
      { firstStudies: userInterestingStudies, secondStudies: userCloseStudies },
      { status: 200 }
    );
  }

  // studyType이 잘못된 경우
  return NextResponse.json({ message: "invalid req" }, { status: 400 });
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

    return NextResponse.json({ status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to handle user document" },
      { status: 500 }
    );
  }
}
