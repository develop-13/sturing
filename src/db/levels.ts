import { TLevel } from "@/types/common";
export type TLevelItem = { level: TLevel; experience: string; text: string };
export const levelData: TLevelItem[] = [
  {
    level: "beginner",
    experience: "",
    text: "관련 공부를 이제 막 시작했어요",
  },
  {
    level: "newcomer",
    experience: "1년 이하",
    text: "관련 분야에서 일한지 아직 1년이 안됐어요",
  },
  {
    level: "junior",
    experience: "1~3년차",
    text: "1-3년 정도 관련 분야 업무경험이 있어요",
  },
  {
    level: "senior",
    experience: "4년 이상",
    text: "4년 이상의 관련 분야 업무경험이 있어요",
  },
];
