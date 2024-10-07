"use client";
import React from "react";
import Image from "@/components/atoms/Image";
import { IoCheckmark } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { IoSearchOutline } from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";
// import Icon_Logo from "@/public/svg/ect/Icon-logo";
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
    | "MINUS"
    | "GITHUB";
  onClick?: () => void;
  width?: number;
  height?: number;
  className?: string;
};

// IconDataSetExampleType 정의
export type IconDataSetExampleType = Record<
  TIconData["type"],
  (
    onClick?: () => void,
    width?: number,
    height?: number,
    className?: string
  ) => React.ReactNode
>;
const IconDataSetExample: IconDataSetExampleType = {
  // EXAMPLE: (onClick, width, height, className) => {
  //   const effectiveWidth = width || 15;
  //   const effectiveHeight = height || 18;
  //   const defaultOnclick = () => {};
  //   const effectiveOnClick = onClick || defaultOnclick;
  //   return (
  //     <Image
  //       src=""
  //
  //       width={effectiveWidth}
  //       height={effectiveHeight}
  //       onClick={effectiveOnClick}
  //       className={className}
  //     />
  //   );
  // },

  GITHUB: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/github_logo.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),
  PLUS: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/plus.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  MINUS: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/minus.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CHECKBOX_UNCHECKED: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/checkbox_unchecked.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CHECKBOX_CHECKED: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/checkbox_checked.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  ADD: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/add.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  DOWN: (onClick, width = 12, height = 12, className) => (
    <Image
      src="/svg/ect/down.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  STAR: (onClick, width = 12, height = 12, className) => (
    <Image
      src="/svg/ect/star.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  LOCATION_COLOR: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/location_color.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CHECKBOX_COLOR: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/checkbox.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  DATE_COLOR: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/date_color.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  MEMBERS: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/members.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  LOCATION: (onClick, width = 12, height = 15, className) => (
    <Image
      src="/svg/ect/location.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  DATE: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/date.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  COMPLETE: (onClick, width = 62, height = 62, className) => (
    <Image
      src="/svg/ect/complete.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  FREE: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/free.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  COOPERATIVE: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/cooperative.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  SELFDIRECTED: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/selfDirected.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  LEARNING: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/learningOriented.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  RESPONSIBLE: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/responsible.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  ENTHUSIASTIC: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/enthusiastic.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  SYSTEMATIC: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/systematic.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  SERIOUS: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/serious.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  PROFESSIONAL: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/professional.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  FRIENDLY: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/friendly.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  BELL: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/bell.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CHECKED: (onClick, width, height, className) => (
    <IoCheckmark onClick={onClick} className={className} />
  ),

  BACK: (onClick, width = 10, height = 17, className) => (
    <Image
      src="/svg/ect/back.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  BOOKMARK: (onClick, width = 12, height = 16, className) => (
    <Image
      src="/svg/ect/bookmark.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  FORWARD: (onClick, width = 10, height = 17, className) => (
    <Image
      src="/svg/ect/forward.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CLOSE: (onClick, width = 10, height = 10, className) => (
    <Image
      src="/svg/ect/close.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  SEARCH: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/search.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CHATBOX: (onClick, width = 20, height = 19, className) => (
    <Image
      src="/svg/ect/chatbox.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  LOGO: (onClick, width = 78, height = 24, className) => (
    // <Icon_Logo width={width} height={height} onClick={onClick} />
    <Image
      src="/svg/ect/text-logo.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  MENU: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/menu.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  MORE: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/dots.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  SHARE: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/share.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  USER: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/user.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CAMERA: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/camera.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  FILTER: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/filter.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  DESIGN: (onClick, width = 28, height = 28, className) => (
    <Image
      src="/svg/interests/design.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  TECH: (onClick, width = 28, height = 28, className) => (
    <Image
      src="/svg/interests/tech.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  BUSINESS: (onClick, width = 30, height = 22.5, className) => (
    <Image
      src="/svg/interests/business.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  ECONOMY: (onClick, width = 26, height = 26, className) => (
    <Image
      src="/svg/interests/economy.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  LANGUAGE: (onClick, width = 33, height = 20, className) => (
    <Image
      src="/svg/interests/language.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  CERTIFICATION: (onClick, width = 28, height = 19, className) => (
    <Image
      src="/svg/interests/certification.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  SELFDEVELOP: (onClick, width = 25.2, height = 28, className) => (
    <Image
      src="/svg/interests/selfDevelop.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  MARKETING: (onClick, width = 25.2, height = 28, className) => (
    <Image
      src="/svg/interests/marketing.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  RESET: (onClick, width = 19, height = 19, className) => (
    <Image
      src="/svg/interests/rotate-right.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  WRITE: (onClick, width = 16, height = 16, className) => (
    <Image
      src="/svg/ect/write.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  KAKAO: (onClick, width = 18, height = 17, className) => (
    <Image
      src="/svg/ect/kakao.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

  RLOGO: (onClick, width = 18, height = 17, className) => (
    <Image
      src="/svg/ect/logo.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),
};

// -------------------------------------------------

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
      <Image src="/svg/ect/plus.svg" width={size || 18} height={size || 18} />
    ),
  }),
  MINUS: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/minus.svg" width={size || 18} height={size || 18} />
    ),
  }),
  CHECKBOX_UNCHECKED: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox_unchecked.svg"
        width={size || 20}
        height={size || 20}
      />
    ),
  }),
  CHECKBOX_CHECKED: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox_checked.svg"
        width={size || 20}
        height={size || 20}
      />
    ),
  }),

  ADD: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/add.svg" width={size || 20} height={size || 20} />
    ),
  }),
  DOWN: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/down.svg" width={size || 12} height={size || 12} />
    ),
  }),
  STAR: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/star.svg" width={size || 12} height={size || 12} />
    ),
  }),
  LOCATION_COLOR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/location_color.svg"
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  CHECKBOX_COLOR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/checkbox.svg"
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  DATE_COLOR: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/date_color.svg"
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  MEMBERS: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/members.svg"
        width={size || 18}
        height={size || 18}
      />
    ),
  }),
  LOCATION: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/location.svg"
        width={size || 12}
        height={size || 15}
      />
    ),
  }),
  DATE: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/date.svg" width={size || 18} height={size || 18} />
    ),
  }),
  COMPLETE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/ect/complete.svg"
        width={size || 62}
        height={size || size || 62}
      />
    ),
  }),

  FREE: (size?: number) => ({
    icon: (
      <Image src="/svg/emoji/free.svg" width={size || 30} height={size || 30} />
    ),
  }),
  COOPERATIVE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/cooperative.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  SELFDIRECTED: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/selfDirected.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  LEARNING: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/learningOriented.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  RESPONSIBLE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/responsible.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  ENTHUSIASTIC: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/enthusiastic.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  SYSTEMATIC: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/systematic.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  SERIOUS: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/serious.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  PROFESSIONAL: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/professional.svg"
        width={size || 30}
        height={size || 30}
      />
    ),
  }),
  FRIENDLY: (size?: number) => ({
    icon: (
      <Image
        src="/svg/emoji/friendly.svg"
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
      <Image src="/svg/ect/camera.svg" width={size || 24} height={size || 24} />
    ),
  }),

  FILTER: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/filter.svg" width={size || 24} height={size || 24} />
    ),
  }),

  DESIGN: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/design.svg"
        width={size || 28}
        height={size || 28}
      />
    ),
  }),

  TECH: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/tech.svg"
        width={size || 28}
        height={size || 28}
      />
    ),
  }),

  BUSINESS: () => ({
    icon: <Image src="/svg/interests/business.svg" width={30} height={22.5} />,
  }),

  ECONOMY: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/economy.svg"
        width={size || 26}
        height={size || 26}
      />
    ),
  }),

  LANGUAGE: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/language.svg"
        width={size || 33}
        height={size || 20}
      />
    ),
  }),

  CERTIFICATION: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/certification.svg"
        width={size || 28}
        height={size || 19}
      />
    ),
  }),

  SELFDEVELOP: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/selfDevelop.svg"
        width={size || 25.2}
        height={size || 28}
      />
    ),
  }),

  MARKETING: (size?: number) => ({
    icon: (
      <Image
        src="/svg/interests/marketing.svg"
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
      <Image src="/svg/ect/write.svg" width={size || 16} height={size || 16} />
    ),
  }),

  KAKAO: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/kakao.svg" width={size || 18} height={size || 17} />
    ),
  }),

  RLOGO: (size?: number) => ({
    icon: (
      <Image src="/svg/ect/logo.svg" width={size || 18} height={size || 17} />
    ),
  }),
};

