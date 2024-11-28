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
} from "../organisms/auth-components/UserStatusProvider";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../organisms/ModalProvider";

function SearchPage() {
  const router = useRouter();

  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { openModal } = modalInfo;

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
        rightSlot={
          <div className="flex gap-[12px]">
            <Icon type="BELL" />
            <Icon type="USER" />
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
            <Text size="sm" weight="bold" color="gray-600">
              전체삭제
            </Text>
          </div>
          <div className="flex gap-3 flex-wrap mt-5">
            <IconLabelButton
              datas={{
                theme: "ordinary",
                shape: "listItem",
                text: "포트폴리오",
                usage: "close",
              }}
            />
            <IconLabelButton
              datas={{
                theme: "ordinary",
                shape: "listItem",
                text: "디자이너",
                usage: "close",
              }}
            />
            <IconLabelButton
              datas={{
                theme: "ordinary",
                shape: "listItem",
                text: "UIUX",
                usage: "close",
              }}
            />
            <IconLabelButton
              datas={{
                theme: "ordinary",
                shape: "listItem",
                text: "블랜더 3DX",
                usage: "close",
              }}
            />
          </div>
        </article>
        <article>
          <Text size="base" weight="bold">
            추천검색어
          </Text>
          <div className="flex gap-3 flex-wrap mt-5">
            <Button
              theme="transparent-border"
              shape="listItem"
              extraCss="px-[10px] border-2"
            >
              <Text size="sm" weight="bold" color="main">
                스프링
              </Text>
            </Button>
            <Button
              theme="transparent-border"
              shape="listItem"
              extraCss="px-[10px] border-2"
            >
              <Text size="sm" weight="bold" color="main">
                AI
              </Text>
            </Button>
            <Button
              theme="transparent-border"
              shape="listItem"
              extraCss="px-[10px] border-2"
            >
              <Text size="sm" weight="bold" color="main">
                UIUX
              </Text>
            </Button>
            <Button
              theme="transparent-border"
              shape="listItem"
              extraCss="px-[10px] border-2"
            >
              <Text size="sm" weight="bold" color="main">
                CHAT GPT
              </Text>
            </Button>
            <Button
              theme="transparent-border"
              shape="listItem"
              extraCss="px-[10px] border-2"
            >
              <Text size="sm" weight="bold" color="main">
                JAVA
              </Text>
            </Button>
          </div>
        </article>
        <article>
          <Text size="base" weight="bold">
            최근 본 스터디
          </Text>
          <div className="flex gap-4 mt-5">
            {/* <StudyBox props={studyDatas[2]} />
            <StudyBox props={studyDatas[3]} /> */}
          </div>
        </article>
      </section>
    </div>
  );
}

export default SearchPage;
