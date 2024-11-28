import React from "react";
import CheckItem from "./CheckItem";
import Icon from "@/components/atoms/Icon";

type TCheckListItem = {
  isChecked?: boolean;
  text: string;
  handleCheck: () => void;
  type: "col" | "row";
  className?: string;
};

function CheckListItem(props: TCheckListItem) {
  return (
    <li className="flex justify-between items-center hover:bg-gray-100 p-2 rounded group">
      <CheckItem {...props} />
      <Icon
        type="REMOVE"
        className="text-gray-500 opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200"
      />
    </li>
  );
}

export default CheckListItem;
