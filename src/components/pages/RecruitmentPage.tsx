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
import Loading from "../templates/common/Loading";

export type HandleStateChange<T> = <K extends keyof T>(
  field: K,
  value: T[K]
) => void;

function RecruitmentPage() {
  const [studyData, dispatch] = useReducer(recruitmentReducer, initialState);
  const { session, status } = useContext(UserStatusContext);
  const router = useRouter();

  const [step, setStep] = useState(0);

  const handleStateChange = useCallback(
    <K extends keyof TStudyRecruitment>(
      field: K,
      value: TStudyRecruitment[K]
    ) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    [dispatch]
  );

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    if (session?.user) {
      handleStateChange("creatorEmail", session.user.email);
    }
  }, [session?.user, handleStateChange]);

  const goNextStep = () => {
    if (step > steps.length - 1) {
      router.push("/recommend");
      return;
    }
    setStep(step + 1);
  };

  const goPrevStep = () => {
    if (step <= 0) {
      router.back();
      return;
    }
    setStep(step - 1);
  };

  // Render Loading if session or user data is not yet available
  if (!session?.user) {
    return <Loading />;
  }

  const steps = [
    <StudyIntro
      key="studyIntro"
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <StudyDetail
      key="studyDetail"
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <MemberPreference
      key="memberPreference"
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <Complete key="complete" state={studyData} user={session?.user} />,
  ];

  return (
    <div id="recruitmentPage" className="px-4 h-screen">
      {step < steps.length - 1 && (
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
      )}
      {step < steps.length - 1 && (
        <Progressbar currentPage={step} totalPage={steps.length} />
      )}
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
