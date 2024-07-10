type TButtonLabel = {
  text: string;
  icon: React.ReactNode;
  theme: string;
  type: string;
};

function ButtonLabel({ datas }: { datas: TButtonLabel }) {
  // theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
  // type 에 따라 fontSize, height, width가 달라집니다.

  let btnTheme = "";
  let btnType = "";

  switch (datas.theme) {
    case "PRIMARY":
      btnTheme = "text-white bg-mainColor ";
      break;
  }
}

export default ButtonLabel;
