import React, { useEffect, useState } from "react";
import SlideContentList from "./SlideContentList";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import Text from "../atoms/Text";
import dynamic from "next/dynamic";

const StudyBox = dynamic(() => import("./StudyBox"), {
  ssr: false,
  loading: () => <></>,
});

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

        console.log(userStudies);

        const {
          firstStudies: interestringStudies,
          secondStudies: closeStudies,
        } = userStudies;

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
    <div className="flex flex-col gap-3">
      <SlideContentList
        title={`${userName}님을 위한 스터디`}
        hasArrow={true}
        className="text-lg"
      >
        {/* {interestStudies.map((study: TStudyItem) => (
          <StudyBox props={study} key={study.createdAt} />
        ))} */}
        {isFetchingStudies ? (
          Array(3)
            .fill(null)
            .map((_, index) => <StudyBoxSkeleton key={index} />)
        ) : interestStudies.length ? (
          interestStudies.map((study: TStudyItem) => (
            <StudyBox props={study} key={study.createdAt} />
          ))
        ) : (
          <div className="flex flex-row gap-2 h-[250px] w-full justify-center items-center">
            <Text weight="bold" size="base" color="gray-600">
              해당되는 스터디가 없습니다.
            </Text>
          </div>
        )}
      </SlideContentList>
      <SlideContentList
        title={`내 주변 스터디`}
        hasArrow={true}
        className="text-lg"
      >
        {/* {closeStudies.map((study: TStudyItem) => (
          <StudyBox props={study} key={study.createdAt} />
        ))} */}
        {isFetchingStudies ? (
          Array(3)
            .fill(null)
            .map((_, index) => <StudyBoxSkeleton key={index} />)
        ) : closeStudies.length ? (
          closeStudies.map((study: TStudyItem) => (
            <StudyBox props={study} key={study.createdAt} />
          ))
        ) : (
          <div className="flex flex-row gap-2 h-[250px] w-full justify-center items-center">
            <Text weight="bold" size="base" color="gray-600">
              해당되는 스터디가 없습니다.
            </Text>
          </div>
        )}
      </SlideContentList>
    </div>
  );
}

export default UserStudies;
