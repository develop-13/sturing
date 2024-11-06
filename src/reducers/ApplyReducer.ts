import { TRoleText } from "@/types/common";

export type TApplyState = {
  applicationTitle: string;
  commitment: string; // 스터디 각오
  desiredRole: TRoleText[]; // 스터디에서 원하는 역할
};

export const initialState: TApplyState = {
  applicationTitle: "", // 스터디 지원글 제목
  commitment: "", // 스터디 각오
  desiredRole: [], // 스터디에서 원하는 역할
};

// 액션 타입 정의
type Action<K extends keyof TApplyState> = {
  type: "UPDATE_FIELD";
  field: K;
  value: TApplyState[K];
};

export function ApplyReducer<K extends keyof TApplyState>(
  state: TApplyState,
  action: Action<K>
) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
}