const getIcon = ({ type, onClick, width, height, className }: TIconData) => {
  // const getIcon = (props: TIconData) => {

  // const { type, ...restProps } = props;
  // const IconComponent = IconDataSet[type](restProps)
  // return <IconComponent/>

  // 하고자 하는 것: 여기서 onClick을 받으면 그 onClick을 쓰게끔 하고
  // onClick을 받지 않으면 타입별로 정의되어 있는 onClick을 쓰게끔 하기
  const defaultClassName = "shrink-0 cursor-pointer ";
  return IconDataSetExample[type](
    onClick,
    width,
    height,
    defaultClassName + className
  );

  // const effectiveSize = iconData.size || 24;
  // const effecttiveOnclick = onClick || iconData.onClick;
  // return (
  //   <IconFormat
  //     icon={iconData.icon}
  //     size={effectiveSize}
  //     onClick={effecttiveOnclick}
  //     className={className}
  //   />
  // );
};

function IconFormat({
  size,
  icon,
  onClick,
  color,
  className,
}: {
  size?: number;
  icon: React.ReactNode;
  onClick?: () => void;
  color?: string;
  className?: string;
}) {
  return (
    <div onClick={onClick} className={"shrink-0 cursor-pointer " + className}>
      {React.cloneElement(icon as React.ReactElement, {
        size,
        className: color,
      })}{" "}
    </div>
  );
}

// 하려고 하는 것: size 대신 width,height를 전달하도록 함.
//

function Icon(props: TIconData) {
  return getIcon(props);
}

export default Icon;
