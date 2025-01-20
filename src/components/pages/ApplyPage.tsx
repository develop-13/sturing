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
import ApplyText from "../templates/apply/ApplyText";
import RoleSelectTemp from "../templates/apply/RoleSelectTemp";
import {
  ApplyReducer,
  TApplyState,
  initialState,
} from "@/reducers/ApplyReducer";
import ApplyComplete from "../templates/apply/ApplyComplete";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../organisms/auth-components/UserStatusProvider";

function ApplyPage() {
  const router = useRouter();

  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      // alert("로그인이 필요한 페이지 입니다");
      // router.push("/");
      return;
    }
  }, [session?.user]);

  const [applyData, dispatch] = useReducer(ApplyReducer, initialState);

  const handleStateChange = useCallback(
    <K extends keyof TApplyState>(field: K, value: TApplyState[K]) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    [dispatch]
  );

  const [step, setStep] = useState(0);
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
    // 두 번 클릭 시, 전전 주소로 요청되는 문제
    if (step >= steps.length - 1) {
      router.push("/recommend");
      return;
    }
    setStep(step + 1);
  };
  const goPrevStep = () => {
    console.log("prev Step clicked");
    if (step <= 0) {
      router.back();
      return;
    }
    setStep(step - 1);
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
