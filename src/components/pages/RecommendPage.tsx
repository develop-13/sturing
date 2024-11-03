"use client";
import Header from "../organisms/Header";
import MenuBtn from "../molecules/MenuBtn";
import Icon from "../atoms/Icon";
import Link from "next/link";
import LoginButton from "../molecules/auth-components/LoginButton";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import StudyBanner from "../organisms/StudyBanner";
import GoMatchingPage from "../molecules/GoMatchingPage";
import Searchbar from "../molecules/Searchbar";
import SlideContentList from "../organisms/SlideContentList";
import StudyCategory from "../organisms/StudyCategory";
import Divider from "../atoms/Divider";
import StudyBox from "../organisms/StudyBox";
import { studyBanners } from "@/db/studyBanners";
import React, { useContext, useEffect, useState } from "react";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../organisms/auth-components/UserStatusProvider";

//

// 추후에 srp 에 맞게 리팩토링할 것
function RecommendPage() {
  const {
    session,
    status,
    userCreated,
    hasMatchingInfo,
  }: UserStatusContextProps = useContext(UserStatusContext);

  console.log(session);
  // console.log(`status=${status}`);
  // console.log(`userCreated=${userCreated}`);
  // console.log(`hasMatchingInfo=${hasMatchingInfo}`);

  const [studies, setStudies] = useState({
    firstStudies: [],
    secondStudies: [],
  });

  const [isFetchingStudies, setIsFetchingStudies] = useState(false);

  let studyPlaceHolder =
    status === "authenticated" && userCreated && hasMatchingInfo
      ? {
          firstStudies: `${session?.user.name}님을 위한 스터디`,
          secondStudies: `내 주변에 새로 개설된 스터디`,
        }
      : {
          firstStudies: "인기 스터디 ",
          secondStudies: `새로 개설된 스터디`,
        };

  useEffect(() => {
    async function getStudies(studyType: "common" | "userMatching") {
      try {
        setIsFetchingStudies(true);
        const fetchedStudies = await fetch(
          `recommend/api?studyType=${studyType}&userEmail=${session?.user.email}`
        ).then((res) => res.json());

        // console.log(fetchedStudies);

        const { firstStudies, secondStudies } = fetchedStudies;
        setStudies({
          firstStudies: firstStudies,
          secondStudies: secondStudies,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetchingStudies(false);
      }
    }

    if (status === "authenticated" && userCreated && hasMatchingInfo) {
      // 로그인 했고 이미 매칭 정보도 정한 경우 맞춤 스터디를 추천해줌
      getStudies("userMatching");
    } else {
      getStudies("common");
      console.log("getStudies common called");
    }
  }, []);

  return (
    <div id="recommendPage" className="flex flex-col overflow-hidden">
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <MenuBtn session={session} />
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          session ? (
            <div className="flex gap-[12px]">
              <Icon type="BELL" />
              <Link href={"#"}>
                <Icon type="USER" />
              </Link>
            </div>
          ) : (
            <LoginButton />
          )
        }
      />
      <NavButtonGroup pathname="/recommend" />
      <div>
        <StudyBanner props={studyBanners} />
        {userCreated && !hasMatchingInfo && <GoMatchingPage />}
      </div>
      <div className="flex flex-col gap-5 py-5">
        <Searchbar
          usage="main"
          placeholder="관심 스터디 분야나 강의명을 검색해보세요"
          className="px-4"
          value=""
        />
        <SlideContentList title="분야별 스터디 탐색하기" hasArrow={true}>
          <StudyCategory />
        </SlideContentList>
        <Divider type="row" py={4} color="gray-100" />
        <SlideContentList title={studyPlaceHolder.firstStudies} hasArrow={true}>
          <div className="flex flex-row gap-2 pl-4 h-[250px] justify-center">
            {isFetchingStudies
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <StudyBoxSkeleton key={index} />) // 스켈레톤 UI를 3개 렌더링
              : studies.firstStudies.length
              ? studies.firstStudies.map((study: TStudyItem) => (
                  <StudyBox props={study} key={study.id} />
                ))
              : "인기 스터디가 없습니다."}
          </div>
        </SlideContentList>
        <SlideContentList
          title={studyPlaceHolder.secondStudies}
          hasArrow={true}
        >
          <div className="flex flex-row gap-2 pl-4 h-[250px] justify-center">
            {isFetchingStudies
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <StudyBoxSkeleton key={index} />) // 스켈레톤 UI를 3개 렌더링
              : studies.secondStudies.length
              ? studies.secondStudies.map((study: TStudyItem) => (
                  <StudyBox props={study} key={study.id} />
                ))
              : "내 주변 스터디가 없습니다."}
          </div>
        </SlideContentList>
      </div>
    </div>
  );
}

// export default React.memo(RecommendPage);
export default RecommendPage;
