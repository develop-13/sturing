"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import dynamic from "next/dynamic";
import Progressbar from "../atoms/Progressbar";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import Header from "../organisms/Header";
import { TStudyRecruitment } from "@/types/study";
import { initialState, recruitmentReducer } from "@/states/recruitmentReducer";
import { UserStatusContext } from "../../providers/UserStatusProvider";
import useLoginCheck from "@/hooks/useLoginCheck";
import { SessionUser } from "@/app/utils/authOptions";

const Skeleton = () => (
  <div className="h-screen flex items-center justify-center animate-pulse bg-gray-100">
    <div className="text-center">
      <Text size="lg" color="gray-500">
        Loading...
      </Text>
    </div>
  </div>
);

const StudyIntro = dynamic(
  () => import("../templates/recruitment/StudyIntro"),
  {
    loading: Skeleton,
  }
);
const StudyDetail = dynamic(
  () => import("../templates/recruitment/StudyDetail"),
  {
    loading: Skeleton,
  }
);
const MemberPreference = dynamic(
  () => import("../templates/recruitment/MemberPreference"),
  {
    loading: Skeleton,
  }
);
const Complete = dynamic(
  () => import("../templates/recruitment/RecruitmentComplete"),
  {
    loading: Skeleton,
  }
);

export type HandleStateChange<T> = <K extends keyof T>(
  field: K,
  value: T[K]
) => void;

function RecruitmentPage() {
  const [studyData, dispatch] = useReducer(recruitmentReducer, initialState);
  const { session } = useContext(UserStatusContext);
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

  const validate1 = () => {
    const { title, categories, description, type, location } = studyData;
    if (!title || !categories.length || !description || !type || !location) {
      alert("모든 필드를 채워주세요");
      return false;
    }
    return true;
  };

  const validate2 = () => {
    const { period, time, atmospheres } = studyData;
    if (
      !period?.startDate ||
      !period?.endDate ||
      !time?.startTime ||
      !time?.endTime ||
      !atmospheres?.length
    ) {
      alert("모든 필드를 채워주세요");
      return false;
    }
    return true;
  };

  const validate3 = () => {
    const {
      maxMembersNum,
      preferentialAge,
      preferentialLevel,
      necessaryRoles,
    } = studyData;
    if (
      !maxMembersNum ||
      !preferentialAge.length ||
      !preferentialLevel ||
      !necessaryRoles.length
    ) {
      alert("모든 필드를 채워주세요 ");
      return false;
    }
    return true;
  };

  useLoginCheck();

  useEffect(() => {
    if (session?.user) {
      handleStateChange("creatorEmail", session.user.email);
    }
  }, [session?.user, handleStateChange]);

  const goNextStep = () => {
    if (step === 0 && !validate1()) return;
    if (step === 1 && !validate2()) return;
    if (step === 2 && !validate3()) return;

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
    <Complete
      key="complete"
      state={studyData}
      user={session?.user as SessionUser}
    />,
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
