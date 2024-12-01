import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Study from "@/models/Study";
import { TStudyItem } from "@/types/study";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  // 필터 객체를 생성
  const filters: any = {};

  if (query) {
    filters.$or = [
      { title: { $regex: query, $options: "i" } }, // 대소문자 구분 없이 검색
      { categories: { $regex: query, $options: "i" } },
    ];
  }

  try {
    // 요청 본문에서 데이터를 추출

    const body = await req.json();
    const {
      selectedCategories,
      memberNum,
      locations,
      duration,
      levels,
      roles,
    } = body;

    // 선택된 카테고리 필터
    if (selectedCategories && selectedCategories.length > 0) {
      filters.categories = { $in: selectedCategories };
    }

    // 멤버 수 필터
    if (memberNum) {
      filters.maxMembersNum = { $lte: memberNum };
    }

    if (locations) {
      // 위치 필터
      const selectedLocations = Object.keys(locations).filter(
        (loc) => locations[loc]
      );
      if (selectedLocations.length > 0) {
        filters.location = { $in: selectedLocations };
      }
    }

    // 기간 필터
    if (duration?.startDate || duration?.endDate) {
      filters["period.startDate"] = {};
      if (duration.startDate) {
        filters["period.startDate"].$gte = new Date(duration.startDate);
      }
      if (duration.endDate) {
        filters["period.startDate"].$lte = new Date(duration.endDate);
      }
    }

    // 레벨 필터
    if (levels) {
      filters.preferentialLevel = levels;
    }

    // 역할 필터
    if (roles && roles.length > 0) {
      filters.necessaryRoles = { $in: roles };
    }

    // 필터 조건에 맞는 스터디를 DB에서 검색
    const studies = await Study.find(filters).select({
      title: 1,
      createdAt: 1,
      "period.startDate": 1,
      "period.endDate": 1,
      "time.startTime": 1,
      "time.endTime": 1,
      dayOfWeek: 1,
      location: 1,
      imgSrc: 1,
      type: 1,
      categories: 1,
      currentMembers: 1,
      maxMembersNum: 1,
      viewCount: 1,
      applyCount: 1,
      score: 1,
      _id: 1,
    });

    const studiesWithIds: TStudyItem[] = studies.map((study) => {
      const obj = study.toObject();
      obj.id = obj._id.toString();
      // delete obj._id;
      obj.period.startDate = new Date(obj.period.startDate).toISOString();
      obj.period.endDate = new Date(obj.period.endDate).toISOString();
      return obj;
    });

    return NextResponse.json(studiesWithIds, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "스터디 검색 중 오류가 발생했습니다.", error },
      { status: 500 }
    );
  }
}
