import { getNewStudies, getPopularStudies } from "@/lib/studyUtils";
import { NextResponse } from "next/server";

export async function GET(reqeust: Request) {
  // const popularStudies = await getPopularStudies();
  // const newStudies = await getNewStudies();

  try {
    // 여러 개의 데이터를 병렬로 가져오기
    const [popularStudies, newStudies] = await Promise.all([
      getPopularStudies(),
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
