import Icon from "@/components/atoms/Icon";
import TitleLink from "@/components/molecules/TitleLink";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import StudyBox from "@/components/organisms/StudyBox";
import { TMatchingState } from "@/reducers/matchingReducer";
import { useEffect, useState } from "react";
import { TStudyItem } from "@/types/study";
import { ErrorBoundary } from "react-error-boundary";
import FadeLoader from "react-spinners/FadeLoader";
import Loading from "../Loading";
import { createPortal } from "react-dom";

const dummyUserName = "웅진";

type TCompleteTemplate = {
  userName?: string | null;
  state: TMatchingState;
};

const postMatchingInfo = async (state: TMatchingState) => {
  try {
    const response = await fetch("/matching/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

function CompleteTemplate(props: TCompleteTemplate) {
  const effectiveUserName = props.userName || "사용자";

  const [recommendations, setRecommendations] = useState<TStudyItem[]>([]); // 추천 데이터를 배열로 가정

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRecommendations = async () => {
      setIsLoading(true); // 로딩 상태 설정
      const data = await postMatchingInfo(props.state);
      if (data) {
        setRecommendations(data); // 추천 데이터를 상태에 저장
      }
      setIsLoading(false); // 로딩 상태 해제
    };

    getRecommendations(); // 함수 실행
  }, [props.state]); // props.state에 변화가 있을 때마다 호출

  if (isLoading) {
    return <div>{createPortal(<Loading />, document.body)}</div>;
  } else {
    return (
      <ErrorBoundary fallback={<div>error handling ui..</div>}>
        <section className="flex flex-col gap-[70px] pt-[36px]">
          <div className="mx-auto flex flex-col items-center gap-[10px]">
            <Icon type="COMPLETE" />
            <MatchingTitle role="COMPLETE" />
          </div>
          <div>
            <TitleLink
              title={`${effectiveUserName} 님과 딱 맞는 스터디 추천 `}
            />
            <div className="flex flex-row gap-2">
              {recommendations.map((study, index) => (
                <StudyBox key={index} props={study} />
              ))}
            </div>
          </div>
        </section>
      </ErrorBoundary>
    );
  }
}

export default CompleteTemplate;
