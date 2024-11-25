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
    | "GITHUB"
    | "CHECKED_ROUND"
    | "UNCHECKED_ROUND";
  onClick?: () => void;
  width?: number;
  height?: number;
  className?: string;
};

// IconDataSetExampleType 정의
export type TIconDataSet = Record<
  TIconData["type"],
  (
    onClick?: () => void,
    width?: number,
    height?: number,
    className?: string
  ) => React.ReactNode
>;
const IconDataSet: TIconDataSet = {
  CHECKED_ROUND: (onClick, width = 20, height = 20, className) => {
    let style = `flex items-center justify-center bg-mainColor rounded-full w-[20px] h-[20px] ${className}`;
    return (
      <div className={style} onClick={onClick}>
        <Icon type="CHECKED" className="text-white" />
      </div>
    );
  },
  UNCHECKED_ROUND: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/unchecked_round.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
    />
  ),

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

  BACK: (onClick, width = 10, height = 17, className) => {
    const router = useRouter();

    const defaultOnClick = () => {
      router.back();
    };

    return (
      <Image
        src="/svg/ect/back.svg"
        width={width}
        height={height}
        onClick={onClick || defaultOnClick}
        className={className}
      />
    );
  },

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
      src="/svg/ect/rotate-right.svg"
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

const getIcon = ({ type, onClick, width, height, className }: TIconData) => {
  const defaultClassName = "shrink-0 cursor-pointer ";
  return IconDataSet[type](
    onClick,
    width,
    height,
    defaultClassName + className
  );
};

function Icon(props: TIconData) {
  return getIcon(props);
}

export default Icon;
