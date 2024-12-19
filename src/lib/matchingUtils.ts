import Study from "@/models/Study";
import { TAtmosphere, TCategory, TLevel } from "@/types/common";
import { TStudyItem } from "@/types/study";
import { NewTMatching } from "@/types/user";
import { calculatePopularStudyScore } from "./studyUtils";

// TMatching과 TStudy 타입 정의

type TStudy = {
  id: string;
  title: string;
  categories: TCategory[];
  type: "online" | "offline";
  location: string;
  atmospheres: TAtmosphere[];
  preferentialLevel: TLevel;
};

// 가중치 기반 스터디 점수 계산 함수
function calculateStudyScore(
  userMatchingInfo: NewTMatching,
  study: TStudy
): number {
  let score = 0;

  // 1. 관심 분야 및 수준 일치 점수 (40%)
  let fieldScore = 0;
  study.categories.forEach((category) => {
    if (userMatchingInfo.interests.includes(category)) {
      const userLevel = userMatchingInfo.fieldLevels[category]; // Map에서 사용자 수준 가져오기
      // 관심 분야의 수준 일치 여부에 따라 점수 추가
      if (userLevel === study.preferentialLevel) {
        fieldScore += 1;
      }
    }
  });
  score += fieldScore * 0.4;

  // 2. 스터디 유형(온라인/오프라인) 일치 점수 (20%)
  if (
    userMatchingInfo.studyTypePreference === study.type ||
    userMatchingInfo.studyTypePreference === "both"
  ) {
    score += 1 * 0.2;
  }

  // 3. 선호 지역 일치 점수 (20%)
  if (userMatchingInfo.studyPlacePreference[study.location]) {
    score += 1 * 0.2;
  }

  // 4. 스터디 분위기 일치 점수 (20%)
  const matchingAtmosphere = study.atmospheres.filter(
    (atmosphere) => userMatchingInfo.studyAtmospherePreference[atmosphere]
  ).length;
  score += (matchingAtmosphere / study.atmospheres.length) * 0.2;

  return score;
}

export async function getRecommendedStudies(
  userMatchingInfo: NewTMatching
): Promise<TStudyItem[]> {
  console.log("getRecommendedStudies called");

  // 1. MongoDB에서 모든 스터디를 가져옵니다.
  const fetchedStudies = await Study.find({
    status: "recruiting",
  }).select({
    title: 1,
    createdAt: 1,
    atmospheres: 1,
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
    _id: 1, // _id 필드를 제외하고 싶을 경우
  });

  const studiesItemsData = fetchedStudies.map((study) => {
    const obj = study.toObject(); // Mongoose 도큐먼트를 평범한 객체로 변환
    // obj.id = obj._id.toString(); // _id를 문자열로 변환하여 id로 설정
    // delete obj._id; // _id 필드를 완전히 제거

    // 스코어 계산
    obj.score = calculatePopularStudyScore(study);

    // 날짜를 ISO 형식으로 변환
    obj.period.startDate = new Date(obj.period.startDate).toISOString();
    obj.period.endDate = new Date(obj.period.endDate).toISOString();
    return obj;
  });

  // 2. 각 스터디의 점수를 계산합니다.
  const studiesWithScores = studiesItemsData.map((study) => ({
    ...study,
    score: calculateStudyScore(userMatchingInfo, study),
  }));

  // 3. 점수를 기준으로 스터디를 내림차순으로 정렬하고 상위 두 개를 반환합니다.
  studiesWithScores.sort((a, b) => b.score - a.score);

  // 상위 두 개의 스터디 반환
  return studiesWithScores.slice(0, 2);
}
