"use client";
import React from "react";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";

type TTEXT = {
  role: "TEXT";
  text: string;
  onClick?: () => void;
  title: string;
  isActive: boolean;
};

type TCheck = {
  role: "CHECK";
  text: string;
  onClick?: () => void;
  checkType: "defaultCheck" | "onClickCheck";
  isActive: boolean;
};

type TButtonOptionDetail = TTEXT | TCheck;

let activeCss = "border-mainColor !bg-main-100 !text-mainColor ";

// 옵션으로 사용되는 버튼
function ButtonOptionDetail(props: TButtonOptionDetail) {
  console.log(props.isActive);

  let activeClassName = props.isActive ? activeCss : "";

  switch (props.role) {
    case "TEXT":
      return (
        <Button
          onClick={props.onClick}
          theme="ordinary"
          shape="button"
          extraCss={
            "h-[64px] px-[24px] gap-[18px] !justify-start " + activeClassName
          }
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
      return (
        <CheckButtonOption
          type={props.checkType}
          text={props.text}
          isActive={props.isActive}
          onClick={props.onClick}
        />
      );
  }
}
export default React.memo(ButtonOptionDetail);

function CheckButtonOption({
  text,
  type,
  isActive,
  onClick,
}: {
  text: string;
  type: string;
  isActive: boolean;
  onClick?: () => void;
}) {
  let activeClassName = isActive ? activeCss : "";

  switch (type) {
    case "defaultCheck":
      return (
        <Button
          theme="ordinary"
          shape="button"
          extraCss={"h-[64px] px-[24px] justify-between " + activeClassName}
          onClick={onClick}
        >
          <Text
            size="base"
            weight="bold"
            color={isActive ? "main" : "gray-700"}
          >
            {text}
          </Text>
          <Icon type="CHECKED" />
        </Button>
      );
    case "onClickCheck":
      return (
        <Button
          theme="transparent"
          extraCss={
            "h-[49px] justify-between pl-[16px] pr-[32px] " + activeClassName
          }
          onClick={onClick}
        >
          <Text size="sm" weight="bold" color={isActive ? "main" : "gray-700"}>
            {text}
          </Text>
          {isActive && <Icon type="CHECKED" />}
        </Button>
      );
  }
}
const MemoizedCheckButtonOption = React.memo(CheckButtonOption);

export { MemoizedCheckButtonOption as CheckButtonOption };
