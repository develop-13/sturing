"use client";

import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

type TTitleLink = {
  title: string;
  hasArrow?: boolean;
  arrowColor?: "gray-800" | "gray-300";
  onClick?: () => void;
};

export default function TitleLink(props: TTitleLink) {
  return (
    <>
      <div className="flex items-center justify-between font-bold">
        <Text weight="bold">{props.title}</Text>
        {props.hasArrow && <Icon type="FORWARD" onClick={props.onClick} />}
      </div>
    </>
  );
}
