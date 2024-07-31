"use client";
import { useState } from "react";
import Progressbar from "../atoms/Progressbar";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import Header from "../organisms/Header";
import StudyIntro from "../templates/recruitment/StudyIntro";
import StudyDetail from "../templates/recruitment/StudyDetail";
import MemberPreference from "../templates/recruitment/MemberPreference";
const steps = [<StudyIntro />, <StudyDetail />, <MemberPreference />];

function RecruitmentPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="px-4">
      <Header
        leftSlot={
          <Button theme="transparent">
            <Text size="sm" color="gray-600">
              취소
            </Text>
          </Button>
        }
        rightSlot={
          <Button theme="transparent">
            <Text size="sm" color="gray-600">
              임시저장
            </Text>
          </Button>
        }
      />
      <Progressbar currentPage={step} totalPage={steps.length - 1} />
      {steps[step]}
      <div className="h-[50px] flex gap-[11px] my-3">
        <Button
          theme="ordinary"
          extraCss="w-full h-full basis-0 flex-grow rounded-[5px] "
        >
          <Text size="base" weight="bold" color="gray-700">
            이전
          </Text>
        </Button>
        <Button
          theme="primary"
          extraCss="w-full h-full basis-0 flex-grow-[2]  rounded-[5px] "
        >
          <Text size="base" weight="bold" color="white">
            다음
          </Text>
        </Button>
      </div>
    </div>
  );
}

export default RecruitmentPage;
