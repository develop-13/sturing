import dbConnect from "@/lib/mongodb";
import {
  getNewStudies,
  getPopularStudies,
  getUserInterestStudies,
  getUserCloseStudies,
} from "@/lib/studyUtils";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// export async function GET(request: Request, res: NextResponse) {
export async function GET(request: NextRequest, res: NextResponse) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const studyType = searchParams.get("studyType"); // 'studyType' 쿼리 파라미터 가져오기

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

    try {
      const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        return NextResponse.json(
          { message: "token not exist, not logged In" },
          { status: 400 }
        );
      }

      const existingUser = await User.findOne({ userId: token.sub });
      // token.sub으로 찾아야 할 듯

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
        {
          firstStudies: userInterestingStudies,
          secondStudies: userCloseStudies,
        },
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { message: "error from jwt decode" },
        { status: 400 }
      );
    }
  }

  // studyType이 잘못된 경우
  return NextResponse.json({ message: "invalid req" }, { status: 400 });
}
