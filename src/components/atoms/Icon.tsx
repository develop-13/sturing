"use client";
import React from "react";
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
    | "FILTER"
    | "CAMERA"
    | "DESIGN"
    | "TECH"
    | "BUSINESS"
    | "MARKETING"
    | "ECONOMY"
    | "LANGUAGE"
    | "CERTIFICATION"
    | "SELFDEVELOP"
    | "LOGO";
  color?: string;
  onClick?: () => void;
};

function IconFormat({
  size = 24,
  icon,
  onClick,
  color,
}: {
  size?: number;
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
}) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      {React.cloneElement(icon as React.ReactElement, {
        size,
        color,
      })}{" "}
    </div>
  );
}

function Icon(props: TIconData) {
  const { type, color, onClick } = props;
  const router = useRouter();
  const defaultSize = 24;

  switch (type) {
    case "BELL":
      return (
        //<IconFormat onClick={() => {}} icon={<VscBell />} size={defaultSize} />
        <IconFormat onClick={onClick} icon={<VscBell />} size={defaultSize} />
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
          size={defaultSize}
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
          size={defaultSize}
        />
      );

    case "CLOSE":
      return (
        <IconFormat
          icon={<IoMdClose />}
          onClick={() => {
            router.back();
          }}
          size={defaultSize}
        />
      );

    case "SEARCH":
      return (
        <IconFormat
          icon={<IoSearchOutline />}
          onClick={() => {
            console.log("search/result페이지로 이동");
          }}
          size={defaultSize}
        />
      );

    case "CHATBOX":
      return <IconFormat icon={<BsChatSquareDots />} size={defaultSize} />;

    case "LOGO":
      return <IconFormat icon={<Icon_Logo />} size={defaultSize} />;

    case "MENU":
      return (
        <IconFormat
          icon={<SlMenu />}
          onClick={() => {
            router.push("/sidebar");
          }}
          size={defaultSize}
        />
      );

    case "MORE":
      return <IconFormat icon={<PiDotsThreeOutlineFill />} size={20} />;

    case "SHARE":
      return <IconFormat icon={<GoShare />} size={defaultSize} />;

    case "USER":
      return <IconFormat icon={<FaRegUser />} size={defaultSize} />;

    case "CAMERA":
      return (
        <IconFormat
          icon={
            <Image
              src="/svg/ect/camera.svg"
              alt=""
              width={defaultSize}
              height={defaultSize}
            />
          }
        />
      );

    case "FILTER":
      return (
        <IconFormat
          icon={
            <Image
              src="/svg/ect/filter.svg"
              alt=""
              width={defaultSize}
              height={defaultSize}
            />
          }
        />
      );

    case "DESIGN":
      return (
        <IconFormat
          icon={
            <Image src="/svg/interests/design" alt="" width={28} height={28} />
          }
        />
      );

    case "TECH":
      return (
        <IconFormat
          icon={
            <Image src="/svg/interests/tech" alt="" width={28} height={28} />
          }
        />
      );

    case "BUSINESS":
      return (
        <IconFormat
          icon={
            <Image
              src="/svg/interests/business"
              alt=""
              width={30}
              height={22.5}
            />
          }
        />
      );

    case "ECONOMY":
      return (
        <IconFormat
          icon={
            <Image src="/svg/interests/economy" alt="" width={26} height={26} />
          }
        />
      );

    case "LANGUAGE":
      return (
        <IconFormat
          icon={
            <Image
              src="/svg/interests/language"
              alt=""
              width={33}
              height={20}
            />
          }
        />
      );

    case "CERTIFICATION":
      return (
        <IconFormat
          icon={
            <Image
              src="/svg/interests/certification"
              alt=""
              width={28}
              height={19}
            />
          }
        />
      );

    case "SELFDEVELOP":
      return (
        <IconFormat
          icon={
            <Image
              src="/svg/interests/selfDevelop"
              alt=""
              width={25.2}
              height={28}
            />
          }
        />
      );

    case "LOGO":
      return (
        <IconFormat
          icon={<Image src={"svg/logo.svg"} alt="" height={18} width={17.28} />}
        />
      );
  }
  return <></>;
}

export default Icon;
