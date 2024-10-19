import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getRecommendedStudies } from "@/lib/matchingUtils";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// POST 요청 처리 함수
export async function POST(req: Request) {
  await dbConnect(); // MongoDB 연결

  try {
    const { userMatchingInfo, email } = await req.json(); // 요청에서 JSON 데이터 파싱

    console.log("사용자 매칭 정보 받음 - matching/api 호출");
    console.log(userMatchingInfo);

    // 사용자의 매칭 정보를 해당 사용자의 user 도큐먼트에 저장
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    existingUser.matchingInfo = userMatchingInfo;
    await existingUser.save();

    // 사용자의 매칭 정보에 맞춰 스터디 추천
    const recommendedStudies = await getRecommendedStudies(userMatchingInfo);

    // 세션 가져오기 (getServerSession 사용)
    console.log("matching/api-post에서 세션을 요청합니다");
    const session = await getServerSession(authOptions);
    console.log("matching/api-post에서 가져온 session");
    console.log(session);

    const nextResponse = NextResponse.json(recommendedStudies);
    return nextResponse; // JSON 응답
  } catch (error) {
    console.error("스터디 추천 중 오류 발생:", error);
    return NextResponse.json(
      { error: "스터디 추천에 실패했습니다." },
      { status: 500 }
    );
  }
}
