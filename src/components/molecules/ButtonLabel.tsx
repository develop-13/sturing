// import Button from "./Button";
// import Icon from "../atoms/Icon";
// import Text from "../atoms/Text";

// type TType =
//   | "matching"
//   | "category"
//   | "reset"
//   | "studyItem"
//   | "write"
//   | "signup"
//   | "openStudy"
//   | "matchingLocationItem"
//   | "recentSearch";

// type TButtonLabelProps = {
//   type: TType;
//   icon?: React.ReactNode;
//   text?: string;
//   onClick?: () => void;
// };

// function ButtonLabel({ type, icon, text }: TButtonLabelProps) {
//   switch (type) {
//     case "matching": // 매칭페이지 버튼
//       return (
//         <Button theme="ordinary" type="full">
//           {icon}
//           <Text size="base">{text}</Text>
//         </Button>
//       );

//     case "category": // 추천 페이지 카테고리 버튼
//       return (
//         <Button theme="ordinary" type="round">
//           {icon}
//           <Text size="base">{text}</Text>
//         </Button>
//       );

//     case "reset": // 초기화 버튼
//       return (
//         <Button theme="ordinary" type="main">
//           <Icon type="RESET" />
//           <Text size="base" color="gray-600">
//             초기화
//           </Text>
//         </Button>
//       );

//     case "studyItem": // 스터디 상세페이지 분위기 버튼
//       return (
//         <Button theme="ordinary" type="item">
//           {icon}
//           <Text size="sm" color="gray-600">
//             {text}
//           </Text>
//         </Button>
//       );

//     case "write": // 작성하기 버튼
//       return (
//         <Button theme="primary" type="item">
//           <Icon type="WRITE" />
//           <Text size="xs" color="white">
//             작성하기
//           </Text>
//         </Button>
//       );

//     case "signup": // 카카오 버튼
//       return (
//         <Button theme="kakao" type="main">
//           <Icon type="KAKAO" />
//           <Text size="sm" color="gray-1000">
//             카카오로 3초 만에 시작하기
//           </Text>
//         </Button>
//       );

//     case "openStudy": // 스터디 개설하기 버튼
//       return (
//         <Button theme="shadow" type="float">
//           <Icon type="RLOGO" />
//           <Text size="sm">내 스터디 개설하기</Text>
//         </Button>
//       );

//     case "matchingLocationItem": // 매칭페이지 위치버튼
//       return (
//         <Button theme="ordinary" type="item">
//           <Text size="sm">{text}</Text>
//           <Icon type="CLOSE" />
//         </Button>
//       );

//     case "recentSearch": // 검색페이지 최근검색어 버튼
//       return (
//         <Button theme="ordinary" type="item">
//           <Text size="sm" color="gray-800">
//             {text}
//           </Text>
//           <Icon type="CLOSE" />
//         </Button>
//       );
//   }
// }

// export default ButtonLabel;
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

  console.log(datas);

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
        "w-auto px-[12px] h-[50px] text-[14px] gap-[8px] rounded-[9999px] ";
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
            `w-auto px-[14px] h-[39px] text-[14px] font-bold flex gap-[8px] items-center justify-center rounded-[3px] `
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
        `flex font-bold justify-center items-center rounded-[3px] shrink-0 ` +
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
