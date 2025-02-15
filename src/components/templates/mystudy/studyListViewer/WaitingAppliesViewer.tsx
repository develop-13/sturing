"use client";
import { TApply } from "@/types/apply";
import InfoBox from "../../../organisms/infoBox/InfoBox";
import Text from "@/components/atoms/Text";
import InfoTags from "@/components/molecules/InfoTags";
import { v4 } from "uuid";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/molecules/Button";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const ApplyReadOnly = dynamic(() => import("../ApplyReadOnly"), { ssr: false });

function WaitingAppliesViewer({ userEmail }: { userEmail: string }) {
  const [applyData, setApplyData] = useState<TApply[]>([]);
  const [currentApply, setCurrentApply] = useState<null | TApply>(null);
  const rootLayout = useRef<Element | null>(null);
  const applyModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 서버로 요청을 보내 사용자 applies 데이터를 불러오기
    async function fetchApplies() {
      try {
        const response = await fetch(
          `/mystudy/api?userEmail=${userEmail}&type=applies`
        );
        if (!response.ok) throw new Error("Failed to fetch applies");
        const data = await response.json();
        setApplyData(data); // 서버에서 받은 데이터를 상태로 설정
      } catch (error) {
        console.error("Error fetching applies:", error);
      }
    }

    fetchApplies();
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

  const cancelApply = async (applyId: string) => {
    try {
      const response = await fetch("/mystudy/api", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applyId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Delete successful:", result.message);

        // 성공적으로 삭제되면 상태에서 해당 지원 제거
        setApplyData((prevData) =>
          prevData.filter((apply) => apply._id !== applyId)
        );
      } else {
        const error = await response.json();
        console.error("Delete failed:", error.message);
      }
    } catch (err) {
      console.error("Error during DELETE request:", err);
    }
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
  }, []);

  if (!applyData.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Text weight="bold" color="gray-600">
          현재 지원한 스터디가 없습니다.
        </Text>
      </div>
    );
  }

  console.log(applyData);

  return (
    <main>
      {applyData.map((apply) => (
        <InfoBox theme="white" key={v4()}>
          <div className="flex items-center justify-end mb-2">
            <Text size="sm" color="main">
              {`${formatDate(apply.applicationDate, "full")} 지원`}
            </Text>
          </div>
          <InfoTags theme="transparent" className="text-sm">
            <Text>{apply.studyType === "online" ? "온라인" : "오프라인"}</Text>
            <Text>
              {`${formatDate(apply.studyStartDate, "month-day")}~${formatDate(
                apply.studyEndDate,
                "month-day"
              )}`}
            </Text>
            <Text>{apply.studyLocation}</Text>
          </InfoTags>
          <Text size="lg" weight="bold" color="gray-800" className="">
            {apply.studyTitle}
          </Text>
          <Divider type="row" color="bg-gray-300" classname="mb-4" />
          <div className="flex space-x-4">
            <Button
              onClick={() => showCurrentApply(apply._id)}
              extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100"
            >
              지원서 보기
            </Button>
            <Button
              onClick={() => cancelApply(apply._id)}
              extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100"
            >
              지원 취소하기
            </Button>
          </div>
        </InfoBox>
      ))}
      {currentApply &&
        rootLayout.current &&
        createPortal(
          <div className="w-[375px] h-full fixed top-0 z-50 flex items-center bg-black bg-opacity-70">
            <ApplyReadOnly
              type="sent_applies"
              ref={applyModalRef}
              applyId={currentApply._id}
            />
          </div>,
          rootLayout.current
        )}
    </main>
  );
}

export default WaitingAppliesViewer;
