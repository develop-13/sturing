"use client";
import React, { useState } from "react";
// 각 템플릿 컴포넌트를 가져옵니다.
import InterestsTemplate from "@/components/templates/matching/InterestsTemplate";
import SkilledTemplate from "@/components/templates/matching/SkilledTemplate";
import ButtonIcon from "../molecules/ButtonIcon";
import Icon from "../atoms/Icon";
import StudyPlaceTemplate from "../templates/matching/StudyPlaceTemplate";
import StudyTypeTemplate from "../templates/matching/StudyTypeTemplate";
import AtmosphereTemplate from "../templates/matching/AtmosphereTemplate";

const steps = [
  <InterestsTemplate />,
  <SkilledTemplate />,
  <StudyTypeTemplate />,
  <StudyPlaceTemplate />,
  <AtmosphereTemplate />,
];

//숫자로 해 볼 것
function MatchingPage() {
  const [step, setStep] = useState(0);

  const handleSteps = () => {
    setStep(step + 1);
  };

  return (
    <div className=" px-[16px] py-[20px]">
      {/* // progressbar */}
      {steps[step]}
      <div className="w-full flex justify-between fixed left-0 bottom-[9px] px-[16px]">
        <ButtonIcon //
          icon={<Icon type="BACK" color="text-white" />}
          theme="secondary"
          type="backward"
        />
        <ButtonIcon
          icon={<Icon type="FORWARD" color="text-white" />}
          theme="primary"
          type="forward"
          onClick={handleSteps}
        />
      </div>
    </div>
  );
}
export default MatchingPage;
