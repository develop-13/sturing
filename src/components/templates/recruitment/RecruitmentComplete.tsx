import { useEffect, useState } from "react";
import Loading from "../common/Loading";
import { TStudyRecruitment } from "@/types/study";
import Complete from "../common/Complete";
import { useRouter } from "next/navigation";
import { SessionUser } from "@/app/utils/authOptions";

function RecruitmentComplete({
  state,
  user,
}: {
  state: TStudyRecruitment;
  user?: SessionUser;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function createStudy() {
      // state 값을 보냄
      setIsLoading(true);
      const { imgSrc } = state; // state랑 따로 보냄, 여기서 imgSrc는 Blob타입
      if (!imgSrc) {
        alert("이미지가 없습니다.");
        return;
      }
      try {
        const formData = new FormData();
        formData.append("studyData", JSON.stringify(state)); // 큰 객체를 JSON 문자열로 변환하여 추가
        formData.append("studyImgSrc", imgSrc); // 파일 데이터 추가
        formData.append("user", JSON.stringify(user)); // 파일 데이터 추가

        const res = await fetch("/recruitment/api", {
          method: "POST",
          body: formData,
        });
        if (res.ok) {
          setIsLoading(false);
          alert(`Study created with ID`);
          router.back();
        } else {
          alert("Failed to create study");
        }
      } catch (err) {
        console.error(err);
      }
    }
    createStudy();
  }, [state]);

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
