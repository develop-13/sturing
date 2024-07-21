"use client";

import Text from "../atoms/Text";
import Button from "../molecules/Button";

// 배열로 받는다?
type TButtonGroup = {
  gap: number;
  children?: React.ReactNode;
};

function ButtonGroup({ children, gap }: TButtonGroup) {
  return (
    <div
      className="h-[46px] px-[16px] bg-transparent border-b border-gray-300 flex justify-between items-center "
      style={{ gap: gap }}
    >
      {children}
    </div>
  );
}

export default ButtonGroup;

export type TDataSet = Map<Exclude<TInactiveSelectedOption, null>, string>;
export type TInactiveSelectedOption = "info" | "member" | null; // StudyDetailPage 에서도 사용해야함
type InactiveStudyProps = {
  theme: "primary";
  selectedOption: TInactiveSelectedOption;
  dataSet: TDataSet;
  onClick: (selectedOption: TInactiveSelectedOption) => void;
};

export function TabButtonGroup(props: InactiveStudyProps) {
  let commonStyle = "flex-grow h-full ";
  let selectedStyle = "";

  switch (props.theme) {
    case "primary":
      selectedStyle = commonStyle + "border-b-2 border-mainColor";
      break;
  }

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
