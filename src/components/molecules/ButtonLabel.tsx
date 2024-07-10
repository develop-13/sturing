type TButtonLabel = {
  text: string;
  icon: React.ReactNode;
  theme: "PRIMARY" | "SECONDARY" | "TERTIARY" | "KAKAO";
  type:
    | "MATCHING_INTEREST_ITEM"
    | "MATCHING_ATMOSPHERE_ITEM"
    | "RECOMMEND_CATEGORY"
    | "FILTER_RESET"
    | "STUDY_ATMOSPHERE_ITEM"
    | "STUDY_WRITE"
    | "SIGNUP"
    | "OPEN_STUDY"
    | "LOCATION_ITEM";
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

    case "SECONDARY":
      btnTheme = "text-gray-700 bg-white border border-gray-300 ";
      break;

    case "TERTIARY":
      btnTheme = "text-gray-1000 bg-white shadow-lg ";
      break;

    case "KAKAO":
      btnTheme = "text-gray-1000 bg-yellow ";
      break;
  }

  switch (datas.type) {
    case "MATCHING_INTEREST_ITEM":
      btnType = "w-full h-[90px] text-[16px] gap-[10px] ";
      break;

    case "MATCHING_ATMOSPHERE_ITEM":
      btnType = "w-full h-[70px] text-[16px] gap-[10px] ";
      break;

    case "RECOMMEND_CATEGORY":
      btnType = "w-auto px-[12px] h-[50px] text-[14px] gap-[8px] ";
      break;

    case "FILTER_RESET":
      btnType = "w-full h-[50px] text-[16px] gap-[2px]";
      break;

    case "STUDY_ATMOSPHERE_ITEM":
      btnType = "w-auto px-[8px] h-[33px] text-[16px] gap-[3px]";
      break;

    case "STUDY_WRITE":
      btnType = "w-auto px-[6px] (py-[4px] | h-[26px]) text-[12px] gap-[4px]";
      break;

    case "SIGNUP":
      btnType = "w-full h-[45px] text-[14px] gap-[16px]";
      break;

    case "OPEN_STUDY":
      btnType = "w-auto px-[12px] h-[42px] text-[14px] gap-[10px]";
      break;

    case "LOCATION_ITEM":
      return (
        <span className=" w-auto px-[14px] h-[39px] text-[14px] flex gap-[8px] items-center justify-center rounded-[3px]">
          <span>{datas.text}</span>
          {datas.icon}
        </span>
      );
  }

  return (
    <span
      className={
        `flex font-bold justify-center items-center rounded-[3px] ` +
        btnTheme +
        btnType
      }
    >
      {datas.icon}
      <span>{datas.text}</span>
    </span>
  );
}

export default ButtonLabel;
