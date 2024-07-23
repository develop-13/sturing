import { ReactNode } from "react";

type TText = {
  size?: TTextSize;
  weight?: TTextWeight;
  color?: TTextColor;
  children?: ReactNode;
};

// 받아야할 게 늘어나면 수정할 곳이

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
  | "gray-1000"
  | "white"
  | "main";

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
    case "white":
      return "text-white ";
    case "main":
      return "text-mainColor ";
    default:
      return " ";
  }
}

function Text({ size, weight, color, children }: TText) {
  const textSize = TextSize(size);
  const textWeight = TextWeight(weight);
  const textColor = TextColor(color);

  return <p className={textSize + textWeight + textColor}>{children}</p>;
}

export default Text;

// 위에서

// import { ReactNode } from "react";

// interface Props {
//   props: TText;
//   children?: ReactNode;
// }

// type TText = {
//   size?: TTextSize;
//   weight?: TTextWeight;
//   color?: TTextColor;
// };

// type TTextSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
// type TTextWeight = "bold" | "regular";
// type TTextColor =
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
//   | "white"
//   | "main";

// function TextSize(size: TTextSize | undefined) {
//   switch (size) {
//     case "xs":
//       return "text-xs ";
//     case "sm":
//       return "text-sm ";
//     case "base":
//       return "text-base ";
//     case "lg":
//       return "text-lg ";
//     case "xl":
//       return "text-xl ";
//     case "2xl":
//       return "text-2xl ";
//     default:
//       return " ";
//   }
// }
// function TextWeight(weight: TTextWeight | undefined) {
//   switch (weight) {
//     case "bold":
//       return "font-bold ";
//     case "regular":
//       return "font-normal ";
//     default:
//       return " ";
//   }
// }
// function TextColor(color: TTextColor | undefined) {
//   switch (color) {
//     case "gray-100":
//       return "text-gray-100 ";
//     case "gray-100":
//       return "text-gray-100 ";
//     case "gray-200":
//       return "text-gray-200 ";
//     case "gray-300":
//       return "text-gray-300 ";
//     case "gray-400":
//       return "text-gray-400 ";
//     case "gray-500":
//       return "text-gray-500 ";
//     case "gray-600":
//       return "text-gray-600 ";
//     case "gray-700":
//       return "text-gray-700 ";
//     case "gray-800":
//       return "text-gray-800 ";
//     case "gray-900":
//       return "text-gray-900 ";
//     case "gray-1000":
//       return "text-gray-1000 ";
//     case "white":
//       return "text-white ";
//     case "main":
//       return "text-mainColor ";
//     default:
//       return " ";
//   }
// }
// function Text({ props, children }: Props) {
//   const textSize = TextSize(props.size);
//   const textWeight = TextWeight(props.weight);
//   const textColor = TextColor(props.color);

//   return <p className={textSize + textWeight + textColor}>{children}</p>;
// }
// export default Text;
