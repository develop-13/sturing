"use client";
import { produce, enableMapSet } from "immer";
import React, { useReducer, useState } from "react";
// 각 템플릿 컴포넌트를 가져옵니다.
import InterestsTemplate from "@/components/templates/matching/InterestsTemplate";
import SkilledTemplate from "@/components/templates/matching/SkilledTemplate";
import ButtonIcon from "../molecules/ButtonIcon";
import Icon from "../atoms/Icon";
import StudyPlaceTemplate from "../templates/matching/StudyPlaceTemplate";
import StudyTypeTemplate from "../templates/matching/StudyTypeTemplate";
import AtmosphereTemplate from "../templates/matching/AtmosphereTemplate";
import Progressbar from "../atoms/Progressbar";
import CompleteTemplate from "../templates/matching/CompleteTemplate";
import Header from "../organisms/Header";
import { useRouter } from "next/navigation";

// Immer에서 Map과 Set을 사용할 수 있도록 플러그인 활성화
enableMapSet();

export type TState = {
  interests: string[];
  fieldLevels: Map<string, string>;
  studyTypePreference: string;
  studyPlacePreference: Set<string>;
  studyAtmospherePreference: Set<string>;
};

const initialState: TState = {
  interests: [],
  fieldLevels: new Map(), // 여기에 속성으로 흥미분야, 속성의 값으로 흥미분야의 레벨 들어갈 것임.
  studyTypePreference: "",
  studyPlacePreference: new Set(), // "경기/광주"
  studyAtmospherePreference: new Set(),
};

type Action =
  | { type: "addInterest"; payload: { interest: string } }
  | { type: "deleteInterest"; payload: { interest: string } }
  | { type: "setLevel"; payload: { interest: string; level: string } }
  | { type: "setStudyTypePreference"; payload: string }
  | {
      type: "setStudyPlacePreference";
      payload: { region: string; location: string };
    }
  | { type: "setStudyAtmospherePreference"; payload: { atmosphere: string[] } };

function MatchingReducer(state: TState, action: Action): TState {
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
      case "setStudyPlacePreference":
        draft.studyPlacePreference.add(
          action.payload.region + "/" + action.payload.location
        );
        // draft.studyPlacePreference = new Set([
        //   action.payload.region + "/" + action.payload.location,
        // ]);
        break;
      case "setStudyAtmospherePreference":
        draft.studyAtmospherePreference = new Set(action.payload.atmosphere);
        break;
      default:
        break;
    }
  });
}

const steps = [
  // 각 컴포넌트가 사용하는 props 보내주기
  (state: TState, DispatchFuncs: TDispatchFuncs) => (
    <InterestsTemplate
      fieldLevels={state.fieldLevels}
      deleteInterest={DispatchFuncs.deleteInterest}
      addInterest={DispatchFuncs.addInterest}
    />
  ),
  (state: TState, DispatchFuncs: TDispatchFuncs) => (
    <SkilledTemplate
      interests={state.interests}
      fieldLevels={state.fieldLevels}
      setLevel={DispatchFuncs.setLevel}
    />
  ),
  (state: TState, DispatchFuncs: TDispatchFuncs) => (
    <StudyTypeTemplate
      studyTypePreference={state.studyTypePreference}
      setStudyTypePreference={DispatchFuncs.setStudyTypePreference}
    />
  ),
  (state: TState, DispatchFuncs: TDispatchFuncs) => (
    <StudyPlaceTemplate
      studyPlacePreference={state.studyPlacePreference}
      setStudyPlacePreference={DispatchFuncs.setStudyPlacePreference}
    />
  ),
  (state: TState, DispatchFuncs: TDispatchFuncs) => (
    <AtmosphereTemplate
      studyAtmospherePreference={state.studyAtmospherePreference}
      setStudyAtmospherePreference={DispatchFuncs.setStudyAtmospherePreference}
    />
  ),
  (state: TState) => <CompleteTemplate />,
];

// 각 dispatch 함수의 타입 정의
export type TDispatchFuncs = {
  addInterest: (interest: string) => void;
  deleteInterest: (interest: string) => void;
  setLevel: (interest: string, level: string) => void;
  setStudyTypePreference: (preference: string) => void;
  setStudyPlacePreference: (region: string, location: string) => void;
  setStudyAtmospherePreference: (atmosphere: string[]) => void;
};

function MatchingPage() {
  console.log("log in MatchingPage");

  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(MatchingReducer, initialState);

  const addInterest: TDispatchFuncs["addInterest"] = (interest) => {
    dispatch({ type: "addInterest", payload: { interest } });
  };
  const deleteInterest: TDispatchFuncs["addInterest"] = (interest) => {
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

  const setStudyPlacePreference: TDispatchFuncs["setStudyPlacePreference"] = (
    region,
    location
  ) => {
    dispatch({
      type: "setStudyPlacePreference",
      payload: { region, location },
    });
  };

  const setStudyAtmospherePreference: TDispatchFuncs["setStudyAtmospherePreference"] =
    (atmosphere) => {
      dispatch({
        type: "setStudyAtmospherePreference",
        payload: { atmosphere },
      });
    };

  const DispatchFuncs: TDispatchFuncs = {
    addInterest,
    deleteInterest,
    setLevel,
    setStudyTypePreference,
    setStudyPlacePreference,
    setStudyAtmospherePreference,
  };

  const router = useRouter();

  const goPrevStep = () => {
    if (step === 0) {
      // 홈으로 가게 하기
      return;
    }
    setStep(step - 1);
  };

  const goNextStep = () => {
    if (!state.fieldLevels.size) {
      alert("최소 1개 이상의 관심분야를 선택해 주세요");
      return;
    }

    let levelSelectionDone = true;

    state.fieldLevels.forEach((value, key) => {
      if (step === 1 && value === "") {
        alert("선택하신 관심분야들에 대한 수준을 모두 선택해주세요");
        levelSelectionDone = false;
        return;
      }
    });

    if (!levelSelectionDone) return;

    if (step >= steps.length - 1) {
      // 홈으로 가게 하기
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="px-[16px]">
      <Header leftSlot={<Icon type="BACK" onClick={() => router.back()} />} />
      {step < steps.length - 1 && ( // 마지막 페이지에는 안 보이게
        <Progressbar currentPage={step} totalPage={steps.length - 1} />
      )}
      {steps[step](state, DispatchFuncs)}
      <div className="w-[375px] flex justify-between fixed left-1/2 transform -translate-x-1/2 bottom-[9px] px-[16px]">
        <ButtonIcon
          icon={<Icon type="BACK" color="text-white" />}
          theme="secondary"
          type="backward"
          onClick={goPrevStep}
        />
        <ButtonIcon
          icon={<Icon type="FORWARD" color="text-white" />}
          theme="primary"
          type="forward"
          onClick={goNextStep}
        />
      </div>
    </div>
  );
}

export default MatchingPage;
