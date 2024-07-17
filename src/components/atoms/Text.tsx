// import { ReactNode } from "react";

// type TSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
// type TWeight = "bold" | "regular";
// type TColor =
//   | "gray-100"
//   | "gray-200"
//   | "gray-300"
//   | "gray-400"
//   | "gray-500"
//   | "gray-600"
//   | "gray-700"
//   | "gray-800"
//   | "gray-900"
//   | "gray-1000"
//   | "white";

// type TText = {
//   size: TSize;
//   weight?: TWeight;
//   color?: TColor;
//   children: ReactNode;
// };

// function Text({ size, weight = "bold", color = "gray-1000", children }: TText) {
//   let textSize = "";
//   let textWeight = "";
//   let textColor = "";
//   switch (size) {
//     case "xs":
//       textSize = "text-xs ";
//       break;
//     case "sm":
//       textSize = "text-sm ";
//       break;
//     case "base":
//       textSize = "text-base ";
//       break;
//     case "lg":
//       textSize = "text-lg ";
//       break;
//     case "xl":
//       textSize = "text-xl ";
//       break;
//     case "2xl":
//       textSize = "text-2xl ";
//       break;
//   }
//   switch (weight) {
//     case "bold":
//       textWeight = "font-bold ";
//       break;
//     case "regular":
//       textWeight = "font-normal ";
//   }
//   switch (color) {
//     case "gray-100":
//       textColor = "text-gray-100 ";
//       break;
//     case "gray-100":
//       textColor = "text-gray-100 ";
//       break;
//     case "gray-200":
//       textColor = "text-gray-200 ";
//       break;
//     case "gray-300":
//       textColor = "text-gray-300 ";
//       break;
//     case "gray-400":
//       textColor = "text-gray-400 ";
//       break;
//     case "gray-500":
//       textColor = "text-gray-500 ";
//       break;
//     case "gray-600":
//       textColor = "text-gray-600 ";
//       break;
//     case "gray-700":
//       textColor = "text-gray-700 ";
//       break;
//     case "gray-800":
//       textColor = "text-gray-800 ";
//       break;
//     case "gray-900":
//       textColor = "text-gray-900 ";
//       break;
//     case "gray-1000":
//       textColor = "text-gray-1000 ";
//       break;
//     case "white":
//       textColor = "text-[#FFFFFF] ";
//   }
//   return <p className={textSize + textWeight}>{children}</p>;
// }
// export default Text;
import { ReactNode } from "react";

interface Props {
  props: TText;
  children?: ReactNode;
}

type TText = {
  size?: TTextSize;
  weight?: TTextWeight;
  color?: TTextColor;
};

type TTextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
type TTextWeight = "bold" | "regular";
type TTextColor =
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-800"
  | "gray-900"
  | "gray-1000";

function TextSize(size: TTextSize | undefined) {
  switch (size) {
    case "xs":
      return "text-xs ";
    case "sm":
      return "text-sm ";
    case "base":
      return "text-base ";
    case "lg":
      return "text-lg ";
    case "xl":
      return "text-xl ";
    case "2xl":
      return "text-2xl ";
    default:
      return " ";
  }
}
function TextWeight(weight: TTextWeight | undefined) {
  switch (weight) {
    case "bold":
      return "font-bold ";
    case "regular":
      return "font-normal ";
    default:
      return " ";
  }
}
function TextColor(color: TTextColor | undefined) {
  switch (color) {
    case "gray-100":
      return "text-gray-100 ";
    case "gray-100":
      return "text-gray-100 ";
    case "gray-200":
      return "text-gray-200 ";
    case "gray-300":
      return "text-gray-300 ";
    case "gray-400":
      return "text-gray-400 ";
    case "gray-500":
      return "text-gray-500 ";
    case "gray-600":
      return "text-gray-600 ";
    case "gray-700":
      return "text-gray-700 ";
    case "gray-800":
      return "text-gray-800 ";
    case "gray-900":
      return "text-gray-900 ";
    case "gray-1000":
      return "text-gray-1000 ";
    default:
      return " ";
  }
}
function Text({ props, children }: Props) {
  const textSize = TextSize(props.size);
  const textWeight = TextWeight(props.weight);
  const textColor = TextColor(props.color);

  return <text className={textSize + textWeight + textColor}>{children}</text>;
}
export default Text;
