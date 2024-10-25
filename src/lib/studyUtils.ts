import dbConnect from "@/lib/mongodb"; // MongoDB 연결 함수
import Study from "@/models/Study"; // Study 모델
import { TStudyItem } from "@/types/study";
import { NewTMatching } from "@/types/user";

export const getStudiesWithId = (studies: any[]) => {
  const studiesWithId = studies.map((study) => {
    const obj = study.toObject(); // Mongoose 도큐먼트를 평범한 객체로 변환
    obj.id = obj._id.toString(); // _id를 문자열로 변환하여 id로 설정
    // delete obj._id; // _id 필드를 완전히 제거
    // 스코어 계산
    obj.score = calculatePopularStudyScore(study);

    // 날짜를 ISO 형식으로 변환
    obj.period.startDate = new Date(obj.period.startDate).toISOString();
    obj.period.endDate = new Date(obj.period.endDate).toISOString();
    return obj;
  });
  // 애초에 스터디 모집에서 스터디 생성할 때 _id필드를 명시하여 insert 할 거니까
  // 나중에는 필요없어짐

  console.log("studiesWithId");
  console.log(studiesWithId);
  return studiesWithId;
};

// 스코어 계산 함수
export function calculatePopularStudyScore(study: any): number {
  const memberWeight = 0.5;
  const viewWeight = 0.2;
  const applyWeight = 0.2;
  const rateWeight = 0.1;

  const memberScore = study.currentMembers?.length * memberWeight;
  const viewScore = study.viewCount * viewWeight;
  const applyScore = study.applyCount * applyWeight;
  const rateScore = study.rate * rateWeight;

  return memberScore + viewScore + applyScore + rateScore;
}

const getStudiesWithPopularStudyScore = (
  studies: TStudyItem[]
): TStudyItem[] => {
  return studies.map((study) => {
    study.score = calculatePopularStudyScore(study);
    return study;
  });
};

// 인기 스터디 가져오기
export async function getPopularStudies() {
  await dbConnect(); // MongoDB와 연결

  const fetchedStudies = await Study.find({
    status: "recruiting",
  }).select({
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
    _id: 1, // _id 필드를 제외하고 싶을 경우
  });

  console.log("fetchedStudies");
  console.log(fetchedStudies);

  // _id를 문자열로 변환하고, score를 계산한 객체 반환
  const studiesWithScores: TStudyItem[] = getStudiesWithPopularStudyScore(
    getStudiesWithId(fetchedStudies)
  );

  console.log("studiesWithScores");
  console.log(studiesWithScores);

  // 스코어 순으로 정렬
  studiesWithScores.sort((a, b) => b.score - a.score);

  // 상위 5개 스터디 반환
  return studiesWithScores.slice(0, 5);
}

// 새로 개설된 스터디 가져오기
export async function getNewStudies() {
  await dbConnect();

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0); // 시, 분, 초를 0으로 설정

  const fetchedStudies = await Study.find({
    createdAt: { $gte: sevenDaysAgo },
    status: "recruiting",
  })
    .sort({ createdAt: -1 })
    .select({
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
      _id: 1, // _id 필드를 제외하고 싶을 경우
    });

  const studiesWithId: TStudyItem[] = getStudiesWithId(fetchedStudies);

  return studiesWithId;
}

export async function getUserInterestStudies(userMatchingInfo: NewTMatching) {
  // 사용자 맞춤 스터디를 추천해줌
  const { interests } = userMatchingInfo;

  if (!interests || interests.length === 0) {
    return []; // 관심사가 없는 경우 빈 배열 반환
  }

  // interests 배열에서 첫 번째 관심사를 선택
  const firstInterest = interests[0];

  // MongoDB에서 사용자의 첫 번째 관심사에 해당하는 스터디 가져오기
  const userInterestStudies = await Study.find({
    categories: { $elemMatch: { $eq: firstInterest } },
  })
    .sort({ score: -1 }) // 평점(score) 기준으로 내림차순 정렬
    .select({
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
      _id: 1, // _id 필드를 제외하고 싶을 경우
    })
    .limit(5) // 상위 5개만 가져오기
    .exec();

  const studiesWithId: TStudyItem[] = getStudiesWithId(userInterestStudies);

  return studiesWithId; // 평점순 상위 5개의 스터디 반환
}

export async function getUserCloseStudies(userMatchingInfo: NewTMatching) {
  // 사용자의 위치와 가까운 스터디를 추천해줌
  const studyTypePreference: NewTMatching["studyPlacePreference"] =
    userMatchingInfo["studyPlacePreference"];

  // studyTypePreference 객체에서 true인 키(지역)를 배열로 변환
  const preferredLocations = Object.keys(studyTypePreference).filter(
    (location) => studyTypePreference[location] === true
  );

  // MongoDB 쿼리: type 필드가 사용자가 선호하는 지역들 중 하나와 일치하는 스터디 검색
  const userCloseStudies = await Study.find({
    type: { $in: preferredLocations },
  })
    .sort({ score: -1 }) // 평점 기준 내림차순 정렬
    .select({
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
      _id: 1, // _id 필드를 제외하고 싶을 경우
    })
    .limit(5) // 상위 5개만 가져오기
    .exec();
  const studiesWithId = getStudiesWithId(userCloseStudies);
  return studiesWithId;
}
