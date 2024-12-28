"use client";
import React, { useContext, useEffect, useReducer, useState } from "react";
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
import { TLevel } from "@/types/common";
import { UserStatusContext } from "../../providers/UserStatusProvider";
import { useStep } from "@/hooks/useStep";

const steps = [
  // 각 컴포넌트가 사용하는 props 보내주기
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <InterestsTemplate
      key={"InterestsTemplate"}
      userName={userName}
      fieldLevels={state.fieldLevels}
      deleteInterest={DispatchFuncs.deleteInterest}
      addInterest={DispatchFuncs.addInterest}
    />
  ),
  (state: TMatchingState, DispatchFuncs: TDispatchFuncs) => (
    <SkilledTemplate
      key={"SkilledTemplate"}
      interests={state.interests}
      fieldLevels={state.fieldLevels}
      setLevel={DispatchFuncs.setLevel}
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <StudyTypeTemplate
      key={"StudyTypeTemplate"}
      userName={userName}
      studyTypePreference={state.studyTypePreference}
      setStudyTypePreference={DispatchFuncs.setStudyTypePreference}
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <StudyPlaceTemplate
      key={"StudyPlaceTemplate"}
      userName={userName}
      studyPlacePreference={state.studyPlacePreference}
      addStudyPlacePreference={DispatchFuncs.addStudyPlacePreference}
      deleteStudyPlacePreference={DispatchFuncs.deleteStudyPlacePreference}
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null
  ) => (
    <AtmosphereTemplate
      key={"AtmosphereTemplate"}
      userName={userName}
      studyAtmospherePreference={state.studyAtmospherePreference}
      addStudyAtmospherePreference={DispatchFuncs.addStudyAtmospherePreference}
      deleteStudyAtmospherePreference={
        DispatchFuncs.deleteStudyAtmospherePreference
      }
    />
  ),
  (
    state: TMatchingState,
    DispatchFuncs: TDispatchFuncs,
    userName?: string | null,
    userEmail?: string | null
  ) => (
    <CompleteTemplate
      key={"CompleteTemplate"}
      state={state}
      userName={userName}
      userEmail={userEmail}
    />
  ),
];

const validateStep = (step: number, state: TMatchingState) => {
  // 0단계에서 관심분야 선택
  if (step >= 0 && !Object.keys(state.fieldLevels).length) {
    alert("최소 1개 이상의 관심분야를 선택해 주세요");
    return false;
  }

  if (step >= 1) {
    // 1단계에서 관심분야별 수준 선택
    let flag = true;

    Object.values(state.fieldLevels).forEach((value: TLevel | "") => {
      if (value === "") {
        alert("선택하신 관심분야들에 대한 수준을 모두 선택해주세요");
        flag = false;
      }
    });
    return flag;
  }

  //2단계에서 스터디 유형 선택
  if (step >= 2 && !state.studyTypePreference) {
    alert("스터디 선호 유형을 선택해주세요");
    return false;
  }

  // 3단계에서 스터디 선호 지역 선택
  if (step >= 3 && !Object.keys(state.studyPlacePreference).length) {
    alert("스터디 선호지역을 선택해주세요");
    return false;
  }

  // 4단계에서 선호하는 분위기 선택
  if (step >= 4 && !Object.keys(state.studyAtmospherePreference).length) {
    alert("선호하시는 스터디 분위기를 선택해주세요");
    return false;
  }
  return true;
};

function MatchingPage() {
  const router = useRouter();
  const { session } = useContext(UserStatusContext);

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user]);

  const { step, nextStep, prevStep, resetStep } = useStep();
  const [state, dispatch] = useReducer(MatchingReducer, initialState);

  let userName = session?.user?.name;
  let userEmail = session?.user?.email;

  const goPrevStep = () => {
    if (step === 0) {
      router.back();
      return;
    }
    prevStep();
  };

  const goNextStep = () => {
    if (step >= steps.length - 1) {
      router.push("/recommend");
      return;
    }

    let flag = validateStep(step, state);
    if (flag) {
      nextStep();
    }
  };

  return (
    <div className="h-auto flex flex-col">
      <Header
        leftSlot={<Icon type="BACK" onClick={() => router.back()} />}
        className="px-4"
      />
      <div className="px-4">
        {step < steps.length - 1 && (
          <Progressbar currentPage={step} totalPage={steps.length - 1} />
        )}
        {steps[step](state, createDispatchFuncs(dispatch), userName, userEmail)}

        <div className="flex justify-between mt-auto">
          <ButtonIcon theme="gray" type="backward" onClick={goPrevStep} />
          <ButtonIcon theme="primary" type="forward" onClick={goNextStep} />
        </div>
      </div>
    </div>
  );
}

export default MatchingPage;
