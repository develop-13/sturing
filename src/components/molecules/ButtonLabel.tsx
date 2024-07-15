import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

type TType =
  | "matching"
  | "category"
  | "reset"
  | "studyItem"
  | "write"
  | "signup"
  | "openStudy"
  | "matchingLocationItem"
  | "recentSearch";

type TButtonLabelProps = {
  type: TType;
  icon?: React.ReactNode;
  text?: string;
};

function ButtonLabel({ type, icon, text }: TButtonLabelProps) {
  switch (type) {
    case "matching": // 매칭페이지 버튼
      return (
        <Button theme="ordinary" type="full">
          {icon}
          <Text size="base">{text}</Text>
        </Button>
      );

    case "category": // 추천 페이지 카테고리 버튼
      return (
        <Button theme="ordinary" type="round">
          {icon}
          <Text size="base">{text}</Text>
        </Button>
      );

    case "reset": // 초기화 버튼
      return (
        <Button theme="ordinary" type="main">
          <Icon type="RESET" />
          <Text size="base" color="gray-600">
            초기화
          </Text>
        </Button>
      );

    case "studyItem": // 스터디 상세페이지 분위기 버튼
      return (
        <Button theme="ordinary" type="item">
          {icon}
          <Text size="sm" color="gray-600">
            {text}
          </Text>
        </Button>
      );

    case "write": // 작성하기 버튼
      return (
        <Button theme="primary" type="item">
          <Icon type="WRITE" />
          <Text size="xs" color="white">
            작성하기
          </Text>
        </Button>
      );

    case "signup": // 카카오 버튼
      return (
        <Button theme="kakao" type="main">
          <Icon type="KAKAO" />
          <Text size="sm" color="gray-1000">
            카카오로 3초 만에 시작하기
          </Text>
        </Button>
      );

    case "openStudy": // 스터디 개설하기 버튼
      return (
        <Button theme="shadow" type="float">
          <Icon type="RLOGO" />
          <Text size="sm">내 스터디 개설하기</Text>
        </Button>
      );

    case "matchingLocationItem": // 매칭페이지 위치버튼
      return (
        <Button theme="ordinary" type="item">
          <Text size="sm">{text}</Text>
          <Icon type="CLOSE" />
        </Button>
      );

    case "recentSearch": // 검색페이지 최근검색어 버튼
      return (
        <Button theme="ordinary" type="item">
          <Text size="sm" color="gray-800">
            {text}
          </Text>
          <Icon type="CLOSE" />
        </Button>
      );
  }
}

export default ButtonLabel;
