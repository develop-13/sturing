"use client";

type TType =
  | "main"
  | "tag"
  | "item"
  | "radius-none"
  | "category"
  | "full"
  | "round"
  | "float";

type TTheme =
  | "primary"
  | "secondary"
  | "ordinary"
  | "transparent-border"
  | "transparent"
  | "shadow"
  | "kakao";

type TButton = {
  type: TType;
  theme: TTheme;
  onClick?: () => void;
  children?: React.ReactNode;
};

// theme 에 따라 fontColor, backgroundColor, borderColor이 달라집니다.
// type 에 따라 height, width가 달라집니다.

// Text 컴포넌트만 받는 경우?
// Text 컴포넌트와 Icon을 받는 경우?

export default function Button({ type, theme, onClick, children }: TButton) {
  let btnTheme = "";
  let btnType = "";
  switch (theme) {
    case "primary":
      btnTheme = "text-white bg-mainColor ";
      break;
    case "secondary":
      btnTheme = "text-mainColor bg-white border border-mainColor ";
      break;
    case "ordinary":
      btnTheme = "text-gray-800 bg-white border border-gray-400 ";
      break;

    case "transparent":
      btnTheme = "text-gray-600 bg-transparent ";
      break;

    case "transparent-border":
      btnTheme = "text-gray-900 bg-transparent border border-main-200 ";
      break;

    case "shadow":
      btnTheme = "text-gray-1000 bg-white shadow-md ";
      break;

    case "kakao":
      btnTheme = "text-gray-1000 bg-yellow ";
      break;
  }
  switch (type) {
    case "main": // 스터디 전체보기 버튼, 홈으로가기 버튼, 이전 버튼, 관심분야 수정 버튼 등
      btnType = "w-full h-[50px] ";
      break;

    case "full":
      btnType = "w-full h-full ";
      break;

    case "radius-none":
      btnType = "w-full h-full rounded-none ";
      break;

    case "tag":
      btnType = "w-auto h-[22px] px-[6px] ";
      break;

    case "item": // 나머지 작은 버튼들
      btnType = "w-auto h-[34px] px-[15px] ";
      break;

    case "round":
      btnType = "w-auto h-[50px] px-[12px] rounded-full ";
      break;

    case "float":
      btnType = "w-[171px] h-[42px] px-[12px] ";
      break;
  }

  return (
    <>
      <button
        className={
          `flex gap-[10px] justify-center items-center rounded-[3px] ` +
          btnTheme +
          btnType
        }
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
