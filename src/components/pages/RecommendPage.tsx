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
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import { Session } from "next-auth";

const getData = async () => {
  const data = await fetch("recommend/api").then((res) => res.json());
  return data;
};

const createUserDocRequest = async (session: Session | null) => {
  if (!session) {
    console.log("session에 사용자 정보가 없습니다.");
    return;
  }

  const newUserData = {
    name: session?.user.name,
    email: session?.user.email,
  };

  try {
    const data = await fetch("/recommend/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserData),
    }).then((res) => res.json());
    return data;
  } catch (err) {
    console.log(err);
    return { message: "createUserDocRequest 통신 실패" };
  }
};

// 추후에 srp 에 맞게 리팩토링할 것
function RecommendPage() {
  // const { data: session, status } = useSession();

  const { data: session, status } = useSession({
    required: false, // 인증되지 않은 상태에서는 세션을 가져오지 않음
  });
  console.log("recommedPage에서 세션 요청을 보냅니다!");
  console.log("현재 세션 상태입니다.");
  console.log(session);

  const [isFetchingStudies, setIsFetchingStudies] = useState(true); // 로딩 상태 추가
  const [popularStudies, setPopularStudies] = useState<TStudyItem[]>([]);
  const [newStudies, setNewStudies] = useState<TStudyItem[]>([]);
  const [showMatching, setShowMatching] = useState(false);

  useEffect(() => {
    const checkUserAndMatchingInfo = async () => {
      try {
        // 사용자 정보 생성 및 매칭 정보 확인
        const data = await createUserDocRequest(session);
        const { hasMatchingInfo } = data;

        if (!hasMatchingInfo) {
          // 매칭 정보가 없는 경우 모달을 띄움
          setShowMatching(true);
        }
      } catch (error) {
        console.error("Error checking user and matching info", error);
      }
    };

    if (status === "authenticated") {
      checkUserAndMatchingInfo();
    }
  }, [status]);

  useEffect(() => {
    const fetchStudies = async () => {
      const { popularStudies, newStudies } = await getData();
      setPopularStudies((prev) => popularStudies);
      setNewStudies((prev) => newStudies);
      setIsFetchingStudies((prev) => false); // 데이터를 가져온 후 로딩 상태를 false로 변경
    };

    fetchStudies();
    console.log("fetchStudies useEffect called");
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
        {session?.user && showMatching && (
          <GoMatchingPage isMatchingModalUp={showMatching} />
        )}
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
            {isFetchingStudies
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
            {isFetchingStudies
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

export default React.memo(RecommendPage);
