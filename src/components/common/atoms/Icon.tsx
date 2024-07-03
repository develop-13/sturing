"use client";
import React from "react";
import IconFormat from "../../common/atoms/IconFormat";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCheckmark } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";
import Icon_Logo from "@/svg/Icon-logo";
import { SlMenu } from "react-icons/sl";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GoShare } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";

type TIconData = {
  type:
    | "BELL"
    | "CHECKED"
    | "BACK"
    | "FORWARD"
    | "BOOKMARK"
    | "CLOSE"
    | "SEARCH"
    | "CANCEL"
    | "TEMPORALSAVE"
    | "CHATBOX"
    | "LOGO"
    | "MENU"
    | "MORE"
    | "SHARE"
    | "USER"
    | "FILTER";

  // svg?: () => {};
  // src?: string;
  color?: string;
  onClick?: () => void;
};

function Icon(props: TIconData) {
  const { type, color } = props;
  const router = useRouter();

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
      return <IconFormat icon={<CiBookmark />} size={20} />;

    case "FORWARD":
      return (
        <IconFormat
          icon={<IoIosArrowForward />}
          onClick={() => {
            "앞으로 가기 기능을 구현해주세요";
          }}
        />
      );

    case "CLOSE":
      return (
        <IconFormat
          icon={<IoMdClose />}
          onClick={() => {
            router.back();
          }}
        />
      );

    case "SEARCH":
      return (
        <IconFormat
          icon={<IoSearchOutline />}
          onClick={() => {
            console.log("search/result페이지로 이동");
          }}
        />
      );

    case "CHATBOX":
      return <IconFormat icon={<BsChatSquareDots />} />;

    case "LOGO":
      return <IconFormat icon={<Icon_Logo />} />;

    case "MENU":
      return (
        <IconFormat
          icon={<SlMenu />}
          onClick={() => {
            router.push("/sidebar");
          }}
        />
      );

    case "MORE":
      return <IconFormat icon={<PiDotsThreeOutlineFill />} size={20} />;

    case "SHARE":
      return <IconFormat icon={<GoShare />} />;

    case "USER":
      return <IconFormat icon={<FaRegUser />} />;

    case "FILTER":
      return (
        <IconFormat
          icon={
            <Image src="/svg/ect/filter.svg" alt="" width={24} height={24} />
          }
        />
      );
  }
  return <></>;
}

export default Icon;
