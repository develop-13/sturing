"use client";
import React, { useState, createContext, useContext } from "react";
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

const steps = [
  <InterestsTemplate />,
  <SkilledTemplate />,
  <StudyTypeTemplate />,
  <StudyPlaceTemplate />,
  <AtmosphereTemplate />,
  <CompleteTemplate />,
];

const stateExample = {
  interest: {
    design: "beginner",
    marketing: "senior",
  },

  studyTypePreference: "",
  placePreference: new Set(),
  atmospherePreference: new Set(),
};

const initialState = {
  interest: {},
  studyTypePreference: "",
  placePreference: new Set(),
  atmospherePreference: new Set(),
};

//숫자로 해 볼 것
function MatchingPage() {
  const [step, setStep] = useState(0);

  const goPrevStep = () => {
    if (step == 0) {
      // 홈으로 가게 하기
      return;
    }
    setStep(step - 1);
  };

  const goNextStep = () => {
    if (step >= steps.length - 1) {
      // 홈으로 가게 하기
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className=" px-[16px]">
      <Header leftSlot={<Icon type="BACK" />} />
      {step < steps.length - 1 && ( // 마지막 페이지에는 안 보이게
        <Progressbar currentPage={step} totalPage={steps.length - 1} />
      )}
      {steps[step]}
      <div className="w-[375px] flex justify-between fixed  left-1/2 transform -translate-x-1/2  bottom-[9px] px-[16px]">
        <ButtonIcon //
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
