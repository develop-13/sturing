"use client";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";

type TTEXT = {
  role: "TEXT";
  text: string;
  onClick?: () => void;
  title: string;
};

type TCheck = {
  role: "CHECK";
  text: string;
  onClick?: () => void;
  checkType: "defaultCheck" | "onClickCheck";
};

type TButtonOptionDetail = TTEXT | TCheck;

// 옵션으로 사용되는 버튼
function ButtonOptionDetail(props: TButtonOptionDetail) {
  switch (props.role) {
    case "TEXT":
      return (
        <Button
          theme="ordinary"
          shape="button"
          extraCss="h-[64px] px-[24px] gap-[18px] !justify-start"
        >
          <Text size="sm" weight="bold">
            {props.title}
          </Text>
          <Text size="xs" weight="bold">
            {props.text}
          </Text>
        </Button>
      );
    case "CHECK":
      return <CheckButtonOption type={props.checkType} text={props.text} />;
  }
}
export default ButtonOptionDetail;

function CheckButtonOption({ text, type }: { text: string; type: string }) {
  switch (type) {
    case "defaultCheck":
      return (
        <Button
          theme="ordinary"
          shape="button"
          extraCss="h-[64px] px-[24px] justify-between "
        >
          <Text size="base" weight="bold" color="gray-700">
            {text}
          </Text>
          <Icon type="CHECKED" />
        </Button>
      );
    case "onClickCheck":
      return (
        <Button theme="border-bottom" extraCss="h-[49px] justify-between ">
          <Text size="sm" weight="bold" color="gray-700">
            {text}
          </Text>
          {/* <Icon type="CHECKED" /> */}
        </Button>
      );
  }
}
