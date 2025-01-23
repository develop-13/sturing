import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: Request) {
  // 사용자가 매칭정보를 설정했는지여부를 알려줌

  const { searchParams } = new URL(request.url);

  const userEmail = searchParams.get("userEmail");

  if (!userEmail) {
    return Response.json({
      message: "사용자 이메일값이 없습니다",
      status: 400,
    });
  }

  try {
    const existingUser = await User.findOne({ email: userEmail });

    if (!existingUser) {
      return Response.json(
        { message: "존재하지 않는 사용자 입니다." },
        { status: 400 }
      );
    }

    const userMatchingInfo = existingUser.matchingInfo;
    return Response.json(
      { hasMatchingInfo: !!userMatchingInfo },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      { message: "DB통신 오류 발생 from 'user/api' " },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  const { userEmail, userName, userImg } = await request.json();

  if (!userEmail || !userName) {
    return Response.json(
      { message: "사용자 정보가 부족합니다." },
      { status: 400 }
    );
  }

  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 스키마 조정 - userId 추가

    if (!token?.sub) {
      return Response.json(
        { error: "not logged In , userId not exist " },
        { status: 400 }
      );
    }

    let existingUser = await User.findOne({ userId: token.sub });
    // DB에 존재하는 사용자인지 확인
    // existingUser 을 userId가 token.sub 인 걸로 추적

    if (!existingUser) {
      // DB에 사용자 정보가 없으면 생성
      // 이때 userId에는 token.sub
      existingUser = await User.create({
        userId: token.sub,
        email: userEmail,
        name: userName,
        imgSrc: userImg || "/img/profile/defaultProfileImage.png",
        matchingInfo: null,
        recentQueries: [],
        recentViewedStudies: [],
        study_in_participants: [],
        schedules: [],
        watchList: [],
        Accepted_applies: [],
        applies: [],
      });
      return Response.json(
        { hasUser: true, hasMatchingInfo: false },
        { status: 200 }
      );
    }

    const matchingInfo = existingUser.matchingInfo;
    // 사용자의 매칭 정보

    if (matchingInfo) {
      // 사용자의 매칭 정보가 있다면 매칭 정보도 있고 사용자 정보도 있음을 알림
      return Response.json(
        { hasUser: true, hasMatchingInfo: true },
        { status: 200 }
      );
    } else {
      // 사요자의 매칭 정보가 없다면 사용자정보는 있지만 사요자의 매칭 정보는 없음을 알림
      return Response.json(
        { hasUser: true, hasMatchingInfo: false },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      { error: "Failed to handle user document from 'user/api' " },
      { status: 500 }
    );
  }
}
