"use client";
import Header from "../organisms/Header";
import MenuBtn from "../molecules/MenuBtn";
import Icon from "../atoms/Icon";
import Link from "next/link";
import LogoutButton_temp from "../molecules/auth-components/LogoutButton_temp";
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
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";

const getData = async () => {
  const data = await fetch("recommend/api").then((res) => res.json());
  return data;
};

// 추후에 srp 에 맞게 리팩토링할 것
export default function RecommendPage() {
  const { data: session, status } = useSession();

  const [popularStudies, setPopularStudies] = useState<TStudyItem[]>([]);
  const [newStudies, setNewStudies] = useState<TStudyItem[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const fetchStudies = async () => {
      const { popularStudies, newStudies } = await getData();
      setPopularStudies((prev) => popularStudies);
      setNewStudies((prev) => newStudies);
      setLoading((prev) => false); // 데이터를 가져온 후 로딩 상태를 false로 변경
    };

    fetchStudies();
  }, []);

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
          <div className="flex flex-row gap-2 pl-4 h-[250px] justify-center">
            {/* 로딩 중이면 스켈레톤 UI를 표시하고, 로딩이 끝난 후 실제 데이터를 표시 */}
            {loading
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <StudyBoxSkeleton key={index} />) // 스켈레톤 UI를 3개 렌더링
              : popularStudies.map((study: TStudyItem) => (
                  <StudyBox props={study} key={study.id} />
                ))}
          </div>
        </SlideContentList>
        <SlideContentList title="새로 개설된 스터디" hasArrow={true}>
          <div className="flex flex-row gap-2 pl-4 h-[250px] justify-center">
            {loading
              ? Array(3)
                  .fill(null)
                  .map((_, index) => <StudyBoxSkeleton key={index} />) // 스켈레톤 UI를 3개 렌더링
              : newStudies.map((study: TStudyItem) => (
                  <StudyBox props={study} key={study.id} />
                ))}
          </div>
        </SlideContentList>
      </div>
    </div>
  );
}
