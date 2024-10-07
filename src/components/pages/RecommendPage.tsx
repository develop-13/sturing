"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import StudyBanner from "@/components/organisms/StudyBanner";
import StudyBox from "@/components/organisms/StudyBox";
import StudyCategory from "@/components/organisms/StudyCategory";
import { studyBanners } from "@/db/studyBanners";
import { studyDatas } from "@/db/studyDatas";
import Header from "../organisms/Header";
import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import GoMatchingPage from "../molecules/GoMatchingPage";
import Divider from "../atoms/Divider";
import { SearchbarWrapper } from "../molecules/Searchbar";
import SlideContentList from "../organisms/SlideContentList";
import Link from "next/link";
import LoginButton from "../molecules/auth-components/LoginButton";
import LogoutButton_temp from "../molecules/auth-components/LogoutButton_temp";
import LoginModal from "../organisms/LoginModal";

export default function RecommendPage() {
  const { data: session, status } = useSession();
  const [shouldShowLoginModal, setShouldShowLoginModal] = useState(false); // 이름 변경
  const recommendPageRef = useRef<Element | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null); // 모달 창 참조

  const closeModal = () => setShouldShowLoginModal(false);

  const openModal = () => {
    if (status === "unauthenticated") {
      setShouldShowLoginModal(true);
    }
  };

  useEffect(() => {
    recommendPageRef.current = document.getElementById("recommendPage");
  }, []);

  // 모달 외부 클릭 및 ESC 키 이벤트 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div id="recommendPage" className="flex flex-col overflow-hidden">
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <Icon type="MENU" />
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
            <LoginButton onClick={openModal} />
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
          <div className="flex flex-row gap-2 pl-4">
            <StudyBox props={studyDatas[0]} />
            <StudyBox props={studyDatas[1]} />
          </div>
        </SlideContentList>
        <SlideContentList title="새로 개설된 스터디" hasArrow={true}>
          <div className="flex flex-row gap-2 pl-4">
            <StudyBox props={studyDatas[2]} />
            <StudyBox props={studyDatas[3]} />
          </div>
        </SlideContentList>
      </div>
      {status === "unauthenticated" &&
        shouldShowLoginModal &&
        recommendPageRef.current &&
        createPortal(
          <div className="w-[375px] h-full fixed z-50 flex items-center bg-black bg-opacity-70">
            <LoginModal ref={modalRef} />
          </div>,
          recommendPageRef.current
        )}
    </div>
  );
}
