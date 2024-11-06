import { useEffect, useState } from "react";
import Loading from "../Loading";
import { TStudyRecruitment } from "@/types/study";
import Complete from "../common/Complete";

function RecruitmentComplete({ state }: { state: TStudyRecruitment }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function createStudy() {
      // state 값을 보냄
      setIsLoading(true);
      const { imgSrc } = state; // state랑 따로 보냄
      if (!imgSrc) {
        alert("이미지가 없습니다.");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("studyData", JSON.stringify(state)); // 큰 객체를 JSON 문자열로 변환하여 추가
        formData.append("studyImgSrc", imgSrc); // 파일 데이터 추가

        const res = await fetch("/recruitment/api", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          const data = await res.json();
          setIsLoading(false);
          alert(`Study created with ID`);
        } else {
          alert("Failed to create study");
        }
      } catch (err) {
        console.error();
      }
    }
    createStudy();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Complete
      mainText=" 모집글 작성을 완료했습니다!"
      subText="스터디 지원자들의 지원서는 내 스터디에서 확인하고 수락할 수 있어요."
    />
  );
}

export default RecruitmentComplete;
