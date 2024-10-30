import { TStudyRecruitment } from "@/types/study";
import { useReducer } from "react";
import { v4 } from "uuid";

// 초기 상태
export const initialState: TStudyRecruitment = {
  id: v4(),
  imgSrc: "",
  title: "",
  categories: [],
  description: "",
  type: "",
  location: "",
  period: {
    startDate: new Date(),
    endDate: new Date(),
  },
  dayOfWeek: "",
  time: {
    startTime: "",
    endTime: "",
  },
  maxMembersNum: 0,
  preferentialAge: "",
  preferentialLevel: undefined,
  necessaryRoles: [],
  atmospheres: [],
};

// 액션 타입 정의
type Action<K extends keyof TStudyRecruitment> = {
  type: "UPDATE_FIELD";
  field: K;
  value: TStudyRecruitment[K];
};

// 리듀서 함수
export const recruitmentReducer = <K extends keyof TStudyRecruitment>(
  state: TStudyRecruitment,
  action: Action<K>
): TStudyRecruitment => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};
