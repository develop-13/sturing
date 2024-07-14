type TButtonLabel = {
  text: string;
  icon: React.ReactNode;
  theme: "primary" | "secondary" | "ordinary" | "shadow" | "kakao";
  role:
    | "interestItem"
    | "atmosphereItem"
    | "category"
    | "studyItem"
    | "reset"
    | "write"
    | "signup"
    | "openStudy"
    | "close";
};

function ButtonLabel({ datas }: { datas: TButtonLabel }) {
  // theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
  // role 에 따라 fontSize, height, width가 달라집니다.

  let btnTheme = "";
  let btnType = "";

  switch (datas.theme) {
    case "primary":
      btnTheme = "text-white bg-mainColor ";
      break;

    case "secondary":
      btnTheme = "text-mainColor bg-white border border-mainColor ";
      break;

    case "ordinary":
      btnTheme = "text-gray-700 bg-white border border-gray-300 ";
      break;

    case "shadow":
      btnTheme = "text-gray-1000 bg-white shadow-md ";
      break;

    case "kakao":
      btnTheme = "text-gray-1000 bg-yellow ";
      break;
  }

  switch (datas.role) {
    case "interestItem":
      btnType = "w-full h-[90px] text-[16px] gap-[10px] ";
      break;

    case "atmosphereItem":
      btnType = "w-full h-[70px] text-[16px] gap-[10px] ";
      break;

    case "category":
      btnType =
        "w-auto px-[12px] h-[50px] text-[14px] gap-[8px] rounded-[100px] ";
      break;

    case "reset":
      btnType = "w-full h-[50px] text-[16px] gap-[2px] ";
      break;

    case "studyItem":
      btnType = "w-auto px-[8px] h-[33px] text-[16px] gap-[3px] ";
      break;

    case "write":
      btnType = "w-auto px-[6px] (py-[4px] | h-[26px]) text-[12px] gap-[4px] ";
      break;

    case "signup":
      btnType = "w-full h-[45px] text-[14px] gap-[16px] ";
      break;

    case "openStudy":
      btnType = "w-auto px-[12px] h-[42px] text-[14px] gap-[10px] ";
      break;

    case "close":
      return (
        <button
          className={
            btnTheme +
            `w-auto px-[14px] h-[39px] text-[14px] font-bold flex gap-[8px] items-center justify-center rounded-[3px]`
          }
        >
          <span>{datas.text}</span>
          {datas.icon}
        </button>
      );
  }

  return (
    <button
      className={
        `flex font-bold justify-center items-center rounded-[3px] ` +
        btnTheme +
        btnType
      }
    >
      {datas.icon}
      <span>{datas.text}</span>
    </button>
  );
}

export default ButtonLabel;
