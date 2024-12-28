"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const ApplyTextReadOnly = dynamic(() => import("./ApplyTextReadOnly"), {
  ssr: false,
});
import RoleViewer from "./RoleViewer";
import { TApply } from "@/types/apply";
import Button from "@/components/molecules/Button";
import Text from "@/components/atoms/Text";
import { TRoleText } from "@/types/common";
import { useStep } from "@/hooks/useStep";

// type TApplyReadOnly = { applyData: TApply };
type TApplyReadOnly = {
  type: "accepted_applies" | "sent_applies";
  applyId: string;
};

const ApplyReadOnly = forwardRef<HTMLDivElement, TApplyReadOnly>(
  function ApplyReadOnly(
    props: TApplyReadOnly,
    ref: React.Ref<HTMLDivElement>
  ) {
    const { step, nextStep, prevStep } = useStep();

    const [currentApply, setCurrentApply] = useState<null | TApply>(null);

    const [isSendingReq, setIsSendingReq] = useState(false);

    const acceptApply = async () => {
      try {
        setIsSendingReq(true);
        const response = await fetch(
          `/mystudy/api?applyId=${currentApply?._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(currentApply),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch apply data");
        }
        setIsSendingReq(false);
      } catch (err) {
        console.error(err);
      }
    };

    const goNextStep = () => {
      if (step >= steps.length - 1) {
        return;
      }
      nextStep();
    };

    const goPrevStep = () => {
      console.log("prev Step clicked");
      if (step <= 0) {
        return;
      }
      prevStep();
    };

    const getPrevButton = () => {
      if (step > 0 && steps.length > 1) {
        return (
          <Button
            theme="ordinary"
            extraCss="h-full basis-0 flex-grow rounded-[5px]"
            onClick={goPrevStep}
          >
            <Text size="base" weight="bold" color="gray-700">
              이전
            </Text>
          </Button>
        );
      } else {
        return null;
      }
    };

    const getNextButton = () => {
      // 다음
      if (step < steps.length - 1 && steps.length > 1) {
        // 마지막 버튼이 아니고, 전체 길이가 1보다 클 때, => 첫 페이지가 마지막이 아닌 경우
        return (
          <Button
            theme="primary"
            extraCss="h-full basis-0 flex-grow-[2] rounded-[5px]"
            onClick={goNextStep}
          >
            <Text size="base" weight="bold" color="white">
              다음
            </Text>
          </Button>
        );
      } else {
        return null;
      }
    };

    const getSendButton = () => {
      if (step != steps.length - 1) return null; // 마지막 버튼일 때,

      if (props.type === "sent_applies") return null;

      if (currentApply?.status == "pending") {
        // 아직 수락하지 않은 스터디일 떄
        return (
          <Button
            theme="primary"
            extraCss="h-full basis-0 flex-grow-[2] rounded-[5px]"
            onClick={async () => {
              await acceptApply();
            }}
          >
            <Text size="base" weight="bold" color="white">
              {isSendingReq ? "보내고 있습니다." : "수락하기"}
            </Text>
          </Button>
        );
      } else if (currentApply?.status == "accepted") {
        return (
          <Button
            theme="ordinary"
            extraCss="h-full basis-0 flex-grow-[2] rounded-[5px]"
          >
            <Text size="base" weight="bold" color="gray-600">
              이미 수락한 지원내용입니다.
            </Text>
          </Button>
        );
      }
    };

    useEffect(() => {
      if (isSendingReq) {
        return;
      }

      async function getApplyData() {
        try {
          // _id에 해당하는 Apply를 가져옴
          const response = await fetch(`/mystudy/api?applyId=${props.applyId}`);

          if (!response.ok) {
            throw new Error("Failed to fetch apply data");
          }

          const data = await response.json();
          setCurrentApply(data); // Apply 정보를 상태에 저장
        } catch (error) {
          console.error("Error fetching apply data:", error);
        }
      }
      // _id를 사용하여 현재 지원 정보를 불러옴
      getApplyData();
    }, [isSendingReq]);

    if (currentApply == null) {
      return <div className="text-white">Loading..</div>;
    }

    const onChangeRole = (fixedRole: TRoleText) => {
      setCurrentApply({ ...currentApply, desiredRole: [fixedRole] });
    };
    const steps = [
      <ApplyTextReadOnly
        key={"ApplyTextReadOnly"}
        title={currentApply.title}
        description={currentApply.content}
      />,
      <RoleViewer
        key={"RoleViewer"}
        type={props.type}
        onChangeRole={onChangeRole}
        desireRoles={currentApply.desiredRole}
      />,
    ];

    return (
      <div ref={ref} className="mx-4 w-full h-[500px] bg-white rounded-sm">
        {steps[step]}
        <div className="w-full inset-x-0 px-4">
          <div className="w-full h-[50px] flex gap-[11px] my-3">
            {getPrevButton()}
            {getNextButton()}
            {getSendButton()}
          </div>
        </div>
      </div>
    );
  }
);

export default ApplyReadOnly;
