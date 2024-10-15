import { TAtmosphere, TCategory, TLevel } from "@/types/common";
import { Dispatch } from "react";
import { produce } from "immer";
import { NewTMatching } from "@/types/user";

export type TMatchingState = NewTMatching;

export const initialState: TMatchingState = {
  interests: [],
  fieldLevels: {} as Record<TCategory, TLevel | "">,
  studyTypePreference: "not_decided",
  studyPlacePreference: {} as Record<string, boolean>,
  studyAtmospherePreference: {} as Record<TAtmosphere, boolean>,
};

export type Action =
  | { type: "addInterest"; payload: { interest: TCategory } }
  | { type: "deleteInterest"; payload: { interest: TCategory } }
  | { type: "setLevel"; payload: { interest: TCategory; level: TLevel } }
  | {
      type: "setStudyTypePreference";
      payload: "online" | "offline" | "not_decided" | "both";
    }
  | {
      type: "addStudyPlacePreference";
      payload: { region: string; location: string };
    }
  | {
      type: "deleteStudyPlacePreference";
      payload: { region: string; location: string };
    }
  | {
      type: "addStudyAtmospherePreference";
      payload: { atmosphere: TAtmosphere };
    }
  | {
      type: "deleteStudyAtmospherePreference";
      payload: { atmosphere: TAtmosphere };
    };

export function MatchingReducer(
  state: TMatchingState,
  action: Action
): TMatchingState {
  return produce(state, (draft) => {
    switch (action.type) {
      case "addInterest":
        draft.interests.push(action.payload.interest);
        draft.fieldLevels[action.payload.interest] = "" as TLevel;
        break;
      case "deleteInterest":
        draft.interests = draft.interests.filter(
          (interest) => interest !== action.payload.interest
        );
        delete draft.fieldLevels[action.payload.interest];
        break;
      case "setLevel":
        draft.fieldLevels[action.payload.interest] = action.payload.level;
        break;
      case "setStudyTypePreference":
        draft.studyTypePreference = action.payload;
        break;
      case "addStudyPlacePreference":
        draft.studyPlacePreference[
          action.payload.region + " " + action.payload.location
        ] = true;
        break;
      case "deleteStudyPlacePreference":
        delete draft.studyPlacePreference[
          action.payload.region + " " + action.payload.location
        ];
        break;
      case "addStudyAtmospherePreference":
        draft.studyAtmospherePreference[action.payload.atmosphere] = true;
        break;
      case "deleteStudyAtmospherePreference":
        delete draft.studyAtmospherePreference[action.payload.atmosphere];
        break;
      default:
        break;
    }
  });
}

export type TDispatchFuncs = {
  addInterest: (interest: TCategory) => void;
  deleteInterest: (interest: TCategory) => void;
  setLevel: (interest: TCategory, level: TLevel) => void;
  setStudyTypePreference: (
    preference: "online" | "offline" | "not_decided" | "both"
  ) => void;
  addStudyPlacePreference: (region: string, location: string) => void;
  deleteStudyPlacePreference: (region: string, location: string) => void;
  addStudyAtmospherePreference: (atmosphere: TAtmosphere) => void;
  deleteStudyAtmospherePreference: (atmosphere: TAtmosphere) => void;
};

export function createDispatchFuncs(
  dispatch: Dispatch<Action>
): TDispatchFuncs {
  const addInterest: TDispatchFuncs["addInterest"] = (interest) => {
    dispatch({ type: "addInterest", payload: { interest } });
  };

  const deleteInterest: TDispatchFuncs["deleteInterest"] = (interest) => {
    dispatch({ type: "deleteInterest", payload: { interest } });
  };

  const setLevel: TDispatchFuncs["setLevel"] = (interest, level) => {
    dispatch({ type: "setLevel", payload: { interest, level } });
  };

  const setStudyTypePreference: TDispatchFuncs["setStudyTypePreference"] = (
    preference
  ) => {
    dispatch({ type: "setStudyTypePreference", payload: preference });
  };

  const addStudyPlacePreference: TDispatchFuncs["addStudyPlacePreference"] = (
    region,
    location
  ) => {
    dispatch({
      type: "addStudyPlacePreference",
      payload: { region, location },
    });
  };

  const deleteStudyPlacePreference: TDispatchFuncs["deleteStudyPlacePreference"] =
    (region, location) => {
      dispatch({
        type: "deleteStudyPlacePreference",
        payload: { region, location },
      });
    };

  const addStudyAtmospherePreference: TDispatchFuncs["addStudyAtmospherePreference"] =
    (atmosphere) => {
      dispatch({
        type: "addStudyAtmospherePreference",
        payload: { atmosphere },
      });
    };

  const deleteStudyAtmospherePreference: TDispatchFuncs["deleteStudyAtmospherePreference"] =
    (atmosphere) => {
      dispatch({
        type: "deleteStudyAtmospherePreference",
        payload: { atmosphere },
      });
    };

  return {
    addInterest,
    deleteInterest,
    setLevel,
    setStudyTypePreference,
    addStudyPlacePreference,
    deleteStudyPlacePreference,
    addStudyAtmospherePreference,
    deleteStudyAtmospherePreference,
  };
}
