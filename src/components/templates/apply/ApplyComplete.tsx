import React, { useEffect, useRef } from "react";
import Complete from "../common/Complete";
import { TApplyState } from "@/reducers/ApplyReducer";
import { useParams } from "next/navigation";

type TApplyComplete = {
  userEmail: string;
  state: TApplyState;
};

function ApplyComplete({ userEmail, state }: TApplyComplete) {
  const params = useParams();
  const { sid } = params;
  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (hasSubmitted.current) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const submitApplication = async () => {
      try {
        const response = await fetch(`/apply/${sid}/api`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ applyInfo: state, userEmail }),
          signal,
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Application submitted successfully:", data);
          alert("지원서가 성공적으로 제출되었습니다.");
        } else {
          const errorData = await response.json();
          console.error("Application submission failed:", errorData);
          alert(`지원서 제출 실패: ${errorData.message || "알 수 없는 오류"}`);
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.log("요청이 중단되었습니다.");
        } else {
          console.error("지원서 제출 중 오류 발생:", error);
        }
      }
    };

    submitApplication();
    hasSubmitted.current = true;

    return () => {
      controller.abort();
    };
  }, [sid, state, userEmail]);

  return (
    <Complete
      mainText="모집글 작성을 완료했습니다."
      subText="스터디 지원자들의 지원서는 내 스터디에서 확인하고 수락할 수 있어요."
    />
  );
}

export default ApplyComplete;
