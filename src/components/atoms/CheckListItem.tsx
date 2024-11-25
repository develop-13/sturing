import React, { useContext, useState } from "react";
import Icon from "@/components/atoms/Icon";
import Text from "./Text";

type TCheckListItem = {
  isChecked?: boolean;
  text: string;
  handleCheck: () => void;
};

function CheckListItem(props: TCheckListItem) {
  const { isChecked, text, handleCheck } = props;

  switch (isChecked) {
    case true:
      return (
        <div className="flex-1 flex justify-center">
          <div className="w-[25px] flex flex-col items-center justify-center gap-1 text-mainColor">
            <Icon type="CHECKED_ROUND" onClick={handleCheck} />
            <Text size="xs" weight="bold">
              {text}
            </Text>
          </div>
        </div>
      );

    case false:
      return (
        <div className="flex-1 flex justify-center">
          <div className="w-[25px] flex flex-col items-center justify-center gap-1 ">
            <Icon type="UNCHECKED_ROUND" onClick={handleCheck} />
            <Text size="xs" weight="bold">
              {text}
            </Text>
          </div>
        </div>
      );
  }
}

export default CheckListItem;
