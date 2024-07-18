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
    | "RLOGO"
    | "FRIENDLY"
    | "PROFESSIONAL"
    | "SERIOUS"
    | "SYSTEMATIC"
    | "ENTHUSIASTIC"
    | "RESPONSIBLE"
    | "LEARNING"
    | "COOPERATIVE"
    | "SELFDIRECTED"
    | "FREE"
    | "COMPLETE";
  onClick?: () => void;
  color?: string; // 같은 아이콘이라도 색이 다른 경우 때문에 추가하였습니다.
};
const IconDataSet: Record<
  TIconData["type"],
  (color?: string) => { icon: React.ReactNode; size?: number; color?: string }
> = {
  COMPLETE: (color?: string) => ({
    icon: <Image src="/svg/ect/complete.svg" alt="" width={62} height={62} />,
    color,
  }),

  FREE: (color?: string) => ({
    icon: <Image src="/svg/emoji/free.svg" alt="" width={30} height={30} />,
    color,
  }),
  COOPERATIVE: (color?: string) => ({
    icon: (
      <Image src="/svg/emoji/cooperative.svg" alt="" width={30} height={30} />
    ),
    color,
  }),
  SELFDIRECTED: (color?: string) => ({
    icon: (
      <Image src="/svg/emoji/selfDirected.svg" alt="" width={30} height={30} />
    ),
    color,
  }),
  LEARNING: (color?: string) => ({
    icon: (
      <Image
        src="/svg/emoji/learningOriented.svg"
        alt=""
        width={30}
        height={30}
      />
    ),
    color,
  }),
  RESPONSIBLE: (color?: string) => ({
    icon: (
      <Image src="/svg/emoji/responsible.svg" alt="" width={30} height={30} />
    ),
    color,
  }),
  ENTHUSIASTIC: (color?: string) => ({
    icon: (
      <Image src="/svg/emoji/enthusiastic.svg" alt="" width={30} height={30} />
    ),
    color,
  }),
  SYSTEMATIC: (color?: string) => ({
    icon: (
      <Image src="/svg/emoji/systematic.svg" alt="" width={30} height={30} />
    ),
    color,
  }),
  SERIOUS: (color?: string) => ({
    icon: <Image src="/svg/emoji/serious.svg" alt="" width={30} height={30} />,
    color,
  }),
  PROFESSIONAL: (color?: string) => ({
    icon: (
      <Image src="/svg/emoji/professional.svg" alt="" width={30} height={30} />
    ),
    color,
  }),
  FRIENDLY: (color?: string) => ({
    icon: <Image src="/svg/emoji/friendly.svg" alt="" width={30} height={30} />,
    color,
  }),

  BELL: (color?: string) => ({
    icon: <VscBell />,
    color,
  }),

  CHECKED: (color?: string) => ({
    icon: <IoCheckmark />,
    color,
  }),

  BACK: (color?: string) => ({
    icon: <IoIosArrowBack />,
    color,
  }),

  BOOKMARK: (color?: string) => ({
    icon: <CiBookmark />,
    color,
  }),

  FORWARD: (color?: string) => ({
    icon: <IoIosArrowForward />,
    color,
  }),

  CLOSE: (color?: string) => ({
    icon: <IoMdClose />,
    color,
  }),

  SEARCH: (color?: string) => ({
    icon: <IoSearchOutline />,
    color,
  }),

  CHATBOX: (color?: string) => ({
    icon: <BsChatSquareDots />,
    color,
  }),

  LOGO: (color?: string) => ({
    icon: <Icon_Logo />,
    color,
  }),

  MENU: (color?: string) => ({
    icon: <SlMenu />,
    color,
  }),

  MORE: (color?: string) => ({
    icon: <PiDotsThreeOutlineFill />,
    size: 20,
    color,
  }),

  SHARE: (color?: string) => ({
    icon: <GoShare />,
    color,
  }),

  USER: (color?: string) => ({
    icon: <FaRegUser />,
    color,
  }),

  CAMERA: (color?: string) => ({
    icon: <Image src="/svg/ect/camera.svg" alt="" width={24} height={24} />,
    color,
  }),

  FILTER: (color?: string) => ({
    icon: <Image src="/svg/ect/filter.svg" alt="" width={24} height={24} />,
    color,
  }),

  DESIGN: (color?: string) => ({
    icon: (
      <Image src="/svg/interests/design.svg" alt="" width={28} height={28} />
    ),
    color,
  }),

  TECH: (color?: string) => ({
    icon: <Image src="/svg/interests/tech.svg" alt="" width={28} height={28} />,
    color,
  }),

  BUSINESS: (color?: string) => ({
    icon: (
      <Image
        src="/svg/interests/business.svg"
        alt=""
        width={30}
        height={22.5}
      />
    ),
    color,
  }),

  ECONOMY: (color?: string) => ({
    icon: (
      <Image src="/svg/interests/economy.svg" alt="" width={26} height={26} />
    ),
    color,
  }),

  LANGUAGE: (color?: string) => ({
    icon: (
      <Image src="/svg/interests/language.svg" alt="" width={33} height={20} />
    ),
    color,
  }),

  CERTIFICATION: (color?: string) => ({
    icon: (
      <Image
        src="/svg/interests/certification.svg"
        alt=""
        width={28}
        height={19}
      />
    ),
    color,
  }),

  SELFDEVELOP: (color?: string) => ({
    icon: (
      <Image
        src="/svg/interests/selfDevelop.svg"
        alt=""
        width={25.2}
        height={28}
      />
    ),
    color,
  }),

  MARKETING: (color?: string) => ({
    icon: (
      <Image
        src="/svg/interests/marketing.svg"
        alt=""
        width={25.2}
        height={28}
      />
    ),
    color,
  }),

  RESET: (color?: string) => ({
    icon: <GrPowerReset />,
    color,
  }),

  WRITE: (color?: string) => ({
    icon: <Image src="/svg/ect/write.svg" alt="" width={16} height={16} />,
    color,
  }),

  KAKAO: (color?: string) => ({
    icon: <Image src="/svg/ect/kakao.svg" alt="" width={18} height={17} />,
    color,
  }),

  RLOGO: (color?: string) => ({
    icon: <Image src="/svg/ect/logo.svg" alt="" width={18} height={17} />,
    color,
  }),
};
const getIcon = ({ type, onClick, color }: TIconData) => {
  const iconData = IconDataSet[type](color);
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
        className: color,
      })}{" "}
    </div>
  );
}

function Icon(props: TIconData) {
  return getIcon(props);
}

export default Icon;
