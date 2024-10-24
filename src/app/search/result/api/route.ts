// import { NextRequest, NextResponse } from "next/server";
// import dbConnect from "@/lib/mongodb";
// import Study from "@/models/Study";
// import { TStudyItem } from "@/types/study";

// export async function GET(req: NextRequest) {
//   await dbConnect();

//   // URL 쿼리 파라미터에서 검색어 및 필터 조건들을 가져옴
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get("query");
//   const category = searchParams.get("category");
//   const location = searchParams.get("location");
//   const maxMembersNum = searchParams.get("maxMembersNum");
//   const periodStart = searchParams.get("periodStart");
//   const periodEnd = searchParams.get("periodEnd");
//   const preferentialLevel = searchParams.get("preferentialLevel");
//   const necessaryRoles = searchParams.get("necessaryRoles");

//   // 검색 조건들을 담을 필터 객체
//   const filters: any = {};

//   // 검색어 필터 (title 또는 categories에서 검색어 포함 여부)
//   if (query) {
//     filters.$or = [
//       { title: { $regex: query, $options: "i" } }, // 대소문자 구분 없이 검색
//       { categories: { $regex: query, $options: "i" } },
//     ];
//   }

//   // 카테고리 필터
//   if (category) {
//     filters.categories = category;
//   }

//   // 위치 필터
//   if (location) {
//     filters.location = { $regex: location, $options: "i" };
//   }

//   // 최대 멤버 수 필터
//   if (maxMembersNum) {
//     filters.maxMembersNum = { $lte: Number(maxMembersNum) }; // maxMembersNum 이하
//   }

//   // 기간 필터 (시작 날짜와 끝나는 날짜 사이에 있는 스터디)
//   if (periodStart || periodEnd) {
//     filters["period.startDate"] = {};
//     if (periodStart) {
//       filters["period.startDate"].$gte = new Date(periodStart);
//     }
//     if (periodEnd) {
//       filters["period.startDate"].$lte = new Date(periodEnd);
//     }
//   }

//   // 선호 레벨 필터
//   if (preferentialLevel) {
//     filters.preferentialLevel = preferentialLevel;
//   }

//   // 필요한 역할 필터
//   if (necessaryRoles) {
//     filters.necessaryRoles = { $in: necessaryRoles.split(",") }; // 역할 배열로 필터링
//   }

//   try {
//     // 필터 조건에 맞는 스터디를 DB에서 찾음
//     const studies = await Study.find(filters).select({
//       title: 1,
//       createdAt: 1,
//       "period.startDate": 1,
//       "period.endDate": 1,
//       "time.startTime": 1,
//       "time.endTime": 1,
//       dayOfWeek: 1,
//       location: 1,
//       imgSrc: 1,
//       type: 1,
//       categories: 1,
//       currentMembers: 1,
//       maxMembersNum: 1,
//       viewCount: 1,
//       applyCount: 1,
//       score: 1,
//       _id: 1, // _id 필드를 제외하고 싶을 경우
//     });

//     const studiesWithIds: TStudyItem[] = studies.map((study) => {
//       const obj = study.toObject(); // Mongoose 도큐먼트를 평범한 객체로 변환
//       obj.id = obj._id.toString(); // _id를 문자열로 변환하여 id로 설정
//       delete obj._id; // _id 필드를 완전히 제거

//       // 날짜를 ISO 형식으로 변환
//       obj.period.startDate = new Date(obj.period.startDate).toISOString();
//       obj.period.endDate = new Date(obj.period.endDate).toISOString();
//       return obj;
//     });

//     // 결과 반환
//     return NextResponse.json(studiesWithIds, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "스터디 검색 중 오류가 발생했습니다.", error },
//       { status: 500 }
//     );
//   }
// }

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

    console.log(body);

    // 선택된 카테고리 필터
    if (selectedCategories && selectedCategories.size > 0) {
      filters.categories = { $in: Array.from(selectedCategories) };
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
    if (roles && roles.size > 0) {
      filters.necessaryRoles = { $in: Array.from(roles) };
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
      delete obj._id;
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
