import React, { useState } from "react";
import { TDispatchFuncs, TMatchingState } from "@/reducer/MatchingReducer";
import Box from "../atoms/Box";
import Text from "../atoms/Text";

const levels = [
  { id: "beginner", title: "비기너", text: "관련 공부를 이제 막 시작했어요" },
  {
    id: "newComer",
    title: "신입",
    text: "관련 분야에서 일한지 아직 1년이 안됐어요",
  },
  {
    id: "junior",
    title: "주니어",
    text: "1-3년 정도 관련 분야 업무경험이 있어요",
  },
  {
    id: "senior",
    title: "시니어",
    text: "4년 이상의 관련 분야 업무경험이 있어요",
  },
];

type TOptionButtonContainer = {
  interests: string[];
  selectedCategoryIdx: number;
  fieldLevels: TMatchingState["fieldLevels"];
  setLevel: TDispatchFuncs["setLevel"];
};

function renderBtnContent(title: string, text: string) {
  return (
    <div className="flex justify-start gap-[18px]">
      <Text size="sm" weight="bold">
        {title}
      </Text>
      <Text size="xs" weight="bold">
        {text}
      </Text>
    </div>
  );
}

function OptionButtonContainer(props: TOptionButtonContainer) {
  const onClickHandler = (dataId: string) => () => {
    props.setLevel(props.interests[props.selectedCategoryIdx], dataId);
  };
  return (
    <div className="py-[16px] flex flex-col gap-[14px]">
      {levels.map((data) => (
        <Box
          props={{
            theme: "ordinary",
            shape: "bar",
            onClick: onClickHandler(data.id),
            isActive:
              data.id ===
              props.fieldLevels.get(props.interests[props.selectedCategoryIdx]),
          }}
        >
          {renderBtnContent(data.title, data.text)}
        </Box>
      ))}
    </div>
  );
}

export default OptionButtonContainer;
