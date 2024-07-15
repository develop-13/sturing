import { ReactNode } from "react";

type TSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
type TWeight = "bold" | "regular";
type TColor =
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-800"
  | "gray-900"
  | "gray-1000"
  | "white";

type TText = {
  size: TSize;
  weight?: TWeight;
  color?: TColor;
  children: ReactNode;
};

function Text({ size, weight = "bold", color = "gray-1000", children }: TText) {
  let textSize = "";
  let textWeight = "";
  let textColor = "";
  switch (size) {
    case "xs":
      textSize = "text-xs ";
      break;
    case "sm":
      textSize = "text-sm ";
      break;
    case "base":
      textSize = "text-base ";
      break;
    case "lg":
      textSize = "text-lg ";
      break;
    case "xl":
      textSize = "text-xl ";
      break;
    case "2xl":
      textSize = "text-2xl ";
      break;
  }
  switch (weight) {
    case "bold":
      textWeight = "font-bold ";
      break;
    case "regular":
      textWeight = "font-normal ";
  }
  switch (color) {
    case "gray-100":
      textColor = "text-gray-100 ";
      break;
    case "gray-100":
      textColor = "text-gray-100 ";
      break;
    case "gray-200":
      textColor = "text-gray-200 ";
      break;
    case "gray-300":
      textColor = "text-gray-300 ";
      break;
    case "gray-400":
      textColor = "text-gray-400 ";
      break;
    case "gray-500":
      textColor = "text-gray-500 ";
      break;
    case "gray-600":
      textColor = "text-gray-600 ";
      break;
    case "gray-700":
      textColor = "text-gray-700 ";
      break;
    case "gray-800":
      textColor = "text-gray-800 ";
      break;
    case "gray-900":
      textColor = "text-gray-900 ";
      break;
    case "gray-1000":
      textColor = "text-gray-1000 ";
      break;
    case "white":
      textColor = "text-[#FFFFFF] ";
  }
  return <p className={textSize + textWeight}>{children}</p>;
}
export default Text;
