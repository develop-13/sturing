"use client";
import Header from "../organisms/Header";
import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import StudyBanner from "../organisms/StudyBanner";
import React, { useContext } from "react";
import { TStudyItem } from "@/types/study";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../../providers/ModalProvider";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import CommonStudies from "../organisms/CommonStudies";
import Searchbar from "../molecules/Searchbar";
import StudyCategory from "../organisms/StudyCategory";
import SlideContentList from "../organisms/SlideContentList";

const Divider = dynamic(() => import("../atoms/Divider"), {
  ssr: false,
  loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
});
const LoginButton = dynamic(
  () => import("../molecules/auth-components/LoginButton"),
  {
    ssr: false,
    loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
  }
);
const LogoutButton = dynamic(
  () => import("../molecules/auth-components/LogoutButton"),
  {
    ssr: false,
    loading: () => <></>,
  }
);

const GoMatchingPage = dynamic(() => import("../molecules/GoMatchingPage"), {
  ssr: false,
  loading: () => <></>,
});

const UserStudies = dynamic(() => import("../organisms/UserStudies"), {
  ssr: false,
  loading: () => <div></div>,
});

const IconLabelButton = dynamic(() => import("../molecules/IconLabelButton"), {
  ssr: false,
  loading: () => <></>,
});

// 추후에 srp 에 맞게 리팩토링할 것
function RecommendPage({
  bannerImages,
  popularStudies,
  newStudies,
  userFromServer,
}: {
  bannerImages: React.ReactNode[];
  popularStudies: TStudyItem[];
  newStudies: TStudyItem[];
  userFromServer: any;
}) {
  const { session, hasUser, hasMatchingInfo }: UserStatusContextProps =
    useContext(UserStatusContext);

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { upModal, openModal, closeModal } = modalInfo;
  const isLoggedIn = !!session?.user;
  const router = useRouter();

  return (
    <div id="recommendPage" className="flex flex-col overflow-hidden">
      <Header
        className="px-4"
        leftSlot={
          <div className="flex gap-[12px]">
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          session ? (
            <LogoutButton />
          ) : (
            <LoginButton
              upModal={upModal}
              closeModal={closeModal}
              openModal={openModal}
            />
          )
        }
      />
      <NavButtonGroup
        pathname="/recommend"
        isLoggedIn={isLoggedIn}
        openLoginLodal={openModal}
      />
      <div>
        <StudyBanner bannerImages={bannerImages} />
        {hasUser && !hasMatchingInfo && <GoMatchingPage />}
      </div>
      <div className="flex flex-col gap-5 py-5 px-4">
        <Searchbar
          usage="main"
          placeholder="관심 스터디 분야나 강의명을 검색해보세요"
          className="px-4"
          value=""
        />
        <SlideContentList
          title="분야별 스터디 탐색하기"
          hasArrow={true}
          className="text-lg"
        >
          <StudyCategory />
        </SlideContentList>

        <Divider type="row" py={4} color="bg-gray-300" />
        {userFromServer && isLoggedIn && hasMatchingInfo ? (
          <UserStudies
            userName={session?.user.name as string}
            userEmail={session?.user.email as string}
          />
        ) : (
          <CommonStudies
            newStudies={newStudies}
            popularStudies={popularStudies}
          />
        )}
      </div>
      <IconLabelButton
        datas={{
          text: "스터디 개설하기",
          usage: "listItem",
          icon: <Icon type="RLOGO" />,
          onClick: () => {
            if (!isLoggedIn) {
              // 로그인이 안되어 있는데 클릭하면 모달이 열리도록 함
              openModal();
            } else {
              router.push("/recruitment");
            }
          },
          extraStyle:
            "fixed xs:bottom-[23%] xs:right-[10%] sm:bottom-[26%]  sm:right-[35%]  lg:bottom-[28%] lg:right-[35%] z-40 p-15 ",
        }}
      />
    </div>
  );
}
export default RecommendPage;
