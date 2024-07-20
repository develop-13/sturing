import React from "react";
import Divider from "../atoms/Divider";

type TTheme = "gray" | "transparent" | "white";

const getTags = {
  slot2: (
    tagsStyle: string,
    leftSlot: React.ReactNode,
    middleSlot: React.ReactNode
  ) => {
    return (
      <div className={tagsStyle}>
        {leftSlot}
        <Divider type="col" />
        {middleSlot}
      </div>
    );
  },
  slot3: (
    tagsStyle: string,
    leftSlot: React.ReactNode,
    middleSlot: React.ReactNode,
    rightSlot: React.ReactNode
  ) => {
    return (
      <div className={tagsStyle}>
        {leftSlot}
        <Divider type="col" />
        {middleSlot}
        <Divider type="col" />
        {rightSlot}
      </div>
    );
  },
};

const getTheme = (theme: TTheme, padding?: number) => {
  let tagsStyle = `p-[${padding}px] flex `;
  switch (theme) {
    case "gray":
      tagsStyle += "bg-gray-100 ";
      break;

    case "white":
      tagsStyle += "bg-white ";
      break;

    case "transparent":
      tagsStyle += "bg-transparent ";
      break;
  }
  return tagsStyle;
};

function InfoTags({
  theme,
  padding = 8,
  children,
}: {
  theme: TTheme;
  padding?: number;
  children: React.ReactNode;
}) {
  const tagsStyle = getTheme(theme, padding);
  const [leftSlot, middleSlot, rightSlot] = React.Children.toArray(children);
  if (!rightSlot) return getTags.slot2(tagsStyle, leftSlot, middleSlot);
  else return getTags.slot3(tagsStyle, leftSlot, middleSlot, rightSlot);
}
export default InfoTags;
