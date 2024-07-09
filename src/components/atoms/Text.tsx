type TText = {
  text: string;
  size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  weight: "bold" | "regular";
  color?:
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
};

function Text({ datas }: { datas: TText }) {
  let textSize = "";
  let textWeight = "";
  let textColor = "";

  switch (datas.size) {
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

  switch (datas.weight) {
    case "bold":
      textWeight = "font-bold ";
      break;
    case "regular":
      textWeight = "font-normal ";
  }

  switch (datas.color) {
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
  }

  return <text className={textSize + textWeight}>{datas.text}</text>;
}

export default Text;
