import dbConnect from "@/lib/mongodb";
import {
  getNewStudies,
  getPopularStudies,
  getUserInterestStudies,
  getUserCloseStudies,
} from "@/lib/studyUtils";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(request: Request, res: NextResponse) {
  console.log("recommend api 호출");
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const studyType = searchParams.get("studyType"); // 'studyType' 쿼리 파라미터 가져오기
  const email = searchParams.get("userEmail"); // 'email' 쿼리 파라미터 가져오기

  // console.log(`studyType=${studyType} email=${email}`);

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

    console.log("야 왜 안되냐");

    if (!existingUser) {
      return NextResponse.json(
        { message: "존재하지 않는 사용자 입니다." },
        { status: 400 }
      );
    }

    const userMatchingInfo = existingUser.matchingInfo;

    console.log("userMatchingInfo");
    console.log(userMatchingInfo);

    const userInterestingStudies = await getUserInterestStudies(
      userMatchingInfo
    ); // 사용자 관심 스터디

    console.log("userInterestingStudies");
    console.log(userInterestingStudies.length);

    const userCloseStudies = await getUserCloseStudies(userMatchingInfo); // 주변 스터디

    return NextResponse.json(
      { firstStudies: userInterestingStudies, secondStudies: userCloseStudies },
      { status: 200 }
    );
  }

  // studyType이 잘못된 경우
  return NextResponse.json({ message: "invalid req" }, { status: 400 });
}
