import { ReactNode } from "react";

export type TBox = {
  theme?: TBoxColorTheme;
  shape?: TBoxShape;
  extraCss?: string;
  onClick?: () => void;
};

type TBoxColorTheme =
  | "primary"
  | "secondary"
  | "ordinary"
  | "transparent-border"
  | "transparent"
  | "border-bottom";

type TBoxShape = "tag" | "rounded" | "button" | "imagebox" | "border-dot";

function BoxTheme(theme: TBoxColorTheme | undefined) {
  switch (theme) {
    case "primary":
      return "bg-mainColor ";
    case "secondary":
      return "bg-white border border-mainColor ";
    case "ordinary":
      return "bg-white border border-gray-400 ";
    case "transparent-border":
      return "bg-transparent border border-main-200 ";
    case "transparent":
      return "bg-transparent ";
    case "border-bottom":
      return "bg-transparent border-b border-gray-400 ";
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
    case "button":
      return "rounded-[5px] h-[42px] ";
    case "imagebox":
      return "rounded-[8px] h-[100px] w-[182px] ";
    case "border-dot":
      return "rounded-[5px] p-3 border-dashed ";
    default:
      return " ";
  }
}

function Box({ props, children }: { props: TBox; children?: ReactNode }) {
  const theme = BoxTheme(props.theme) || " ";
  const shape = BoxShape(props.shape) || " ";
  const extraCss = props.extraCss || " ";

  return (
    <div
      onClick={props.onClick}
      className={
        "flex justify-center items-center cursor-pointer " +
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
