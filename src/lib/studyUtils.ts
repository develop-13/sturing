import dbConnect from "@/lib/mongodb"; // MongoDB 연결 함수
import Study from "@/models/Study"; // Study 모델
import { TStudyItem } from "@/types/study";
import { NewTMatching } from "@/types/user";
// _id를 문자열로 변환하는 함수
function transformStudyIds(studies: any[]): any[] {
  return studies.map((study) => ({
    ...study,
    _id: study._id.toString(), // _id를 문자열로 변환
  }));
}

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

const getStudiesWithPopularStudyScore = (studies: any[]): TStudyItem[] => {
  return transformStudyIds(
    studies.map((study) => {
      study.score = calculatePopularStudyScore(study);
      return study;
    })
  );
};

// 인기 스터디 가져오기
export async function getPopularStudies() {
  await dbConnect(); // MongoDB와 연결

  const fetchedStudies = await Study.find({
    status: "recruiting",
  })
    .lean()
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
      rate: 1,
      _id: 1,
    });

  const studiesWithScores = getStudiesWithPopularStudyScore(fetchedStudies);

  studiesWithScores.sort((a, b) => b.score - a.score);

  return studiesWithScores.slice(0, 5);
}

// 새로 개설된 스터디 가져오기
export async function getNewStudies() {
  await dbConnect();

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);

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
      _id: 1,
    })
    .lean();

  return transformStudyIds(fetchedStudies);
}

export async function getUserInterestStudies(userMatchingInfo: NewTMatching) {
  const { interests } = userMatchingInfo;

  if (!interests || interests.length === 0) {
    return [];
  }

  const userInterestStudies = await Study.find({
    categories: { $in: interests },
  })
    .sort({ score: -1 })
    .select({
      _id: 1,
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
    })
    .lean()
    .limit(5)
    .exec();

  return transformStudyIds(userInterestStudies);
}

export async function getUserCloseStudies(userMatchingInfo: NewTMatching) {
  const studyTypePreference: NewTMatching["studyPlacePreference"] =
    userMatchingInfo["studyPlacePreference"];

  const preferredLocations = Object.keys(studyTypePreference).filter(
    (location) => studyTypePreference[location] === true
  );

  const userCloseStudies = await Study.find({
    location: { $in: preferredLocations },
  })
    .sort({ score: -1 })
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
      _id: 1,
    })
    .lean()
    .limit(5)
    .exec();

  return transformStudyIds(userCloseStudies);
}
