import React, { useEffect, useState } from "react";
import SlideContentList from "./SlideContentList";
import StudyBox from "./StudyBox";
import { TStudyItem } from "@/types/study";

function UserStudies({
  userEmail,
  userName,
}: {
  userEmail?: string;
  userName: string;
}) {
  const [interestStudies, setInterestStudies] = useState([]);
  const [closeStudies, setCloseStudies] = useState([]);
  const [isFetchingStudies, setIsFetchingStudies] = useState(false);

  useEffect(() => {
    const controller = new AbortController(); // AbortController 생성
    const signal = controller.signal; // AbortController의 signal 가져오기

    async function getUserStudies() {
      try {
        setIsFetchingStudies(true);
        const userStudies = await fetch(
          `recommend/api?studyType=userMatching&userEmail=${userEmail}`,
          { signal } // fetch에 signal 추가
        ).then((res) => res.json());

        const { interestringStudies, closeStudies } = userStudies;

        setInterestStudies(interestringStudies);
        setCloseStudies(closeStudies);
        setIsFetchingStudies(false);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err);
        }
      }
    }

    getUserStudies();

    return () => {
      controller.abort(); // 컴포넌트 언마운트 또는 의존성 변경 시 fetch 요청 취소
    };
  }, []);

  return (
    <div>
      <SlideContentList
        title={`${userName}님을 위한 스터디`}
        hasArrow={true}
        className="text-lg"
      >
        {interestStudies.map((study: TStudyItem) => (
          <StudyBox props={study} key={study.createdAt} />
        ))}
      </SlideContentList>
      <SlideContentList
        title={`내 주변 스터디`}
        hasArrow={true}
        className="text-lg"
      >
        {closeStudies.map((study: TStudyItem) => (
          <StudyBox props={study} key={study.createdAt} />
        ))}
      </SlideContentList>
    </div>
  );
}

export default UserStudies;
