type TButton = {
  // type: "TAG" | "CATEGORY" | "FAT" | "THIN" | "ITEM_FAT" | "ITEM_THIN" | "TAB";
  type: "main" | "tag" | "item" | "radius-none" | "category";
  text: string;
  theme:
    | "primary"
    | "secondary"
    | "ordinary"
    | "transparent-border"
    | "transparent";
  onClick?: () => {};
};

// theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
// type 에 따라 fontSize, height, width가 달라집니다.

// switch문을 배열로?
// datas -> props
export default function Button({ datas }: { datas: TButton }) {
  let btnTheme = "";
  let btnType = "";
  switch (
    datas.theme // 소문자?
  ) {
    case "primary":
      btnTheme = "text-white bg-mainColor ";
      break;
    case "secondary":
      btnTheme = "text-mainColor bg-white border border-mainColor ";
      break;
    case "ordinary":
      btnTheme = "text-gray-800 bg-white border border-gray-400 ";
      break;
    case "transparent-border":
      btnTheme = "text-gray-900 bg-transparent border border-main-200 ";
      break;
    case "transparent":
      btnTheme = "text-gray-600 bg-transparent";
      break;
  }
  switch (datas.type) {
    case "tag":
      btnType = "text-[12px] h-[22px] w-auto px-[6px] ";
      break;

    case "category":
      btnType = "text-[24px] h-[60px] w-auto ";
      break;

    case "main": // 스터디 전체보기 버튼, 홈으로가기 버튼, 이전 버튼, 관심분야 수정 버튼 등
      btnType = "text-[16px] h-[50px] w-full ";
      break;

    case "item": // 나머지 작은 버튼들
      btnType = "text-[14px] h-[34px] w-auto px-[15px] ";
      break;

    case "radius-none":
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
