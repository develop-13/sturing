"use client";
import Header from "../organisms/Header";
import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import StudyBanner from "../organisms/StudyBanner";
import Divider from "../atoms/Divider";
import { studyBanners } from "@/db/studyBanners";
import React, { useContext, useEffect, useState } from "react";
import { TStudyItem } from "@/types/study";
import StudyBoxSkeleton from "../molecules/skeletonUI/StudyBoxSkeleton";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import Loading from "../templates/common/Loading";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../../providers/ModalProvider";
import Text from "../atoms/Text";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

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
function RecommendPage() {
  const {
    session,
    status,
    userCreated,
    hasMatchingInfo,
  }: UserStatusContextProps = useContext(UserStatusContext);

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { upModal, openModal, closeModal } = modalInfo;
  const isLoggedIn = !!session?.user;
  const router = useRouter();

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
    const controller = new AbortController(); // AbortController 생성
    const signal = controller.signal; // AbortController의 signal 가져오기

    async function getStudies(studyType: "common" | "userMatching") {
      try {
        setIsFetchingStudies(true);
        const fetchedStudies = await fetch(
          `recommend/api?studyType=${studyType}&userEmail=${session?.user.email}`,
          { signal } // fetch에 signal 추가
        ).then((res) => res.json());

        const { firstStudies, secondStudies } = fetchedStudies;
        setStudies({
          firstStudies: firstStudies,
          secondStudies: secondStudies,
        });
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", err);
        }
      } finally {
        setIsFetchingStudies(false);
      }
    }

    if (status === "authenticated" && userCreated && hasMatchingInfo) {
      // 로그인 했고 이미 매칭 정보도 정한 경우 맞춤 스터디를 추천해줌
      getStudies("userMatching");
    } else if (status === "unauthenticated" && !hasMatchingInfo) {
      // 로그인을 하지 않았거나, 로그인 하더라도 매칭 정보가 없는 경우 공통 스터디를 가져옴
      getStudies("common");
    }

    return () => {
      controller.abort(); // 컴포넌트 언마운트 또는 의존성 변경 시 fetch 요청 취소
    };
  }, [userCreated, hasMatchingInfo, status, session?.user.email]);

  if (status == "loading") {
    return <Loading />;
  }

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
        {userCreated && !hasMatchingInfo && <GoMatchingPage />}
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
        <SlideContentList
          title={studyPlaceHolder.firstStudies}
          hasArrow={true}
          className="text-lg"
        >
          <div className="mx-auto flex flex-row gap-2 pl-4 h-[250px] justify-center">
            {isFetchingStudies ? (
              Array(3)
                .fill(null)
                .map((_, index) => <StudyBoxSkeleton key={index} />)
            ) : studies.firstStudies.length ? (
              studies.firstStudies.map((study: TStudyItem) => (
                <StudyBox props={study} key={study.createdAt} />
              ))
            ) : (
              <div className="flex flex-row gap-2 h-[250px] w-full justify-center items-center">
                <Text weight="bold" size="base" color="gray-600">
                  해당되는 스터디가 없습니다.
                </Text>
              </div>
            )}
          </div>
        </SlideContentList>
        <SlideContentList
          title={studyPlaceHolder.secondStudies}
          hasArrow={true}
        >
          <div className="mx-auto flex flex-row gap-2 h-[250px] justify-center">
            {isFetchingStudies ? (
              Array(3)
                .fill(null)
                .map((_, index) => <StudyBoxSkeleton key={index} />)
            ) : studies.secondStudies.length ? (
              studies.secondStudies.map((study: TStudyItem) => (
                <StudyBox props={study} key={study._id} />
              ))
            ) : (
              <div className="flex flex-row gap-2 h-[250px] w-full justify-center items-center">
                <Text weight="bold" size="base" color="gray-600">
                  해당되는 스터디가 없습니다.
                </Text>
              </div>
            )}
          </div>
        </SlideContentList>
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
