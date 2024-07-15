"use client";
import React from "react";
import Image from "next/image";
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
import { GrPowerReset } from "react-icons/gr";

type TIconData = {
  type:
    | "BELL"
    | "CHECKED"
    | "BACK"
    | "FORWARD"
    | "BOOKMARK"
    | "CLOSE"
    | "SEARCH"
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
    | "RESET"
    | "WRITE"
    | "KAKAO"
    | "RLOGO";
  onClick?: () => void;
};
const IconDataSet: Record<
  TIconData["type"],
  { icon: React.ReactNode; size?: number; color?: string }
> = {
  BELL: {
    icon: <VscBell />,
  },
  CHECKED: {
    icon: <IoCheckmark />,
  },
  BACK: {
    icon: <IoIosArrowBack />,
  },
  BOOKMARK: {
    icon: <CiBookmark />,
    size: 20,
  },
  FORWARD: {
    icon: <IoIosArrowForward />,
  },
  CLOSE: {
    icon: <IoMdClose />,
  },
  SEARCH: {
    icon: <IoSearchOutline />,
  },
  CHATBOX: {
    icon: <BsChatSquareDots />,
  },
  LOGO: {
    icon: <Icon_Logo />,
  },
  MENU: {
    icon: <SlMenu />,
  },
  MORE: {
    icon: <PiDotsThreeOutlineFill />,
    size: 20,
  },
  SHARE: {
    icon: <GoShare />,
  },
  USER: {
    icon: <FaRegUser />,
  },
  CAMERA: {
    icon: <Image src="/svg/ect/camera.svg" alt="" width={24} height={24} />,
  },
  FILTER: {
    icon: <Image src="/svg/ect/filter.svg" alt="" width={24} height={24} />,
  },
  DESIGN: {
    icon: (
      <Image src="/svg/interests/design.svg" alt="" width={28} height={28} />
    ),
  },
  TECH: {
    icon: <Image src="/svg/interests/tech.svg" alt="" width={28} height={28} />,
  },
  BUSINESS: {
    icon: (
      <Image
        src="/svg/interests/business.svg"
        alt=""
        width={30}
        height={22.5}
      />
    ),
  },
  ECONOMY: {
    icon: (
      <Image src="/svg/interests/economy.svg" alt="" width={26} height={26} />
    ),
  },
  LANGUAGE: {
    icon: (
      <Image src="/svg/interests/language.svg" alt="" width={33} height={20} />
    ),
  },
  CERTIFICATION: {
    icon: (
      <Image
        src="/svg/interests/certification.svg"
        alt=""
        width={28}
        height={19}
      />
    ),
  },
  SELFDEVELOP: {
    icon: (
      <Image
        src="/svg/interests/selfDevelop.svg"
        alt=""
        width={25.2}
        height={28}
      />
    ),
  },

  MARKETING: {
    icon: (
      <Image
        src="/svg/interests/marketing.svg"
        alt=""
        width={25.2}
        height={28}
      />
    ),
  },
  RESET: {
    icon: <GrPowerReset />,
    size: 19,
  },

  WRITE: {
    icon: <Image src="/svg/ect/write.svg" alt="" width={16} height={16} />,
  },

  KAKAO: {
    icon: <Image src="/svg/ect/kakao.svg" alt="" width={18} height={17} />,
  },

  RLOGO: {
    icon: <Image src="/svg/ect/logo.svg" alt="" width={18} height={17} />,
  },
};

const getIcon = ({ type, onClick }: TIconData) => {
  const iconData = IconDataSet[type];
  const effectiveSize = iconData.size || 24;
  return (
    <IconFormat
      icon={iconData.icon}
      size={effectiveSize}
      color={iconData.color}
      onClick={onClick}
    />
  );
};

function IconFormat({
  size,
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
    <div onClick={onClick} className="cursor-pointer shrink-0">
      {React.cloneElement(icon as React.ReactElement, {
        size,
        color,
      })}{" "}
    </div>
  );
}

function Icon(props: TIconData) {
  return getIcon(props);
}

export default Icon;
