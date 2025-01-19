"use client";

import Link from "next/link";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import { useRouter } from "next/navigation";
import React from "react";

// 제네릭 타입을 사용하여 유연한 타입 정의
export type TTabProps = {
  selectedOptionIdx: number;
  buttonGroupData: (string | undefined)[];
  onClick: (selectedIdx: number) => void;
};

// 데이터들 (buttonGroupData) 중에서 현재 선택된 (selectedOptionIdx) idx를 표시하고
// 눌렀을 때 이벤트를 받아라.

export const TabButtonGroup = React.memo((props: TTabProps) => {
  let commonStyle = "flex-grow basis-0 h-full ";
  let selectedStyle = commonStyle + "border-b-2 border-mainColor";

  return (
    <div className="h-[46px] bg-transparent border-b border-gray-300 flex gap-4 justify-between items-center  ">
      {props.buttonGroupData.map((data, idx) => {
        if (data == props.buttonGroupData[props.selectedOptionIdx]) {
          return (
            <Button
              onClick={() => {
                props.onClick(idx);
              }}
              key={data}
              theme="transparent"
              extraCss={selectedStyle}
              // 선택된 값과 data가 같으면 selectedStyle 적용하게 하기
            >
              <Text size="sm" weight="bold" color="main">
                {data}
              </Text>
            </Button>
          );
        } else {
          return (
            <Button
              onClick={() => {
                props.onClick(idx);
              }}
              key={data}
              theme="transparent"
              extraCss={commonStyle}
            >
              <Text size="sm" weight="bold" color="gray-700">
                {data}
              </Text>
            </Button>
          );
        }
      })}
    </div>
  );
});

TabButtonGroup.displayName = "TabButtonGroup";

type TNavButtonGroup = {
  pathname: string;
  isLoggedIn: boolean;
  openLoginLodal?: () => void;
};

export function NavButtonGroup(props: TNavButtonGroup) {
  const { pathname, isLoggedIn, openLoginLodal } = props;

  const router = useRouter();

  let btnStyle = "flex-grow basis-0 h-full border-gray-400 ";

  const onClickBtn = (pathname: string) => () => {
    if (!isLoggedIn) {
      // 로그인이 안되어 있는데 클릭하면 모달이 열리도록 함
      openLoginLodal?.();
    } else {
      router.push(pathname);
    }
  };

  return (
    <div className="h-[46px] bg-transparent border-y border-gray-300 flex gap-4 justify-between items-center  ">
      <Button theme="transparent" extraCss={btnStyle}>
        <Link href={"/recommend"}>
          <Text
            size="base"
            weight="bold"
            color={pathname === "/recommend" ? "gray-1000" : "gray-700"}
          >
            추천
          </Text>
          {/* </Link> */}
        </Link>
      </Button>
      <Button
        theme="transparent"
        extraCss={btnStyle}
        onClick={onClickBtn("/search")}
      >
        {/* <Link href={"/search"}> */}
        <Text
          size="base"
          weight="bold"
          color={pathname === "/search" ? "gray-1000" : "gray-700"}
        >
          검색
        </Text>
        {/* </Link> */}
      </Button>
      <Button
        theme="transparent"
        extraCss={btnStyle}
        onClick={onClickBtn("/mystudy")}
      >
        {/* <Link href={"/mystudy"}> */}
        <Text
          size="base"
          weight="bold"
          color={pathname === "/mystudy" ? "gray-1000" : "gray-700"}
        >
          내 스터디
        </Text>
        {/* </Link> */}
      </Button>
    </div>
  );
}
