type TButton = {
  type: "TAG" | "CATEGORY" | "FAT" | "THIN" | "ITEM/FAT" | "ITEM/THIN" | "TAB";
  text: string;
  theme: "PRIMARY" | "SECONDARY" | "TERTIARY" | "QUANTERNARY";
  onClick?: () => {};
};

// radius 고정
// theme 3 x 상태 4

export default function Button({ datas }: { datas: TButton }) {
  let btnTheme = "";
  let btnType = "";
  switch (datas.theme) {
    case "PRIMARY":
      btnTheme = "text-white bg-mainColor ";
      break;
    case "SECONDARY":
      btnTheme = "text-subColor bg-main-100 border border-main-300 ";
      break;

    case "TERTIARY":
      btnTheme = "text-gray-800 bg-white border border-gray-300 ";
      break;

    case "QUANTERNARY":
      btnTheme = "text-gray-600";
  }
  switch (datas.type) {
    case "TAG":
      btnType = "text-[12px] h-[22px] w-auto ";
      break;
    case "CATEGORY": // 무슨 버튼인지 모르겠습니다!
      btnType = "text-[24px] h-[60px] w-auto ";
      break;

    case "FAT": // 스터디 전체보기 버튼, 홈으로가기 버튼, 이전 버튼 등
      btnType = "text-[16px] h-[50px] w-full ";
      break;

    case "THIN": // 관심분야 수정 버튼
      btnType = "text-[16px] h-[37px] w-full ";
      break;

    case "ITEM/FAT": // 마이페이지 관심목록_함께하고 싶은 팀원의 연령대 버튼
      btnType = "text-[14px] h-[42px] w-full ";
      break;

    case "ITEM/THIN": // 나머지 작은 버튼들
      btnType = "text-[14px] h-[34px] w-auto px-[15px] ";
      break;

    case "TAB":
      return (
        <button
          className="flex font-bold justify-center items-center h-[49px]"
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
