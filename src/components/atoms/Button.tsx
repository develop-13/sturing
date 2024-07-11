type TButton = {
  type: "TAG" | "CATEGORY" | "FAT" | "THIN" | "ITEM_FAT" | "ITEM_THIN" | "TAB";
  text: string;
  // theme: "PRIMARY" | "SECONDARY" | "TERTIARY" | "QUATERNARY";
  theme:
    | "WHITE_MAIN"
    | "MAIN_WHITE_MAIN"
    | "GRAY_EMPTY_MAIN"
    | "SUB_WHITE_MAIN"
    | "GRAY_WHITE_GRAY"
    | "GRAY_EMPTY"
    | "MAIN_MAIN";
  onClick?: () => {};
};

// theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
// type 에 따라 fontSize, height, width가 달라집니다.

export default function Button({ datas }: { datas: TButton }) {
  let btnTheme = "";
  let btnType = "";
  switch (datas.theme) {
    case "WHITE_MAIN":
      btnTheme = "text-white bg-mainColor ";
      break;
    case "MAIN_WHITE_MAIN":
      // text색 Main, bg색 white, border색 mainColor라서 MAIN_WHITE_MAIN이라고 지었습니다.
      btnTheme = "text-mainColor bg-white border border-mainColor ";
      break;
    case "GRAY_EMPTY_MAIN":
      btnTheme = "text-gray-900 bg-transparent border border-main-200 ";
      break;
    case "SUB_WHITE_MAIN":
      btnTheme = "text-subColor bg-white border border-main-300 ";
      break;

    case "GRAY_WHITE_GRAY":
      btnTheme = "text-gray-800 bg-white border border-gray-400 ";
      break;

    case "MAIN_MAIN":
      btnTheme = "text-mainColor bg-main-100 ";
      break;

    case "GRAY_EMPTY":
      btnTheme = "text-gray-600 ";
      break;
  }
  switch (datas.type) {
    case "TAG":
      btnType = "text-[12px] h-[22px] w-auto px-[6px] ";
      break;
    case "CATEGORY":
      btnType = "text-[24px] h-[60px] w-auto ";
      break;

    case "FAT": // 스터디 전체보기 버튼, 홈으로가기 버튼, 이전 버튼 등
      btnType = "text-[16px] h-[50px] w-full ";
      break;

    case "THIN": // 관심분야 수정 버튼
      btnType = "text-[16px] h-[37px] w-full ";
      break;

    case "ITEM_FAT": // 마이페이지 관심목록_함께하고 싶은 팀원의 연령대 버튼
      btnType = "text-[14px] h-[42px] w-full ";
      break;

    case "ITEM_THIN": // 나머지 작은 버튼들
      btnType = "text-[14px] h-[34px] w-auto px-[15px] ";
      break;

    case "TAB":
      return (
        <button
          className={
            "text-[14px] h-[49px] w-full flex font-bold justify-center items-center " +
            btnTheme
          }
          onClick={datas.onClick}
        >
          {datas.text}
        </button>
      );
  }

  return (
    <>
      <button
        className={
          `flex font-bold justify-center items-center rounded-[3px] ` +
          btnTheme +
          btnType
        }
        onClick={datas.onClick}
      >
        {datas.text}
      </button>
    </>
  );
}
