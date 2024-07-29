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
import Icon_Logo from "@/public/svg/ect/Icon-logo";
import { SlMenu } from "react-icons/sl";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GoShare } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

export type TIconData = {
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
    | "COMPLETE"
    | "DATE"
    | "LOCATION"
    | "MEMBERS"
    | "DATE_COLOR"
    | "CHECKBOX"
    | "LOCATION_COLOR"
    | "STAR";
  onClick?: () => void;
  color?: string; // 같은 아이콘이라도 색이 다른 경우 때문에 추가하였습니다.
  size?: number;
};
const IconDataSet: Record<
  TIconData["type"],
  (
    color?: string,
    size?: number
  ) => { icon: React.ReactNode; size?: number; color?: string }
> = {
  STAR: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/star.svg"
        alt=""
        width={size || 12}
        height={size || 12}
      />
    ),
    color,
  }),
  LOCATION_COLOR: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/location_color.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
    color,
  }),
  CHECKBOX: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
    color,
  }),
  DATE_COLOR: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/date_color.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
    color,
  }),
  MEMBERS: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/members.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
    color,
  }),
  LOCATION: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/location.svg"
        alt=""
        width={size || 12}
        height={size || 15}
      />
    ),
    color,
  }),
  DATE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/date.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
    color,
  }),
  COMPLETE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/complete.svg"
        alt=""
        width={size || 62}
        height={size || size || 62}
      />
    ),
    color,
  }),

  FREE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/free.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  COOPERATIVE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/cooperative.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  SELFDIRECTED: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/selfDirected.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  LEARNING: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/learningOriented.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  RESPONSIBLE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/responsible.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  ENTHUSIASTIC: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/enthusiastic.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  SYSTEMATIC: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/systematic.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  SERIOUS: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/serious.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  PROFESSIONAL: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/professional.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
    color,
  }),
  FRIENDLY: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/friendly.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
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

  CAMERA: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/camera.svg"
        alt=""
        width={size || 24}
        height={size || 24}
      />
    ),
    color,
  }),

  FILTER: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/filter.svg"
        alt=""
        width={size || 24}
        height={size || 24}
      />
    ),
    color,
  }),

  DESIGN: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/design.svg"
        alt=""
        width={size || 28}
        height={size || 28}
      />
    ),
    color,
  }),

  TECH: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/tech.svg"
        alt=""
        width={size || 28}
        height={size || 28}
      />
    ),
    color,
  }),

  BUSINESS: (color?: string, size?: number) => ({
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

  ECONOMY: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/economy.svg"
        alt=""
        width={size || 26}
        height={size || 26}
      />
    ),
    color,
  }),

  LANGUAGE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/language.svg"
        alt=""
        width={size || 33}
        height={size || 20}
      />
    ),
    color,
  }),

  CERTIFICATION: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/certification.svg"
        alt=""
        width={size || 28}
        height={size || 19}
      />
    ),
    color,
  }),

  SELFDEVELOP: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/selfDevelop.svg"
        alt=""
        width={size || 25.2}
        height={size || 28}
      />
    ),
    color,
  }),

  MARKETING: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/marketing.svg"
        alt=""
        width={size || 25.2}
        height={size || 28}
      />
    ),
    color,
  }),

  RESET: (color?: string) => ({
    icon: <GrPowerReset />,
    color,
  }),

  WRITE: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/write.svg"
        alt=""
        width={size || 16}
        height={size || 16}
      />
    ),
    color,
  }),

  KAKAO: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/kakao.svg"
        alt=""
        width={size || 18}
        height={size || 17}
      />
    ),
    color,
  }),

  RLOGO: (color?: string, size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/logo.svg"
        alt=""
        width={size || 18}
        height={size || 17}
      />
    ),
    color,
  }),
};
const getIcon = ({ type, onClick, color, size }: TIconData) => {
  const iconData = IconDataSet[type](color, size);
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
    <div onClick={onClick} className="shrink-0 cursor-pointer">
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
