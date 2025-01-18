"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Header from "../organisms/Header";
import Button from "../molecules/Button";
import Text from "../atoms/Text";
import { useRouter } from "next/navigation";
import Progressbar from "../atoms/Progressbar";
import dynamic from "next/dynamic";

const ApplyText = dynamic(() => import("../templates/apply/ApplyText"), {
  ssr: false,
  loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
});

const RoleSelectTemp = dynamic(
  () => import("../templates/apply/RoleSelectTemp"),
  {
    ssr: false,
    loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
  }
);

const ApplyComplete = dynamic(
  () => import("../templates/apply/ApplyComplete"),
  {
    ssr: false,
    loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
  }
);
import { ApplyReducer, TApplyState, initialState } from "@/states/ApplyReducer";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import { useStep } from "@/hooks/useStep";
import useLoginCheck from "@/hooks/useLoginCheck";

function ApplyPage() {
  const router = useRouter();

  const { session }: UserStatusContextProps = useContext(UserStatusContext);

  useLoginCheck();

  const [applyData, dispatch] = useReducer(ApplyReducer, initialState);

  const handleStateChange = useCallback(
    <K extends keyof TApplyState>(field: K, value: TApplyState[K]) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    [dispatch]
  );

  const { step, nextStep, prevStep } = useStep();

  const steps = [
    <ApplyText
      key={"ApplyText"}
      state={applyData}
      handleStateChange={handleStateChange}
    />,
    <RoleSelectTemp
      key={"RoleSelectTemp"}
      state={applyData}
      handleStateChange={handleStateChange}
    />,
    <ApplyComplete
      key={"ApplyComplete"}
      state={applyData}
      userEmail={session?.user.email || ""}
    />,
  ];

  const goNextStep = () => {
    if (step >= steps.length - 1) {
      router.push("/recommend");
      return;
    }
    nextStep();
  };

  const goPrevStep = () => {
    console.log("prev Step clicked");
    if (step <= 0) {
      router.back();
      return;
    }
    prevStep();
  };

  return (
    <div className="mx-4 h-screen">
      <Header
        leftSlot={
          <Button
            theme="transparent"
            onClick={() => {
              router.back();
            }}
          >
            <Text size="sm" color="gray-600">
              취소
            </Text>
          </Button>
        }
      />
      <Progressbar currentPage={step} totalPage={steps.length} />
      {steps[step]}

      <div className="absolute bottom-0 w-full inset-x-0 px-4">
        <div className="w-full h-[50px] flex gap-[11px] my-3">
          {step < steps.length - 1 && step > 0 && (
            <Button
              theme="ordinary"
              extraCss="h-full basis-0 flex-grow rounded-[5px] "
              onClick={goPrevStep}
            >
              <Text size="base" weight="bold" color="gray-700">
                이전
              </Text>
            </Button>
          )}

          <Button
            theme="primary"
            onClick={goNextStep}
            extraCss="h-full basis-0 flex-grow-[2] rounded-[5px] "
          >
            <Text size="base" weight="bold" color="white">
              다음
            </Text>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ApplyPage;
