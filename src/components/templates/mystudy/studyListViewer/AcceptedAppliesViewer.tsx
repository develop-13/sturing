"use client";

import { TApply } from "@/types/apply";
import { formatDate } from "@/utils/formatDate";
import InfoBox from "../../../organisms/infoBox/InfoBox";
import Text from "@/components/atoms/Text";
import InfoTags from "@/components/molecules/InfoTags";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/molecules/Button";
import UserInfoItem from "@/components/molecules/UserInfoItem";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ApplyReadOnly from "@/components/templates/mystudy/ApplyReadOnly";

type TAcceptedAppliesViewer = {
  userEmail: string; // 유저 이메일을 prop으로 받음
};

function AcceptedAppliesViewer({ userEmail }: TAcceptedAppliesViewer) {
  const [applyData, setApplyData] = useState<TApply[]>([]); // 상태로 데이터 관리
  const [currentApply, setCurrentApply] = useState<null | TApply>(null);
  const rootLayout = useRef<Element | null>(null);
  const applyModalRef = useRef<HTMLDivElement | null>(null);

  // 데이터 fetch 로직
  useEffect(() => {
    async function fetchAcceptedApplies() {
      try {
        const response = await fetch(
          `/mystudy/api?userEmail=${userEmail}&type=accepted_applies`
        );
        if (!response.ok) throw new Error("Failed to fetch accepted_applies");
        const data = await response.json();
        setApplyData(data); // 서버에서 받은 데이터를 상태로 설정
      } catch (error) {
        console.error("Error fetching accepted applies:", error);
      }
    }

    fetchAcceptedApplies();
  }, [userEmail]);

  const showCurrentApply = (_id: string) => {
    const clickedApply = applyData.find((data) => data._id === _id);
    if (clickedApply) {
      setCurrentApply(clickedApply);
    } else {
      alert("해당 지원 데이터가 없습니다.");
    }
  };

  const closeCurrentApply = () => {
    setCurrentApply(null);
  };

  useEffect(() => {
    rootLayout.current = document.getElementById("rootLayout");

    const clickListener = (e: MouseEvent) => {
      if (
        !applyModalRef.current ||
        applyModalRef.current.contains(e.target as Node)
      )
        return;
      closeCurrentApply();
    };

    const keyboardListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCurrentApply();
    };

    document.addEventListener("mousedown", clickListener);
    document.addEventListener("keydown", keyboardListener);

    return () => {
      document.removeEventListener("mousedown", clickListener);
      document.removeEventListener("keydown", keyboardListener);
    };
  }, [applyModalRef.current]);

  if (!applyData.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Text weight="bold" color="gray-600">
          현재 받은 지원이 없습니다..
        </Text>
      </div>
    );
  }

  return (
    <div className="max-h-[300px] overflow-scroll bg-gray-100 px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[16px]">
      {applyData.map((apply) => (
        <InfoBox theme="white" key={apply._id}>
          <div className="flex items-center justify-end mb-2">
            <Text size="sm" color="main">
              {`${formatDate(apply.applicationDate, "full")} 지원`}
            </Text>
          </div>
          <InfoTags theme="transparent" className="text-sm">
            <Text>{apply.studyType === "online" ? "온라인" : "오프라인"}</Text>
            <Text>{`${formatDate(
              apply.studyStartDate,
              "month-day"
            )}~${formatDate(apply.studyEndDate, "month-day")}`}</Text>
            <Text>{apply.studyLocation}</Text>
          </InfoTags>
          <Text size="lg" weight="bold" color="gray-800" className="">
            {apply.studyTitle}
          </Text>
          <Divider type="row" color="bg-gray-300" classname="mb-4" />
          <UserInfoItem
            topText={apply.userName}
            imgSrc={
              apply.applicantImgSrc || "/img/profile/defaultProfileImage.png"
            }
            bottomText={apply.content}
          />
          <div className="flex space-x-4">
            <Button
              onClick={() => showCurrentApply(apply._id)}
              extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100"
            >
              지원서 보기
            </Button>
          </div>
        </InfoBox>
      ))}
      {currentApply &&
        rootLayout.current &&
        createPortal(
          <div className="w-[375px] h-full fixed top-0 z-50 flex items-center bg-black bg-opacity-70">
            <ApplyReadOnly
              type="accepted_applies"
              ref={applyModalRef}
              applyId={currentApply._id}
            />
          </div>,
          rootLayout.current
        )}
    </div>
  );
}

export default AcceptedAppliesViewer;
