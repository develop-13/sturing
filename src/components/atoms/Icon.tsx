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
import { useRouter } from "next/navigation";

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
    | "CHECKBOX_COLOR"
    | "LOCATION_COLOR"
    | "STAR"
    | "DOWN"
    | "ADD"
    | "CHECKBOX_CHECKED"
    | "CHECKBOX_UNCHECKED"
    | "PLUS"
    | "MINUS";
  onClick?: () => void;
  size?: number;
  className?: string;
};

const IconDataSet: Record<
  TIconData["type"],
  (size?: number) => {
    icon: React.ReactNode;
    size?: number;
    onClick?: () => void;
  }
> = {
  PLUS: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/plus.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  MINUS: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/minus.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  CHECKBOX_UNCHECKED: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox_unchecked.svg"
        alt=""
        width={size || 20}
        height={size || 20}
      />
    ),
  }),
  CHECKBOX_CHECKED: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox_checked.svg"
        alt=""
        width={size || 20}
        height={size || 20}
      />
    ),
  }),

  ADD: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/add.svg"
        alt=""
        width={size || 20}
        height={size || 20}
      />
    ),
  }),
  DOWN: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/down.svg"
        alt=""
        width={size || 12}
        height={size || 12}
      />
    ),
  }),
  STAR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/star.svg"
        alt=""
        width={size || 12}
        height={size || 12}
      />
    ),
  }),
  LOCATION_COLOR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/location_color.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  CHECKBOX_COLOR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  DATE_COLOR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/date_color.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  MEMBERS: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/members.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  LOCATION: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/location.svg"
        alt=""
        width={size || 12}
        height={size || 15}
      />
    ),
  }),
  DATE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/date.svg"
        alt=""
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  COMPLETE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/complete.svg"
        alt=""
        width={size || 62}
        height={size || size || 62}
      />
    ),
  }),

  FREE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/free.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  COOPERATIVE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/cooperative.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  SELFDIRECTED: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/selfDirected.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  LEARNING: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/learningOriented.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  RESPONSIBLE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/responsible.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  ENTHUSIASTIC: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/enthusiastic.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  SYSTEMATIC: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/systematic.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  SERIOUS: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/serious.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  PROFESSIONAL: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/professional.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  FRIENDLY: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/friendly.svg"
        alt=""
        width={size || 30}
        height={size || 30}
      />
    ),
  }),

  BELL: () => ({
    icon: <VscBell />,
    onClick: () => {
      alert("BELL CLICKED!");
    },
  }),

  CHECKED: () => ({
    icon: <IoCheckmark />,
  }),

  BACK: () => ({
    icon: <IoIosArrowBack />,
  }),

  BOOKMARK: () => ({
    icon: <CiBookmark />,
  }),

  FORWARD: () => ({
    icon: <IoIosArrowForward />,
  }),

  CLOSE: () => ({
    icon: <IoMdClose />,
  }),

  SEARCH: () => ({
    icon: <IoSearchOutline />,
  }),

  CHATBOX: () => ({
    icon: <BsChatSquareDots />,
  }),

  LOGO: () => ({
    icon: <Icon_Logo />,
  }),

  MENU: () => ({
    icon: <SlMenu />,
  }),

  MORE: () => ({
    icon: <PiDotsThreeOutlineFill />,
    size: 20,
  }),

  SHARE: () => ({
    icon: <GoShare />,
  }),

  USER: () => ({
    icon: <FaRegUser />,
  }),

  CAMERA: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/camera.svg"
        alt=""
        width={size || 24}
        height={size || 24}
      />
    ),
  }),

  FILTER: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/filter.svg"
        alt=""
        width={size || 24}
        height={size || 24}
      />
    ),
  }),

  DESIGN: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/design.svg"
        alt=""
        width={size || 28}
        height={size || 28}
      />
    ),
  }),

  TECH: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/tech.svg"
        alt=""
        width={size || 28}
        height={size || 28}
      />
    ),
  }),

  BUSINESS: () => ({
    icon: (
      <Image
        src="/svg/interests/business.svg"
        alt=""
        width={30}
        height={22.5}
      />
    ),
  }),

  ECONOMY: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/economy.svg"
        alt=""
        width={size || 26}
        height={size || 26}
      />
    ),
  }),

  LANGUAGE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/language.svg"
        alt=""
        width={size || 33}
        height={size || 20}
      />
    ),
  }),

  CERTIFICATION: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/certification.svg"
        alt=""
        width={size || 28}
        height={size || 19}
      />
    ),
  }),

  SELFDEVELOP: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/selfDevelop.svg"
        alt=""
        width={size || 25.2}
        height={size || 28}
      />
    ),
  }),

  MARKETING: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/marketing.svg"
        alt=""
        width={size || 25.2}
        height={size || 28}
      />
    ),
  }),

  RESET: () => ({
    icon: <GrPowerReset />,
  }),

  WRITE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/write.svg"
        alt=""
        width={size || 16}
        height={size || 16}
      />
    ),
  }),

  KAKAO: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/kakao.svg"
        alt=""
        width={size || 18}
        height={size || 17}
      />
    ),
  }),

  RLOGO: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/logo.svg"
        alt=""
        width={size || 18}
        height={size || 17}
      />
    ),
  }),
};

const getIcon = ({ type, onClick, size, className }: TIconData) => {
  // 하고자 하는 것: 여기서 onClick을 받으면 그 onClick을 쓰게끔 하고
  // onClick을 받지 않으면 타입별로 정의되어 있는 onClick을 쓰게끔 하기
  const iconData = IconDataSet[type](size);
  const effectiveSize = iconData.size || 24;
  const effecttiveOnclick = iconData.onClick || onClick;
  return (
    <IconFormat
      icon={iconData.icon}
      size={effectiveSize}
      onClick={effecttiveOnclick}
      className={className}
    />
  );
};

function IconFormat({
  size,
  icon,
  onClick,
  className,
}: {
  size?: number;
  icon: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={"shrink-0 cursor-pointer " + className}>
      {React.cloneElement(icon as React.ReactElement, {
        size,
      })}{" "}
    </div>
  );
}

function Icon(props: TIconData) {
  return getIcon(props);
}

export default Icon;
