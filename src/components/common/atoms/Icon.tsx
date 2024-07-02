"use client";
import React from "react";
import IconFormat from "../../common/atoms/IconFormat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCheckmark } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";

type TIconData = {
  type: "BELL" | "CHECKED" | "BACK" | "BOOKMARK";
  // svg?: () => {};
  // src?: string;
  size?: number;
  color?: string;
};

function Icon(props: TIconData) {
  const { type, size, color } = props;
  const router = useRouter();
  const effectiveSize = size || 24;

  switch (type) {
    case "BELL":
      return (
        <IconFormat
          onClick={() => {
            console.log("bell icon clicked!");
          }}
          icon={<VscBell />}
        />
      );
    case "CHECKED":
      return <IconFormat icon={<IoCheckmark />} color={color} />;

    case "BACK":
      return (
        <IconFormat
          icon={<IoIosArrowBack />}
          onClick={() => {
            console.log("이전 페이지로 이동");
            router.back();
          }}
        />
      );

    case "BOOKMARK":
      return <IconFormat icon={<CiBookmark />} size={size} />;
  }
  return <></>;
}

export default Icon;
