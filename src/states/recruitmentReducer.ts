import { TStudyRecruitment } from "@/types/study";
import { v4 } from "uuid";

// 초기 상태

export type TStudyRecruitmentReducer = TStudyRecruitment;

export const initialState: TStudyRecruitmentReducer = {
  creatorEmail: "",
  imgSrc: null,
  title: "",
  categories: [],
  description: "",
  type: undefined,
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
  preferentialAge: [],
  preferentialLevel: undefined,
  necessaryRoles: [],
  atmospheres: [],
};

// 액션 타입 정의
type Action<K extends keyof TStudyRecruitmentReducer> = {
  type: "UPDATE_FIELD";
  field: K;
  value: TStudyRecruitmentReducer[K];
};

// 리듀서 함수
export const recruitmentReducer = <K extends keyof TStudyRecruitmentReducer>(
  state: TStudyRecruitmentReducer,
  action: Action<K>
): TStudyRecruitmentReducer => {
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
