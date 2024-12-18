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
  const user = session?.user;

  if (!user) return <Loading />;

  const router = useRouter();

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user]);

  useEffect(() => {
    if (user) {
      handleStateChange("creatorEmail", user.email);
    }
  }, [user]);

  // 입력값 업데이트 핸들러
  const handleStateChange = useCallback(
    <K extends keyof TStudyRecruitment>(
      field: K,
      value: TStudyRecruitment[K]
    ) => {
      dispatch({ type: "UPDATE_FIELD", field, value });
    },
    [dispatch]
  ); // dispatch함수의 값은 변하지 않으니까 useReducer로 했을때 랜더링이 덜된다는 장점이 있음

  const steps = [
    <StudyIntro
      key="studyIntro" // 고정된 key 값을 사용
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <StudyDetail
      key="studyDetail" // 고정된 key 값을 사용
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <MemberPreference
      key="memberPreference" // 고정된 key 값을 사용
      state={studyData}
      handleStateChange={handleStateChange}
    />,
    <Complete key="complete" state={studyData} user={user} />,
  ];

  const [step, setStep] = useState(0);

  const goNextStep = () => {
    // 두 번 클릭 시, 전전 주소로 요청되는 문제
    if (step > steps.length - 1) {
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
          rightSlot={
            <Button theme="transparent">
              <Text size="sm" color="gray-600">
                임시저장
              </Text>
            </Button>
          }
        />
      )}

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
