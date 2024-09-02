import React, { useState } from "react";
import Box from "../atoms/Box";
import Text from "../atoms/Text";
import { levelData } from "@/db/levels";
import { TLevel } from "@/types/common";

type TOptionButtonContainer = {
  categoryLevel: string | null;
  onClick: (dataId: TLevel) => () => void;
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
  return (
    <div className="py-[16px] flex flex-col gap-[14px]">
      {levelData.map((data) => (
        <Box
          key={data.level}
          props={{
            theme: "ordinary",
            shape: "bar",
            extraCss: "!justify-start ",
            onClick: props.onClick(data.level),
            isActive: data.level === props.categoryLevel,
          }}
        >
          {renderBtnContent(data.level, data.text)}
        </Box>
      ))}
    </div>
  );
}

export default OptionButtonContainer;
