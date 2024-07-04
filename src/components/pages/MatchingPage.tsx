import React, { useState } from "react";

// 각 템플릿 컴포넌트를 가져옵니다.
import InterestsTemplate from "@/components/templates/matching/InterestsTemplate";
import SkilledTemplate from "@/components/templates/matching/SkilledTemplate";
import StudyPlaceTemplate from "@/components/templates/matching/StudyPlaceTemplate";
import StudyTypeTemplate from "@/components/templates/matching/StudyTypeTemplate";
import AtmosphereTemplate from "@/components/templates/matching/AtmosphereTemplate";

// 단계들을 타입으로 정의합니다.
const INTERESTS = "INTERESTS";
const SKILLED = "SKILLED";
const STUDYPLACE = "STUDYPLACE";
const STUDYTYPE = "STUDYTYPE";
const ATMOSPHERE = "ATMOSPHERE";

const steps = [
  <InterestsTemplate />,
  <SkilledTemplate />,
  <StudyPlaceTemplate />,
  <StudyTypeTemplate />,
  <AtmosphereTemplate />,
];

//숫자로 해 볼 것
function MatchingPage() {
  const [step, setStep] = useState(0);

  const handleSteps = () => {
    setStep(step + 1);
  };

  return (
    <div>
      {steps[step]}
      {/* 버튼 섹션 */}
    </div>
  );
}
export default MatchingPage;
