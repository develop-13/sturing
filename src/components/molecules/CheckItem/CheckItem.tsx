import React, { useContext, useState } from "react";
import Icon from "@/components/atoms/Icon";
import Text from "../../atoms/Text";
import { twMerge } from "tailwind-merge";

type TCheckListItem = {
  isChecked?: boolean;
  text: string;
  handleCheck: () => void;
  type: "col" | "row";
  className?: string;
};

const getStyle = (
  type: TCheckListItem["type"],
  className: TCheckListItem["className"],
  isChecked: TCheckListItem["isChecked"]
) => {
  let commonStyle = "flex-1 flex items-center justify-center gap-1";

  let effectiveClassname = "";

  switch (type) {
    case "col":
      effectiveClassname = twMerge(commonStyle, "flex-col", className);
      break;

    case "row":
      effectiveClassname = twMerge(commonStyle, className);
      break;
  }

  if (isChecked) {
    effectiveClassname = twMerge(effectiveClassname, "text-mainColor");
  }

  return effectiveClassname;
};

const getIconType = (isChecked: TCheckListItem["isChecked"]) => {
  const IconType = isChecked ? "CHECKED_ROUND" : "UNCHECKED_ROUND";
  return IconType;
};

function CheckListItem(props: TCheckListItem) {
  const { isChecked, text, handleCheck, type, className } = props;

  const effectiveClassName = getStyle(type, className, isChecked);
  const IconType = getIconType(isChecked);

  return (
    <div className={effectiveClassName}>
      <Icon type={IconType} onClick={handleCheck} />
      <Text size="xs" weight="bold">
        {text}
      </Text>
    </div>
  );
}

export default CheckListItem;
