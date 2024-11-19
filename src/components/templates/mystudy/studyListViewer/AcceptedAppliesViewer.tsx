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

type TAcceptedAppliesViewer = { applyData: TApply[] };

function AcceptedAppliesViewer(props: TAcceptedAppliesViewer) {
  if (!props.applyData.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Text weight="bold" color="gray-600">
          현재 받은 지원이 없습니다..
        </Text>
      </div>
    );
  }

  const [currentApply, setCurrentApply] = useState<null | TApply>(null);

  console.log(currentApply);

  const showCurrentApply = (_id: string) => {
    const clickedApply = props.applyData.find((data) => data._id === _id);
    if (clickedApply) {
      setCurrentApply(clickedApply);
    } else {
      alert("해당 지원 데이터가 없쓰요~");
    }
  };

  const closeCurrentApply = () => {
    setCurrentApply(null);
  };

  const rootLayout = useRef<Element | null>(null); // useRef로 관리
  const applyModalRef = useRef<HTMLDivElement | null>(null);

  console.log(applyModalRef);

  useEffect(() => {
    // 클라이언트 측에서 document에 접근하여 rootLayout 참조 설정
    rootLayout.current = document.getElementById("rootLayout");

    // 모달 바깥 클릭했을 때 닫히게 하기
    const clickListener = (e: MouseEvent) => {
      console.log(e.target);
      console.log(!!applyModalRef.current);
      console.log(applyModalRef.current?.contains(e.target as Node));

      if (
        !applyModalRef.current ||
        applyModalRef.current.contains(e.target as Node)
      )
        return;
      closeCurrentApply();
    };

    // ESC 키 클릭 시 모달 닫기
    const keyboardListener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCurrentApply();
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", clickListener);
    document.addEventListener("keydown", keyboardListener);

    // 이벤트 리스너 제거 (clean up)
    return () => {
      document.removeEventListener("mousedown", clickListener);
      document.removeEventListener("keydown", keyboardListener);
    };
  }, [applyModalRef.current]);

  return (
    <div className="bg-gray-100 px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[16px]">
      {props.applyData?.map((applyData) => {
        return (
          <InfoBox theme="white" key={applyData._id}>
            <div className="flex items-center justify-end mb-2">
              <Text size="sm" color="main">{`${formatDate(
                applyData.applicationDate,
                "full"
              )} 지원`}</Text>
            </div>
            <InfoTags theme="transparent" className="text-sm">
              <Text>
                {applyData.studyType === "online" ? "온라인" : "오프라인"}
              </Text>
              <Text>{`${formatDate(
                applyData.studyStartDate,
                "month-day"
              )}~${formatDate(applyData.studyEndDate, "month-day")}`}</Text>
              <Text>{applyData.studyLocation}</Text>
            </InfoTags>
            <Text size="lg" weight="bold" color="gray-800" className="">
              {applyData.studyTitle}
            </Text>
            <Divider type="row" color="bg-gray-300" classname="mb-4" />
            <UserInfoItem
              topText={applyData.userName}
              imgSrc="/img/profile/defaultProfileImage.png"
              bottomText={applyData.content}
            />
            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  showCurrentApply(applyData._id);
                }}
                extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100"
              >
                지원서 보기
              </Button>
            </div>
          </InfoBox>
        );
      })}
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
          rootLayout.current // useRef로 관리된 rootLayout 참조
        )}
    </div>
  );
}

export default AcceptedAppliesViewer;
