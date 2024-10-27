import { produce, enableMapSet } from "immer";
import { TCategory, TLevel, TRoleText } from "@/types/common";
import { Dispatch } from "react";

enableMapSet();

// 필터링 해서 보낼 데이터 형태

// 아 매칭 state도 대표 나타내려면 배열로 하는게 좋을 듯
export type TFilterState = {
  selectedCategories: Set<TCategory>;
  memberNum: number;
  locations: Record<string, boolean>;
  duration: {
    startDate: Date | null;
    endDate: Date | null;
  };
  levels: TLevel | null;
  roles: Set<TRoleText>;
};

// const stateExample: filterState = {
//   category: "BUSINESS",
//   // 검색어를 검색했다는 가정하에, 검색어에 해당하는 스터디들 중에서 카테고리가 비즈니스인 것
//   memberNum: 4,
//   // 위에서 필터링 된 스터디들 중에 스터디 인원이 4명인 스터디,
//   locations: new Set(["서울특별시 서대문구", "충청남도 예산군"]),
//   // 위에서 필터링 된 각 스터디에 대해서 모임 장소중에 서대문구와 예산군 모두를 포함하는 스터디
//   duration: {
//     startDate: new Date(),
//     endDate: new Date(),
//   }, // 필터링 된 각 스터디에 대해서 스터디 기간이 해당 날짜 내에 있는 스터디들을 필터링함
//   levels: "beginner",
//   roles: new Set(["team_leader"]),
// };

export const initialState: TFilterState = {
  selectedCategories: new Set([]),
  memberNum: 0,
  locations: {},
  duration: {
    startDate: null,
    endDate: null,
  },
  levels: null,
  roles: new Set([]),
  // 해당 role을 필요로 하는 스터디를 필터링 함
};

const resetState: TFilterState = {
  selectedCategories: new Set([]),
  memberNum: 0,
  locations: {},
  duration: {
    startDate: new Date(),
    endDate: new Date(),
  },
  levels: null,
  roles: new Set([]),
  // 해당 role을 필요로 하는 스터디를 필터링 함
};

export type TFilterAction =
  | { type: "setCategory"; payload: { category: TCategory } }
  | { type: "cancelCategory"; payload: { category: TCategory } }
  | { type: "increaseMemberNum" }
  | { type: "decreaseMemberNum" }
  | {
      type: "addLocation";
      payload: { region: string; location: string };
    }
  | {
      type: "deleteLocation";
      payload: { region: string; location: string };
    }
  | { type: "setDate"; payload: { startDate: Date; endDate: Date } }
  | { type: "setLevel"; payload: { level: TLevel | null } }
  | { type: "setRole"; payload: { role: TRoleText } }
  | { type: "cancelRole"; payload: { role: TRoleText } }
  | { type: "resetFilterData" };

export function FilterReducer(
  state: TFilterState,
  action: TFilterAction
): TFilterState {
  return produce(state, (draft) => {
    switch (action.type) {
      case "setCategory":
        draft.selectedCategories.add(action.payload.category);
        break;
      case "cancelCategory":
        draft.selectedCategories.delete(action.payload.category);
        break;

      case "increaseMemberNum":
        draft.memberNum += 1;
        break;
      case "decreaseMemberNum":
        draft.memberNum <= 0 ? (draft.memberNum = 0) : (draft.memberNum -= 1);
        break;

      case "setDate":
        draft.duration.startDate = action.payload.startDate;
        draft.duration.endDate = action.payload.endDate;
        break;

      case "setLevel":
        draft.levels = action.payload.level;
        break;

      case "addLocation":
        // draft.locations.add(
        //   action.payload.region + " " + action.payload.location
        // );
        draft.locations[action.payload.region + " " + action.payload.location] =
          true;
        break;
      case "deleteLocation":
        // draft.locations.delete(
        //   action.payload.region + " " + action.payload.location
        // );
        delete draft.locations[
          action.payload.region + " " + action.payload.location
        ];
        break;

      case "setRole":
        draft.roles.add(action.payload.role);
        break;
      case "cancelRole":
        draft.roles.delete(action.payload.role);
        break;

      case "resetFilterData":
        Object.assign(draft, resetState);
        break;

      default:
        alert("없는 타입입니다");
        break;
    }
  });
}

export type TDispatchFuncs = {
  setCategory: (category: TCategory) => void;
  cancelCategory: (category: TCategory) => void;
  increaseMemberNum: () => void;
  decreaseMemberNum: () => void;
  addLocation: (region: string, location: string) => void;
  deleteLocation: (region: string, location: string) => void;
  setDate: (startDate: Date, endDate: Date) => void;
  setLevel: (level: TLevel | null) => void;
  setRole: (role: TRoleText) => void;
  cancelRole: (role: TRoleText) => void;
  resetFilterData: () => void;
};
// 각 액션 함수 정의
export function createDispatchFuncs(
  dispatch: Dispatch<TFilterAction>
): TDispatchFuncs {
  const setCategory = (category: TCategory) => {
    dispatch({ type: "setCategory", payload: { category } });
  };

  const cancelCategory = (category: TCategory) => {
    dispatch({ type: "cancelCategory", payload: { category } });
  };

  const addLocation = (region: string, location: string) => {
    dispatch({
      type: "addLocation",
      payload: { region, location },
    });
  };

  const deleteLocation = (region: string, location: string) => {
    dispatch({
      type: "deleteLocation",
      payload: { region, location },
    });
  };

  const setDate = (startDate: Date, endDate: Date) => {
    dispatch({
      type: "setDate",
      payload: { startDate, endDate },
    });
  };

  const setLevel = (level: TLevel | null) => {
    dispatch({
      type: "setLevel",
      payload: { level },
    });
  };

  const setRole = (role: TRoleText) => {
    dispatch({
      type: "setRole",
      payload: { role },
    });
  };

  const decreaseMemberNum = () => {
    dispatch({
      type: "decreaseMemberNum",
    });
  };
  const increaseMemberNum = () => {
    dispatch({
      type: "increaseMemberNum",
    });
  };
  const cancelRole = (role: TRoleText) => {
    dispatch({
      type: "cancelRole",
      payload: { role },
    });
  };
  const resetFilterData = () => {
    dispatch({ type: "resetFilterData" });
  };

  return {
    decreaseMemberNum,
    increaseMemberNum,
    setCategory,
    cancelCategory,
    addLocation,
    deleteLocation,
    setDate,
    setLevel,
    setRole,
    cancelRole,
    resetFilterData,
  };
}

// 액션 하나 수정해야 할 때 마다 고칠 곳이 여러 곳 타입,DispatchFunc 등..
//이어서 오히려 유지보수가 어려운 것 같다.
// 아니면 액션을 여러개로 나누지 말고 setState처럼 전체 state를 업데이는 함수 하나만
// 만들고 디테일한 조작들은 하위 컴포넌트에서 하는 게 나을 수도?
// 근데 그럴거면 useReducer 쓸 필요가 있나? useState면 충분할 듯 싶음..
