"use client";
import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import GoMatchingPage from "@/components/molecules/GoMatchingPage";
import MenuBtn from "@/components/molecules/MenuBtn";
import { SearchbarWrapper } from "@/components/molecules/Searchbar";
import LoginButton from "@/components/molecules/auth-components/LoginButton";
import LogoutButton_temp from "@/components/molecules/auth-components/LogoutButton_temp";
import { NavButtonGroup } from "@/components/organisms/ButtonGroup";
import Header from "@/components/organisms/Header";
import SlideContentList from "@/components/organisms/SlideContentList";
import StudyBanner from "@/components/organisms/StudyBanner";
import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";
import Link from "next/link";
import React from "react";
import { studyBanners } from "@/db/studyBanners";
import { TStudyItem } from "@/types/study";
import { useSession } from "next-auth/react";

type TRecommendClient = {
  popularStudies: TStudyItem[];
  newStudies: TStudyItem[];
};

function RecommedClient({ popularStudies, newStudies }: TRecommendClient) {
  const { data: session, status } = useSession();

  return (
    <div id="recommendPage" className="flex flex-col overflow-hidden">
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <MenuBtn />
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
              <LogoutButton_temp />
            </div>
          ) : (
            <LoginButton />
          )
        }
      />
      <NavButtonGroup pathname="/recommend" />
      <div>
        <StudyBanner props={studyBanners} />
        <GoMatchingPage session={session} />
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
        <SlideContentList title="이번주 인기 스터디" hasArrow={true}>
          {/* 이런식으로 클라이언트 컴포넌트 안에 서버 컴포넌트를 자식으로 넣어주는 구조 */}
          <div className="flex flex-row gap-2 pl-4">
            {popularStudies.map((study) => (
              <StudyBox props={study} key={study.id} />
            ))}
          </div>
        </SlideContentList>
        <SlideContentList title="새로 개설된 스터디" hasArrow={true}>
          <div className="flex flex-row gap-2 pl-4">
            {newStudies.map((study) => (
              <StudyBox props={study} key={study.id} />
            ))}
          </div>
        </SlideContentList>
      </div>
    </div>
  );
}

export default RecommedClient;
