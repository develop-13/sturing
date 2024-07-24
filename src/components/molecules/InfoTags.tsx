import React from "react";
import Divider from "../atoms/Divider";

type TTheme = "gray" | "transparent" | "white";

interface GetTagsProps {
  slot2: (
    tagsStyle: string,
    leftSlot: React.ReactNode,
    middleSlot: React.ReactNode
  ) => JSX.Element;
  slot3: (
    tagsStyle: string,
    leftSlot: React.ReactNode,
    middleSlot: React.ReactNode,
    rightSlot: React.ReactNode
  ) => JSX.Element;
}

const getTags: GetTagsProps = {
  slot2: (tagsStyle, leftSlot, middleSlot) => (
    <div className={tagsStyle}>
      {leftSlot}
      <Divider type="col" mx={8} />
      {middleSlot}
    </div>
  ),
  slot3: (tagsStyle, leftSlot, middleSlot, rightSlot) => (
    <div className={tagsStyle}>
      {leftSlot}
      <Divider type="col" />
      {middleSlot}
      <Divider type="col" />
      {rightSlot}
    </div>
  ),
};

const getTheme = (theme: TTheme, padding: number = 8): string => {
  const baseStyle = `p-${padding} flex `;
  switch (theme) {
    case "gray":
      return baseStyle + "bg-gray-100";
    case "white":
      return baseStyle + "bg-white";
    case "transparent":
      return baseStyle + "bg-transparent";
    default:
      return baseStyle;
  }
};

interface InfoTagsProps {
  theme: TTheme;
  padding?: number;
  children: React.ReactNode;
}

const InfoTags: React.FC<InfoTagsProps> = ({
  theme,
  padding = 8,
  children,
}) => {
  const tagsStyle = getTheme(theme, padding);
  const childrenArray = React.Children.toArray(children);
  const [leftSlot, middleSlot, rightSlot] = childrenArray;

  if (childrenArray.length > 3) {
    console.error("InfoTags only supports up to 3 children.");
    return null;
  }

  if (!rightSlot) return getTags.slot2(tagsStyle, leftSlot, middleSlot);
  else return getTags.slot3(tagsStyle, leftSlot, middleSlot, rightSlot);
};

export default InfoTags;
