type TText = {
  text: string;
  size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  weight: "bold" | "regular";
};

function Text({ datas }: { datas: TText }) {
  let textSize = "";
  let textWeight = "";

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

  return <text className={textSize + textWeight}>{datas.text}</text>;
}

export default Text;
