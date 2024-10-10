import React from "react";
import Divider from "../atoms/Divider";
import { v4 } from "uuid";

type TTheme = "gray" | "transparent" | "white";

// interface GetTagsProps {
//   slot2: (
//     tagsStyle: string,
//     leftSlot: React.ReactNode,
//     middleSlot: React.ReactNode
//   ) => JSX.Element;
//   slot3: (
//     tagsStyle: string,
//     leftSlot: React.ReactNode,
//     middleSlot: React.ReactNode,
//     rightSlot: React.ReactNode
//   ) => JSX.Element;
// }

// const getTags: GetTagsProps = {
//   slot2: (tagsStyle, leftSlot, middleSlot) => (
//     <div className={tagsStyle}>
//       {leftSlot}
//       <Divider type="col" />
//       {middleSlot}
//     </div>
//   ),
//   slot3: (tagsStyle, leftSlot, middleSlot, rightSlot) => (
//     <div className={tagsStyle}>
//       {leftSlot}
//       <Divider type="col" />
//       {middleSlot}
//       <Divider type="col" />
//       {rightSlot}
//     </div>
//   ),
// };

const getTheme = (theme: TTheme, padding: number = 1): string => {
  // const baseStyle = `py-${padding} flex flex-1 justify-center `;
  const baseStyle = `py-${padding} flex `;
  switch (theme) {
    case "gray":
      return baseStyle + "bg-gray-100 ";
    case "white":
      return baseStyle + "bg-white ";
    case "transparent":
      return baseStyle + "bg-transparent ";
    default:
      return baseStyle;
  }
};

interface InfoTagsProps {
  theme: TTheme;
  padding?: number;
  children: React.ReactNode;
  className?: string;
}

const InfoTags: React.FC<InfoTagsProps> = ({
  theme,
  padding = 1,
  children,
  className,
}) => {
  const tagsStyle = getTheme(theme, padding);
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={tagsStyle + className}>
      {childrenArray.map((children, idx) => (
        <div className="flex" key={v4()}>
          {children}
          {idx < childrenArray.length - 1 ? <Divider type="col" /> : null}
        </div>
      ))}
    </div>
  );
};

export default InfoTags;
