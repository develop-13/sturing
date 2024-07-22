"use client";

import Link from "next/link";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import { usePathname } from "next/navigation";

type TButtonGroup = {
  gap: number;
  children?: React.ReactNode;
};

function ButtonGroup({ children, gap }: TButtonGroup) {
  return (
    <div
      className="h-[46px] px-[16px] bg-transparent border-b border-t border-gray-300 flex justify-between items-center "
      style={{ gap: gap }}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;

export type TInactiveStudyDataSet = Map<
  Exclude<TInactiveSelectedOption, null>,
  string
>;
export type TInactiveSelectedOption = "info" | "member" | null; // StudyDetailPage 에서도 사용해야함
type InactiveStudyProps = {
  selectedOption: TInactiveSelectedOption;
  dataSet: TInactiveStudyDataSet;
  onClick: (selectedOption: TInactiveSelectedOption) => void;
};

export function TabButtonGroup(props: InactiveStudyProps) {
  let commonStyle = "flex-grow h-full ";
  let selectedStyle = commonStyle + "border-b-2 border-mainColor";

  return (
    <ButtonGroup gap={12}>
      {Array.from(props.dataSet).map(([key, text]) => {
        if (key == props.selectedOption) {
          return (
            <Button
              onClick={() => {
                props.onClick(key);
              }}
              key={key}
              theme="transparent"
              extraCss={selectedStyle}
              // 선택된 값과 data가 같으면 selectedStyle 적용하게 하기
            >
              <Text size="sm" weight="bold" color="main">
                {text}
              </Text>
            </Button>
          );
        } else {
          return (
            <Button
              onClick={() => {
                props.onClick(key);
              }}
              key={key}
              theme="transparent"
              extraCss={commonStyle}
            >
              <Text size="sm" weight="bold" color="gray-700">
                {text}
              </Text>
            </Button>
          );
        }
      })}
    </ButtonGroup>
  );
}

// 디자인이 TabButtonGroup와 비슷하지만 Link를 포함시켜야 해서..
// 하나의 컴포넌트로 Nav와 Tab을 구현하기에는 조건부 처리 때문에 컴포넌트가 더욱 지저분해 질 것 같아서 결국 NavButtonGroup컴포넌트를 하나 더 만들게 되었다.
// 나중에 하나의 컴포넌트로 재사용성이 높게 사용할 수 있는 법을 생각해보자.
// 경로들을 props로 받아오는 것(1)이 나은가 아니면 NavButtonGroup안에 경로들을 정의하고
// 처리하는 것이 나은가(2)?
// 재사용성 면에서는 1이 나은듯. 왜냐하면 페이지별로 NavButtonGroup안에의 내용들이 다르면 각 페이지별로 경로값을 이 컴포넌트로 전해주면 되니까.
// 하지만 이번 프로젝트에서는 NavButtonGroup안에의 내용이 다 똑같아서 그냥 컴포넌트 안에서 정의해주도록 함.

export function NavButtonGroup() {
  let btnStyle = "flex-grow h-full ";
  const pathname = usePathname();

  return (
    <ButtonGroup gap={12}>
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
    </ButtonGroup>
  );
}
