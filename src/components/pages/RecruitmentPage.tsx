"use client";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import Progressbar from "../atoms/Progressbar";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import Header from "../organisms/Header";
import StudyIntro from "../templates/recruitment/StudyIntro";
import StudyDetail from "../templates/recruitment/StudyDetail";
import MemberPreference from "../templates/recruitment/MemberPreference";
import Complete from "../templates/recruitment/RecruitmentComplete";
import { TStudyRecruitment } from "@/types/study";
import {
  initialState,
  recruitmentReducer,
} from "@/reducers/recruitmentReducer";
import { UserStatusContext } from "../organisms/auth-components/UserStatusProvider";

export type HandleStateChange<T> = <K extends keyof T>(
  field: K,
  value: T[K]
) => void;

function RecruitmentPage() {
  const [studyData, dispatch] = useReducer(recruitmentReducer, initialState);
  const { session } = useContext(UserStatusContext);
  let userEmail = session?.user.email;

  const router = useRouter();

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user]);

  useEffect(() => {
    if (userEmail) {
      handleStateChange("creatorEmail", userEmail);
    }
  }, [userEmail]);

  // 입력값 업데이트 핸들러
  const handleStateChange = useCallback(
    <K extends keyof TStudyRecruitment>(
      field: K,
      value: TStudyRecruitment[K]
    ) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    [dispatch]
  );
  const steps = [
    // 안에다 놓는 것 vs 밖으로 빼는 것... 현재는 유지보수하기 쉽게 안에다가..
    <StudyIntro state={studyData} handleStateChange={handleStateChange} />,
    <StudyDetail state={studyData} handleStateChange={handleStateChange} />,
    <MemberPreference
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <Complete state={studyData} />,
  ];

  const [step, setStep] = useState(0);

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
    <div id="recruitmentPage" className="px-4 h-screen">
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
        rightSlot={
          <Button theme="transparent">
            <Text size="sm" color="gray-600">
              임시저장
            </Text>
          </Button>
        }
      />
      <Progressbar currentPage={step} totalPage={steps.length} />
      {steps[step]}
      <div className="h-[50px] flex gap-[11px] my-3">
        {step < steps.length - 1 && (
          <Button
            theme="ordinary"
            extraCss="w-full h-full basis-0 flex-grow rounded-[5px] "
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
