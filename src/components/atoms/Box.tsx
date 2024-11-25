import { ReactNode } from "react";

export type TBox = {
  theme?: TBoxColorTheme;
  shape?: TBoxShape;
  extraCss?: string;
  onClick?: () => void;
  isActive?: boolean;
  activeClassname?: string;
};

export type TBoxColorTheme =
  | "primary"
  | "secondary"
  | "ordinary"
  | "transparent-border"
  | "transparent"
  | "gray";
// | "border-bottom";

export type TBoxShape =
  | "tag"
  | "rounded"
  | "listItem"
  | "border-dot"
  | "full"
  | "bar";

function BoxTheme(theme: TBoxColorTheme | undefined) {
  switch (theme) {
    case "primary":
      return "bg-mainColor text-white ";
    case "secondary":
      return "bg-white border border-mainColor text-mainColor ";
    case "ordinary":
      return "bg-white border border-gray-400 ";
    case "gray":
      return "bg-gray-300 ";
    case "transparent-border":
      return "bg-transparent border border-main-200 ";
    case "transparent":
      return "bg-transparent ";
    // case "border-bottom":
    //   return "bg-transparent border-b border-gray-400 ";
    default:
      return " ";
  }
}

function BoxShape(shape: TBoxShape | undefined) {
  switch (shape) {
    case "tag":
      return "rounded-[3px] h-[22px] px-[6px] ";
    case "rounded":
      return "rounded-full h-[50px] ";
    case "listItem":
      return "rounded-[5px] py-[4px] px-[8px] ";
    case "full":
      return "rounded-[3px] w-full h-full text-[16px] gap-[10px] ";
    case "border-dot":
      return "rounded-[5px] p-3 border-dashed ";
    case "bar":
      return "rounded-[5px] w-full py-5 px-6 ";
    default:
      return " ";
  }
}

function Box({ props, children }: { props: TBox; children?: ReactNode }) {
  const theme = BoxTheme(props.theme) || " ";
  const shape = BoxShape(props.shape) || " ";
  let extraCss = props.extraCss || " ";
  let effectiveActiveClassname =
    props.activeClassname || " border-mainColor !bg-main-100 !text-mainColor ";

  if (props.isActive) {
    extraCss += effectiveActiveClassname;
  }

  return (
    <div
      onClick={props.onClick}
      className={
        "flex justify-center items-center cursor-pointer gap-[5px] " +
        theme +
        shape +
        extraCss
      }
    >
      {children}
    </div>
  );
}

export default Box;
