"use client";

import Icon from "../atoms/Icon";

type TLevel = {
  role: "LEVEL";
  level: string;
  detail: string;
  onClick?: () => void;
};

type TType = {
  role: "TYPE";
  detail: string;
  onClick?: () => void;
};

type TButtonOptionDetail = TLevel | TType;

function ButtonOptionDetail({ ...props }: TButtonOptionDetail) {
  const commonClassName =
    "w-full px-[24px] h-[64px] flex items-center rounded-[3px] border border-gray-300 text-gray-700 font-bold cursor-pointer ";

  switch (props.role) {
    case "LEVEL":
      return (
        <span
          className={commonClassName + "gap-[18px]"}
          onClick={props.onClick}
        >
          <span className="text-[14px]">{props.level}</span>
          <span className="text-[12px]">{props.detail}</span>
        </span>
      );

    case "TYPE":
      return (
        <span className={commonClassName + "text-[16px] justify-between"}>
          <span>{props.detail}</span>
          <Icon type="CHECKED" />
        </span>
      );
  }
}

export default ButtonOptionDetail;
