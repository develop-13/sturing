// lib/studyUtils.ts

import { Mongoose } from "mongoose";

// 스코어 계산 함수
export function calculateStudyScore(study: any): number {
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
export async function getPopularStudies(
  dbConnect: () => Promise<Mongoose>,
  Study: any
) {
  await dbConnect();

  const studies = await Study.find({ status: "모집중" });

  const studiesWithScores = studies.map((study) => ({
    ...study.toObject(),
    score: calculateStudyScore(study),
  }));

  studiesWithScores.sort((a, b) => b.score - a.score);

  return studiesWithScores.slice(0, 5);
}

// 새로 개설된 스터디 가져오기
export async function getNewStudies(
  dbConnect: () => Promise<Mongoose>,
  Study: any
) {
  await dbConnect();

  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  return Study.find({
    createdAt: { $gte: sevenDaysAgo },
    status: "모집중",
  }).sort({ createdAt: -1 });
}
