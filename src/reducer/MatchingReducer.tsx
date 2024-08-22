import { produce, enableMapSet } from "immer";

enableMapSet();

const stateExample = {
  interests: ["design", "tech", "business"],
  fieldLevels: {
    design: "beginner",
    tech: "senior",
    business: "junior",
  },
  studyTypePreference: "online",
  studyPlacePreference: new Set(["강동구", "서대문구"]),
  studyAtmospherePreference: new Set(["friendly", "serious", "free"]),
};

const stateExample2 = {
  fieldLevels: [
    ["design", "beginner"],
    ["tech", "senior"],
    ["business", "junior"],
  ],
  studyTypePreference: "online",
  studyPlacePreference: new Set(["강동구", "서대문구"]),
  studyAtmospherePreference: new Set(["friendly", "serious", "free"]),
};

export type TMatchingState = {
  interests: string[];
  fieldLevels: Map<string, string>;
  studyTypePreference: string;
  studyPlacePreference: Set<string>;
  studyAtmospherePreference: Set<string>;
};

export const initialState: TMatchingState = {
  interests: [],
  fieldLevels: new Map(), // 여기에 속성으로 흥미분야, 속성의 값으로 흥미분야의 레벨 들어갈 것임.
  studyTypePreference: "",
  studyPlacePreference: new Set(), // "경기/광주"
  studyAtmospherePreference: new Set(),
};

export type Action =
  | { type: "addInterest"; payload: { interest: string } }
  | { type: "deleteInterest"; payload: { interest: string } }
  | { type: "setLevel"; payload: { interest: string; level: string } }
  | { type: "setStudyTypePreference"; payload: string }
  | {
      type: "addStudyPlacePreference";
      payload: { region: string; location: string };
    }
  | {
      type: "deleteStudyPlacePreference";
      payload: { region: string; location: string };
    }
  | { type: "addStudyAtmospherePreference"; payload: { atmosphere: string } }
  | {
      type: "deleteStudyAtmospherePreference";
      payload: { atmosphere: string };
    };

export function MatchingReducer(
  state: TMatchingState,
  action: Action
): TMatchingState {
  return produce(state, (draft) => {
    switch (action.type) {
      case "addInterest":
        draft.interests.push(action.payload.interest);
        draft.fieldLevels.set(action.payload.interest, "");
        break;
      case "deleteInterest":
        draft.interests = draft.interests.filter(
          (interest) => interest !== action.payload.interest
        );
        draft.fieldLevels.delete(action.payload.interest);
        break;
      case "setLevel":
        draft.fieldLevels.set(action.payload.interest, action.payload.level);
        break;
      case "setStudyTypePreference":
        draft.studyTypePreference = action.payload;
        break;
      case "addStudyPlacePreference":
        draft.studyPlacePreference.add(
          action.payload.region + " " + action.payload.location
        );
        break;
      case "deleteStudyPlacePreference":
        draft.studyPlacePreference.delete(
          action.payload.region + " " + action.payload.location
        );
        break;
      case "addStudyAtmospherePreference":
        // draft.studyAtmospherePreference = new Set(action.payload.atmosphere);
        draft.studyAtmospherePreference.add(action.payload.atmosphere);
        break;
      case "deleteStudyAtmospherePreference":
        draft.studyAtmospherePreference.delete(action.payload.atmosphere);
        break;
      default:
        break;
    }
  });
}

// 각 dispatch 함수의 타입 정의
export type TDispatchFuncs = {
  addInterest: (interest: string) => void;
  deleteInterest: (interest: string) => void;
  setLevel: (interest: string, level: string) => void;
  setStudyTypePreference: (preference: string) => void;
  addStudyPlacePreference: (region: string, location: string) => void;
  deleteStudyPlacePreference: (region: string, location: string) => void;
  addStudyAtmospherePreference: (atmosphere: string) => void;
  deleteStudyAtmospherePreference: (atmosphere: string) => void;
};
