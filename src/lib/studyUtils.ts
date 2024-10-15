import dbConnect from "@/lib/mongodb"; // MongoDB 연결 함수
import Study from "@/models/Study"; // Study 모델
import { TStudyItem } from "@/types/study";

// 스코어 계산 함수
export function calculatePopularStudyScore(study: any): number {
  const memberWeight = 0.5;
  const viewWeight = 0.2;
  const applyWeight = 0.2;
  const rateWeight = 0.1;

  const memberScore = study.currentMembers.length * memberWeight;
  const viewScore = study.viewCount * viewWeight;
  const applyScore = study.applyCount * applyWeight;
  const rateScore = study.rate * rateWeight;

  return memberScore + viewScore + applyScore + rateScore;
}

// 인기 스터디 가져오기
export async function getPopularStudies() {
  await dbConnect(); // MongoDB와 연결

  const fetchedStudies = await Study.find({
    status: "모집중",
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

  // console.log("getPopularStudies");
  // console.log(fetchedStudies);

  // _id를 문자열로 변환하고, score를 계산한 객체 반환
  const studiesWithScores: TStudyItem[] = fetchedStudies.map((study) => {
    const obj = study.toObject(); // Mongoose 도큐먼트를 평범한 객체로 변환
    obj.id = obj._id.toString(); // _id를 문자열로 변환하여 id로 설정
    delete obj._id; // _id 필드를 완전히 제거

    // 스코어 계산
    obj.score = calculatePopularStudyScore(study);

    // 날짜를 ISO 형식으로 변환
    obj.period.startDate = new Date(obj.period.startDate).toISOString();
    obj.period.endDate = new Date(obj.period.endDate).toISOString();
    return obj;
  });

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
    status: "모집중",
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

  const studiesWithId: TStudyItem[] = fetchedStudies.map((study) => {
    const obj = study.toObject();
    obj.id = obj._id.toString();
    delete obj._id;

    // 날짜를 ISO 형식으로 변환
    obj.period.startDate = new Date(obj.period.startDate).toISOString();
    obj.period.endDate = new Date(obj.period.endDate).toISOString();

    return obj;
  });

  return studiesWithId;
}
