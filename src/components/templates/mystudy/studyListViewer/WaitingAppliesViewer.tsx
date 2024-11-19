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
import ApplyReadOnly from "../ApplyReadOnly";

type TWaitingAppliesViewer = {
  applyData: TApply[];
  handleDeleteSuccess: (deletedId: string) => void; // 상위의 클라이언트 측 데이터 지우기
};

function WaitingAppliesViewer(props: TWaitingAppliesViewer) {
  if (!props.applyData.length) {
    return (
      <div className="w-full h-[300px] flex items-center justify-center">
        <Text weight="bold" color="gray-600">
          현재 지원한 스터디가 없습니다.
        </Text>
      </div>
    );
  }

  const [currentApply, setCurrentApply] = useState<null | TApply>(null);

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

  console.log(props.applyData);

  console.log(currentApply);

  const cancelApply = async (applyId: string) => {
    // 지원 추소하기

    console.log("cancelApply called!");
    console.log(applyId);

    if (applyId === undefined) return;

    try {
      // DELETE 요청 전송

      console.log("I am in try");

      const response = await fetch("/mystudy/api/userDatas", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applyId }), // Apply ID 전송
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Delete successful:", result.message);
        props?.handleDeleteSuccess(applyId); // 성공 시 부모 컴포넌트의 콜백 호출
      } else {
        const error = await response.json();
        console.error("Delete failed:", error.message);
      }
    } catch (err) {
      console.error("Error during DELETE request:", err);
    }
  };

  const rootLayout = useRef<Element | null>(null); // useRef로 관리
  const applyModalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 클라이언트 측에서 document에 접근하여 rootLayout 참조 설정
    rootLayout.current = document.getElementById("rootLayout");

    // 모달 바깥 클릭했을 때 닫히게 하기
    const clickListener = (e: MouseEvent) => {
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
          <InfoBox theme="white" key={v4()}>
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
            <div className="flex space-x-4">
              <Button
                onClick={() => {
                  showCurrentApply(applyData._id);
                }}
                extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100"
              >
                지원서 보기
              </Button>
              <Button
                onClick={async () => {
                  await cancelApply(applyData._id);
                }}
                extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100"
              >
                지원 취소하기
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
              type="sent_applies"
              ref={applyModalRef}
              applyId={currentApply._id}
            />
          </div>,
          rootLayout.current // useRef로 관리된 rootLayout 참조
        )}
    </div>
  );
}

export default WaitingAppliesViewer;
