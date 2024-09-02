"use client";
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
import {
  MatchingReducer,
  TDispatchFuncs,
  TMatchingState,
  initialState,
  createDispatchFuncs,
} from "@/reducers/matchingReducer";

const steps = [
  // 각 컴포넌트가 사용하는 props 보내주기
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <InterestsTemplate
      fieldLevels={state.fieldLevels}
      deleteInterest={DispatchFuncs.deleteInterest}
      addInterest={DispatchFuncs.addInterest}
    />
  ),
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <SkilledTemplate
      interests={state.interests}
      fieldLevels={state.fieldLevels}
      setLevel={DispatchFuncs.setLevel}
    />
  ),
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <StudyTypeTemplate
      studyTypePreference={state.studyTypePreference}
      setStudyTypePreference={DispatchFuncs.setStudyTypePreference}
    />
  ),
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <StudyPlaceTemplate
      studyPlacePreference={state.studyPlacePreference}
      addStudyPlacePreference={DispatchFuncs.addStudyPlacePreference}
      deleteStudyPlacePreference={DispatchFuncs.deleteStudyPlacePreference}
    />
  ),
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <AtmosphereTemplate
      studyAtmospherePreference={state.studyAtmospherePreference}
      addStudyAtmospherePreference={DispatchFuncs.addStudyAtmospherePreference}
      deleteStudyAtmospherePreference={
        DispatchFuncs.deleteStudyAtmospherePreference
      }
    />
  ),
  (state: TMatchingState) => <CompleteTemplate />,
];

function MatchingPage() {
  console.log("log in MatchingPage");

  const [step, setStep] = useState(0);
  const [state, dispatch] = useReducer(MatchingReducer, initialState);

  console.log(state);

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
      {steps[step](state, createDispatchFuncs(dispatch))}
      <div className="w-[375px] flex justify-between fixed left-1/2 transform -translate-x-1/2 bottom-[9px] px-[16px]">
        <ButtonIcon theme="gray" type="backward" onClick={goPrevStep} />
        <ButtonIcon theme="primary" type="forward" onClick={goNextStep} />
      </div>
    </div>
  );
}

export default MatchingPage;
