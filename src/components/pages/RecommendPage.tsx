"use client";
import Header from "../organisms/Header";
import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import StudyBanner from "../organisms/StudyBanner";
import Divider from "../atoms/Divider";
import { studyBanners } from "@/db/studyBanners";
import React, { useContext, useEffect, useState } from "react";
import { TStudyItem } from "@/types/study";
import CommonStudies from "../organisms/CommonStudies";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../../providers/ModalProvider";
import Text from "../atoms/Text";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { sessionUserState } from "@/states/atoms";
import { userStatusSelector } from "@/states/selectors";
import UserStudies from "../organisms/UserStudies";

const LoginButton = dynamic(
  () => import("../molecules/auth-components/LoginButton"),
  {
    ssr: false,
  }
);

const LogoutButton = dynamic(
  () => import("../molecules/auth-components/LogoutButton"),
  {
    ssr: false,
  }
);

// GoMatchingPage를 lazy로 로드
const GoMatchingPage = dynamic(() => import("../molecules/GoMatchingPage"), {
  ssr: false,
});
// IconLabelButton을 lazy로 로드
const IconLabelButton = dynamic(() => import("../molecules/IconLabelButton"), {
  ssr: false,
});
// Searchbar를 lazy로 로드
const Searchbar = dynamic(() => import("../molecules/Searchbar"), {
  ssr: false,
});
const StudyBox = dynamic(() => import("../organisms/StudyBox"), {
  ssr: false,
});
const SlideContentList = dynamic(
  () => import("../organisms/SlideContentList"),
  {
    ssr: false,
  }
);
const StudyCategory = dynamic(() => import("../organisms/StudyCategory"), {
  ssr: false,
});

// 추후에 srp 에 맞게 리팩토링할 것
function RecommendPage({
  popularStudies,
  newStudies,
  user,
}: {
  popularStudies: TStudyItem[];
  newStudies: TStudyItem[];
  user: any;
}) {
  console.log(popularStudies);
  console.log(newStudies);
  console.log(user);

  // const {
  //   session,
  //   status,
  //   userCreated,
  //   hasMatchingInfo,
  // }: UserStatusContextProps = useContext(UserStatusContext);

  const { data: session, status } = useSession();

  // const session = { user: { name: "g", email: "" } };

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { upModal, openModal, closeModal } = modalInfo;
  const isLoggedIn = !!session?.user;
  const router = useRouter();

  const [sessionUser, setSessionUser] = useRecoilState(sessionUserState);

  const userStatus = useRecoilValue(userStatusSelector); // Selector 값 읽기
  console.log(userStatus);
  //selector에 등록한 비동기 함수가 실행되고 그 함수에서 반환된 값이 userStatus에 저장
  // 여기서는 userCreated, hasMatchingInfo가 될듯

  console.log();

  const { hasMatchingInfo } = userStatus;
  // const hasMatchingInfo = false;
  // 여기까지 존재하고 useEffect 없었을 때는 랜더링 3번됨
  // 1.초기랜더링 2.useSession때문에 1번, userStatus때문에 한 번

  // 세션 데이터를 Atom에 저장
  // useEffect(() => {
  //   console.log("use Effect called and call");

  //   if (isLoggedIn) {
  //     // 로그인 했을 떄,
  //     console.log("is logged in");

  //     setSessionUser({
  //       image: session.user.image,
  //       name: session.user.name,
  //       email: session.user.email,
  //     });
  //   } else {
  //     // 로그아웃 했을 떄,
  //     if (sessionUser.name && sessionUser.name && sessionUser.email) {
  //       console.log("is not logged in");
  //       // 초기 랜더링 방지
  //       setSessionUser({
  //         image: null,
  //         name: null,
  //         email: null,
  //       });
  //     }
  //   }
  // }, [isLoggedIn]);

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
        <StudyBanner props={studyBanners} />
        {/* {userCreated && !hasMatchingInfo && <GoMatchingPage />} */}
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
        {/* {!isLoggedIn && (
          <CommonStudies
            popularStudies={popularStudies}
            newStudies={newStudies}
          />
        )} */}
        {isLoggedIn && hasMatchingInfo ? (
          <UserStudies
            userName={session?.user.name}
            userEmail={session?.user.email}
          />
        ) : (
          <CommonStudies
            popularStudies={popularStudies}
            newStudies={newStudies}
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
