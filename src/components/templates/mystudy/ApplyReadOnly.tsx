"use client";
import React, { forwardRef, useState } from "react";
import ApplyTextReadOnly from "./ApplyTextReadOnly";
import RoleViewer from "./RoleViewer";
import { TApply } from "@/types/apply";
import Button from "@/components/molecules/Button";
import Text from "@/components/atoms/Text";
import { TRoleText } from "@/types/common";

// type TApplyReadOnly = { applyData: TApply };
type TApplyReadOnly = { applyData: TApply };

const ApplyReadOnly = forwardRef<HTMLDivElement, TApplyReadOnly>(
  function ApplyReadOnly(
    props: TApplyReadOnly,
    ref: React.Ref<HTMLDivElement>
  ) {
    const [step, setStep] = useState(0);

    const [applyToSend, setApplyToSend] = useState({
      ...props.applyData,
    });
    console.log(applyToSend);

    const onChangeRole = (fixedRole: TRoleText) => {
      setApplyToSend({ ...applyToSend, desiredRole: [fixedRole] });
    };
    const steps = [
      <ApplyTextReadOnly
        title={props.applyData.title}
        description={props.applyData.content}
      />,
      <RoleViewer
        onChangeRole={onChangeRole}
        desireRoles={props.applyData.desiredRole}
      />,
    ];

    const goNextStep = () => {
      // 두 번 클릭 시, 전전 주소로 요청되는 문제
      if (step >= steps.length - 1) {
        // router.push("/recommend");
        return;
      }
      setStep(step + 1);
    };

    const goPrevStep = () => {
      console.log("prev Step clicked");
      if (step <= 0) {
        // router.back();
        return;
      }
      setStep(step - 1);
    };

    return (
      <div ref={ref} className="mx-4 w-full h-[500px] bg-white rounded-sm">
        {steps[step]}
        <div className="w-full inset-x-0 px-4">
          <div className="w-full h-[50px] flex gap-[11px] my-3">
            {step < steps.length && step > 0 && (
              <Button
                theme="ordinary"
                extraCss="h-full basis-0 flex-grow rounded-[5px]"
                onClick={goPrevStep}
              >
                <Text size="base" weight="bold" color="gray-700">
                  이전
                </Text>
              </Button>
            )}
            {step === 0 ? (
              <Button
                theme="primary"
                extraCss="h-full basis-0 flex-grow-[2] rounded-[5px]"
                onClick={goNextStep}
              >
                <Text size="base" weight="bold" color="white">
                  다음
                </Text>
              </Button>
            ) : (
              <Button
                theme="primary"
                extraCss="h-full basis-0 flex-grow-[2] rounded-[5px]"
                onClick={goNextStep}
              >
                <Text size="base" weight="bold" color="white">
                  수락하기
                </Text>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ApplyReadOnly;
