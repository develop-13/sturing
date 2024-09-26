"use client";

import Link from "next/link";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import { usePathname } from "next/navigation";

type TButtonGroup = {
  children?: React.ReactNode;
};

function ButtonGroup({ children }: TButtonGroup) {
  return (
    <div className="h-[46px] bg-transparent border-b border-gray-300 flex gap-4 justify-between items-center  ">
      {children}
    </div>
  );
}

export default ButtonGroup;

// 제네릭 타입을 사용하여 유연한 타입 정의
export type TTabProps = {
  selectedOptionIdx: number;
  buttonGroupData: (string | undefined)[];
  onClick: (selectedIdx: number) => void;
};

export function TabButtonGroup(props: TTabProps) {
  let commonStyle = "flex-grow basis-0 h-full ";
  let selectedStyle = commonStyle + "border-b-2 border-mainColor";

  console.log("TabButtonGroup render!");
  console.log(props.buttonGroupData);

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
                {/* {global[data]} */}
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
}

// 디자인이 TabButtonGroup와 비슷하지만 Link를 포함시켜야 해서..
// 하나의 컴포넌트로 Nav와 Tab을 구현하기에는 조건부 처리 때문에 컴포넌트가 더욱 지저분해 질 것 같아서 결국 NavButtonGroup컴포넌트를 하나 더 만들게 되었다.
// 나중에 하나의 컴포넌트로 재사용성이 높게 사용할 수 있는 법을 생각해보자.
// 경로들을 props로 받아오는 것(1)이 나은가 아니면 NavButtonGroup안에 경로들을 정의하고
// 처리하는 것이 나은가(2)?
// 재사용성 면에서는 1이 나은듯. 왜냐하면 페이지별로 NavButtonGroup안에의 내용들이 다르면 각 페이지별로 경로값을 이 컴포넌트로 전해주면 되니까.
// 하지만 이번 프로젝트에서는 NavButtonGroup안에의 내용이 다 똑같아서 그냥 컴포넌트 안에서 정의해주도록 함.

export function NavButtonGroup({ pathname }: { pathname?: string }) {
  let btnStyle = "flex-grow basis-0 h-full border-gray-400 ";

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
        </Link>
      </Button>
      <Button theme="transparent" extraCss={btnStyle}>
        <Link href={"/search"}>
          <Text
            size="base"
            weight="bold"
            color={pathname === "/search" ? "gray-1000" : "gray-700"}
          >
            검색
          </Text>
        </Link>
      </Button>
      <Button theme="transparent" extraCss={btnStyle}>
        <Link href={"/mystudy"}>
          <Text
            size="base"
            weight="bold"
            color={pathname === "/mystudy" ? "gray-1000" : "gray-700"}
          >
            내 스터디
          </Text>
        </Link>
      </Button>
    </div>
  );
}
