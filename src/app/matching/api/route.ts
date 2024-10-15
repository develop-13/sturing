import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { getRecommendedStudies } from "@/lib/matchingUtils";

// POST 요청 처리 함수
export async function POST(req: Request) {
  await dbConnect(); // MongoDB 연결

  try {
    const body = await req.json(); // 요청에서 JSON 데이터 파싱
    const userMatchingInfo = body;

    console.log("Received user matching info:", userMatchingInfo);

    // 사용자의 매칭 정보에 맞춰 스터디 추천
    const recommendedStudies = await getRecommendedStudies(userMatchingInfo);

    const nextResponse = NextResponse.json(recommendedStudies);
    console.log(nextResponse);
    return nextResponse; // JSON 응답
  } catch (error) {
    console.error("스터디 추천 중 오류 발생:", error);
    return NextResponse.json(
      { error: "스터디 추천에 실패했습니다." },
      { status: 500 }
    );
  }
}
