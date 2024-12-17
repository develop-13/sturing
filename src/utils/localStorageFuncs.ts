import { TStudy, TStudyItem } from "@/types/study";

export const getStudiesFromLocalStorage = (): TStudyItem[] => {
  const RECENT_KEY = "recentWatchedStudies";
  return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
};

export const setStudyOnLocalStorage = (fetchedStudy: TStudy) => {
  const RECENT_KEY = "recentWatchedStudies";

  // Map fetchedStudy to TStudyItem
  const studyItem: TStudyItem = {
    _id: fetchedStudy._id,
    title: fetchedStudy.title,
    createdAt: fetchedStudy.createdAt,
    period: fetchedStudy.period,
    time: fetchedStudy.time,
    dayOfWeek: fetchedStudy.dayOfWeek,
    location: fetchedStudy.location,
    type: fetchedStudy.type,
    categories: fetchedStudy.categories,
    currentMembers: fetchedStudy.currentMembers,
    maxMembersNum: fetchedStudy.maxMembersNum,
    viewCount: fetchedStudy.viewCount,
    applyCount: fetchedStudy.applyCount,
    score: fetchedStudy.score,
    imgSrc: fetchedStudy.imgSrc as string,
  };

  const storedStudies = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");

  console.log(studyItem);

  // 중복 제거 및 최신 스터디 추가
  const updatedStudies = [
    studyItem,
    ...storedStudies.filter((item: TStudyItem) => item._id !== studyItem._id),
  ].slice(0, 5);

  localStorage.setItem(RECENT_KEY, JSON.stringify(updatedStudies));
};

// 여러 키의 값을 빈 배열로 초기화하는 함수
export const clearLocalStorageKeys = (keys: string[]) => {
  keys.forEach((key) => {
    localStorage.setItem(key, JSON.stringify([]));
  });
};
