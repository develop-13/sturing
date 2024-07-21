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

export type TStudyDetailTab = "info" | "member" | null;

const getStyle = {
  btnStyle: (state: TStudyDetailTab, id: TStudyDetailTab) => {
    let commonStyle = "flex-grow h-full ";
    let selectedStyle = commonStyle + "border-b-2 border-mainColor";
    if (state === id) return selectedStyle;
    return commonStyle;
  },
  textColor: (state: TStudyDetailTab, id: TStudyDetailTab) => {
    return state === id ? "main" : "gray-700";
  },
};

export function StudyDetailButtonGroup({
  selectedTab,
  studyInfoBoxTop,
  memberInfoBoxTop,
  onClickBtn,
}: {
  selectedTab: TStudyDetailTab;
  studyInfoBoxTop: number;
  memberInfoBoxTop: number;
  onClickBtn: (infoBoxTop: number, tab: TStudyDetailTab) => () => void;
}) {
  return (
    <ButtonGroup gap={12}>
      <Button
        theme="transparent"
        extraCss={getStyle.btnStyle(selectedTab, "info")}
        onClick={onClickBtn(studyInfoBoxTop, "info")}
      >
        <Text
          size="sm"
          weight="bold"
          color={getStyle.textColor(selectedTab, "info")}
        >
          정보
        </Text>
      </Button>
      <Button
        theme="transparent"
        extraCss={getStyle.btnStyle(selectedTab, "member")}
        onClick={onClickBtn(memberInfoBoxTop, "member")}
      >
        <Text
          size="sm"
          weight="bold"
          color={getStyle.textColor(selectedTab, "member")}
        >
          팀원
        </Text>{" "}
      </Button>
    </ButtonGroup>
  );
}
