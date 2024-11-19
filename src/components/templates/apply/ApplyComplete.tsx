import React, { useEffect } from "react";
import Complete from "../common/Complete";
import { TApplyState } from "@/reducers/ApplyReducer";
import { useParams } from "next/navigation";

type TApplyComplete = {
  userEmail: string;
  userName: string;
  state: TApplyState;
};

function ApplyComplete({ userEmail, state, userName }: TApplyComplete) {
  const params = useParams();
  const { sid } = params;

  console.log(userEmail);
  console.log(state);
  console.log(`sid=${sid}`);

  useEffect(() => {
    // apply/[sid]/api로 apply 저장 요청 날림
    async function submitApplication() {
      try {
        // [sid] 부분을 실제 studyId로 대체
        const response = await fetch(`/apply/${sid}/api`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applyInfo: state, // TApplyState 타입의 객체
            userEmail: userEmail, // 유저 이메일
            userName: userName,
          }),
        });

        // 응답 처리
        if (response.ok) {
          const data = await response.json();
          console.log("Application submitted successfully:", data);
          alert("Application submitted successfully:");
        } else {
          const errorData = await response.json();
          console.error("Application submission failed:", errorData);
          alert("Application submission failed:");
        }
      } catch (error) {
        console.error("Error submitting application:", error);
      }
    }

    submitApplication();
  });

  return (
    <Complete
      mainText="모집글 작성을 완료했습니다."
      subText="스터디 지원자들의 지원서는 내 스터디에서 확인하고 수락할 수 있어요."
    />
  );
}

export default ApplyComplete;
