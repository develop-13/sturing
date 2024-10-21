"use client";
import Header from "../organisms/Header";
import MenuBtn from "../molecules/MenuBtn";
import Icon from "../atoms/Icon";
import Link from "next/link";
import LoginButton from "../molecules/auth-components/LoginButton";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import StudyBanner from "../organisms/StudyBanner";
import GoMatchingPage from "../molecules/GoMatchingPage";
import { SearchbarWrapper } from "../molecules/Searchbar";
import SlideContentList from "../organisms/SlideContentList";
import StudyCategory from "../organisms/StudyCategory";
import Divider from "../atoms/Divider";
import StudyBox from "../organisms/StudyBox";
import { studyBanners } from "@/db/studyBanners";
import { getSession, useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import { Session } from "next-auth";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../organisms/auth-components/userStatusProvider";

// 추후에 srp 에 맞게 리팩토링할 것
function RecommendPage() {
  // const { data: session, status } = useSession({
  //   required: false, // 인증되지 않은 상태에서는 세션을 가져오지 않음
  // });
  const {
    session,
    status,
    userCreated,
    hasMatchingInfo,
  }: UserStatusContextProps = useContext(UserStatusContext) || {
    session: null,
    status: "loading", // 기본값 설정
    userCreated: false,
    hasMatchingInfo: false,
  };

  console.log(session);
  console.log(`status=${status}`);
  console.log(`userCreated=${userCreated}`);
  console.log(`hasMatchingInfo=${hasMatchingInfo}`);

  // const [studies, setStudies] = useState({
  //   firstStudies: null,
  //   secondStudies: null,
  // });

  // const modalRequire = status === "authenticated" && hasMatchingInfo === false;
  // const modalRequire = useRef(false);

  // console.log(`modalRequire=${modalRequire.current}`);

  // 매칭 모달이 필요한 상황: 로그인 되어있지만 사용자 정보가 없는 상황

  // useEffect(() => {
  //   // 이 useEffect의 역할:
  //   //1. db에 user 정보가 없다면 추가한다.
  //   //2. db에 user 정보에 matchingInfo가 없다면, matchingModal이 필요함을 알린다.

  //   async function handleUserInfoRequest() {
  //     if (session?.user) {
  //       await createUserDocRequest(session);

  //       const hasUserMatchingInfo = await checkHasMatchingInfo(session);
  //       modalRequire.current = session?.user && hasUserMatchingInfo === false;
  //       // 로그인 되어 있는데 유저 정보가 없는 경우 매칭 모달이 필요함
  //     }
  //   }

  //   handleUserInfoRequest();
  // }, [session?.user, modalRequire.current]);

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
        <SearchbarWrapper
          usage="main"
          placeholder="관심 스터디 분야나 강의명을 검색해보세요"
          className="px-4"
        />
        <SlideContentList title="분야별 스터디 탐색하기" hasArrow={true}>
          <StudyCategory />
        </SlideContentList>
        <Divider type="row" py={4} color="gray-100" />
      </div>
    </div>
  );
}

export default React.memo(RecommendPage);
