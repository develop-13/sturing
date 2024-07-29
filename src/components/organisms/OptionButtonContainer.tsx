import React, { useState } from "react";
import ButtonOptionDetail from "./ButtonOptionDetail";
import { TDispatchFuncs, TState } from "../pages/MatchingPage";
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
  fieldLevels: TState["fieldLevels"];
  setLevel: TDispatchFuncs["setLevel"];
};

function OptionButtonContainer(props: TOptionButtonContainer) {
  return (
    <div className="py-[16px] flex flex-col gap-[14px]">
      {levels.map((data) => (
        <ButtonOptionDetail
          key={data.id}
          role="TEXT"
          title={data.title}
          text={data.text}
          onClick={() => {
            props.setLevel(props.interests[props.selectedCategoryIdx], data.id);
          }}
          isActive={
            data.id ===
            props.fieldLevels.get(props.interests[props.selectedCategoryIdx])
          }
        />
      ))}
    </div>
  );
}

export default OptionButtonContainer;
