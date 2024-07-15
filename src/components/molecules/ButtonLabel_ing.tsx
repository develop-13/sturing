import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

type TButtonLabelProps = {
  type: string;
  icon?: React.ReactNode;
  text?: string;
};

function ButtonLabel_ing({ type, icon, text }: TButtonLabelProps) {
  switch (type) {
    case "matching":
      return (
        <Button theme="ordinary" type="full">
          {icon}
          <Text size="base">{text}</Text>
        </Button>
      );

    case "category":
      return (
        <Button theme="ordinary" type="round">
          {icon}
          <Text size="base">{text}</Text>
        </Button>
      );

    case "reset":
      return (
        <Button theme="ordinary" type="main">
          <Icon type="RESET" />
          <Text size="base" color="gray-600">
            초기화
          </Text>
        </Button>
      );

    case "studyItem":
      return (
        <Button theme="ordinary" type="item">
          {icon}
          <Text size="sm" color="gray-600">
            {text}
          </Text>
        </Button>
      );

    case "write":
      return (
        <Button theme="primary" type="item">
          <Icon type="WRITE" />
          <Text size="xs" color="white">
            작성하기
          </Text>
        </Button>
      );

    case "signup":
      return (
        <Button theme="kakao" type="main">
          <Icon type="KAKAO" />
          <Text size="sm" color="gray-1000">
            카카오로 3초 만에 시작하기
          </Text>
        </Button>
      );

    case "openStudy":
      return (
        <Button theme="shadow" type="float">
          <Icon type="RLOGO" />
          <Text size="sm">내 스터디 개설하기</Text>
        </Button>
      );

    case "matchingLocationItem":
      return (
        <Button theme="ordinary" type="item">
          <Text size="sm">{text}</Text>
          <Icon type="CLOSE" />
        </Button>
      );

    case "recentSearch":
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

export default ButtonLabel_ing;
