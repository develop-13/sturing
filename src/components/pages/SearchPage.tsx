"use client";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import Searchbar from "../molecules/Searchbar";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";
import IconLabelButton from "../molecules/IconLabelButton";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../../providers/ModalProvider";
import SlideContentList from "../organisms/SlideContentList";
import StudyBox from "../organisms/StudyBox";
import {
  clearLocalStorageKeys,
  getStudiesFromLocalStorage,
} from "@/utils/localStorageFuncs";
import { TStudyItem } from "@/types/study";
function SearchPage() {
  const router = useRouter();

  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [recentWatchedStudies, setRecentWatchedStudies] = useState<
    TStudyItem[]
  >([]);

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { openModal } = modalInfo;

  // 로컬 스토리지에서 최근 검색어 불러오기
  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
    const storedStudies = getStudiesFromLocalStorage();
    setRecentWatchedStudies(storedStudies);
  }, []);

  // 최근 검색어 삭제 함수
  const deleteSearchItem = (index: number) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches); // 상태 업데이트
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches)); // 로컬 스토리지 업데이트
  };

  const clearStorage = (key: string) => {
    localStorage.setItem(key, JSON.stringify([]));
  };

  const deleteAll = () => {
    clearStorage("recentSearches");
    clearStorage("recentWatchedStudies");
    setRecentSearches([]);
    setRecentWatchedStudies([]);
  };

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user]);

  console.log("SerachPage rendered");

  return (
    <div>
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </div>
        }
      />
      <NavButtonGroup
        pathname="/search"
        isLoggedIn={!!session?.user}
        openLoginLodal={openModal}
      />
      <section className="px-4 py-5 flex flex-col gap-10">
        <Searchbar
          placeholder="관심 스터디 분야나 강의명을 검색해 보세요"
          usage="main"
        />
        <article>
          <div className="flex justify-between ">
            <Text size="base" weight="bold">
              최근검색어
            </Text>
            <Button onClick={deleteAll}>
              <Text size="sm" weight="bold" color="gray-600">
                전체삭제
              </Text>
            </Button>
          </div>
          <div className="flex gap-3 flex-wrap mt-5">
            {recentSearches.length ? (
              recentSearches.map((searchWord, index) => (
                <IconLabelButton
                  key={searchWord}
                  datas={{
                    theme: "ordinary",
                    shape: "listItem",
                    text: searchWord,
                    usage: "close",
                    onClick: () => {
                      deleteSearchItem(index);
                    },
                  }}
                />
              ))
            ) : (
              <div className="flex flex-row gap-2 h-[200px] w-full justify-center items-center">
                <Text weight="bold" size="base" color="gray-600">
                  최근 검색 내역이 없습니다.
                </Text>
              </div>
            )}
          </div>
        </article>
        <article>
          <SlideContentList
            title="최근 본 스터디"
            hasArrow={true}
            className="text-base"
          >
            {recentWatchedStudies.length ? (
              recentWatchedStudies.map((studyItem) => (
                <StudyBox props={studyItem} key={studyItem._id} />
              ))
            ) : (
              <div className="flex flex-row gap-2 h-[200px] w-full justify-center items-center">
                <Text weight="bold" size="base" color="gray-600">
                  최근 검색 내역이 없습니다.
                </Text>
              </div>
            )}
          </SlideContentList>
          <div className="flex gap-4 mt-5"></div>
        </article>
      </section>
    </div>
  );
}

export default SearchPage;
