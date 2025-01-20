"use client";

import dynamic from "next/dynamic";
import React from "react";
import Image from "@/components/atoms/Image";
const IoCheckmark = dynamic(
  () => import("react-icons/io5").then((mod) => mod.IoCheckmark),
  {
    ssr: false, // 서버 측 렌더링을 비활성화하여 클라이언트 측에서만 로드되게 함
  }
);
import { useRouter } from "next/navigation";

export type TIconData = {
  type:
    | "BELL"
    | "CHECKED"
    | "BACK"
    | "BACK_WHITE"
    | "FORWARD"
    | "FORWARD_WHITE"
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
    | "GOOGLE"
    | "CHECKED_ROUND"
    | "UNCHECKED_ROUND"
    | "REMOVE"
    | "CLIP";
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
  CLIP: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/clip.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  REMOVE: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/remove.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

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
      loading="lazy"
    />
  ),

  GITHUB: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/github_logo.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),
  GOOGLE: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/google.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),
  PLUS: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/plus.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  MINUS: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/minus.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CHECKBOX_UNCHECKED: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/checkbox_unchecked.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CHECKBOX_CHECKED: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/checkbox_checked.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  ADD: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/add.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  DOWN: (onClick, width = 12, height = 12, className) => (
    <Image
      src="/svg/ect/down.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  STAR: (onClick, width = 12, height = 12, className) => (
    <Image
      src="/svg/ect/star.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  LOCATION_COLOR: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/location_color.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CHECKBOX_COLOR: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/checkbox.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  DATE_COLOR: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/date_color.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  MEMBERS: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/members.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  LOCATION: (onClick, width = 12, height = 15, className) => (
    <Image
      src="/svg/ect/location.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  DATE: (onClick, width = 18, height = 18, className) => (
    <Image
      src="/svg/ect/date.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  COMPLETE: (onClick, width = 62, height = 62, className) => (
    <Image
      src="/svg/ect/complete.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  FREE: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/free.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  COOPERATIVE: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/cooperative.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  SELFDIRECTED: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/selfDirected.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  LEARNING: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/learningOriented.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  RESPONSIBLE: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/responsible.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  ENTHUSIASTIC: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/enthusiastic.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  SYSTEMATIC: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/systematic.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  SERIOUS: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/serious.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  PROFESSIONAL: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/professional.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  FRIENDLY: (onClick, width = 30, height = 30, className) => (
    <Image
      src="/svg/emoji/friendly.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  BELL: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/bell.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
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
        loading="lazy"
      />
    );
  },

  BACK_WHITE: (onClick, width = 10, height = 17, className) => {
    return (
      <Image
        src="/svg/ect/back_white.svg"
        width={width}
        height={height}
        onClick={onClick}
        className={className}
        loading="lazy"
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
      loading="lazy"
    />
  ),

  FORWARD: (onClick, width = 10, height = 17, className) => (
    <Image
      src="/svg/ect/forward.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  FORWARD_WHITE: (onClick, width = 10, height = 17, className) => (
    <Image
      src="/svg/ect/forward_white.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CLOSE: (onClick, width = 10, height = 10, className) => (
    <Image
      src="/svg/ect/close.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  SEARCH: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/search.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CHATBOX: (onClick, width = 20, height = 19, className) => (
    <Image
      src="/svg/ect/chatbox.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
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
      loading="lazy"
    />
  ),

  MENU: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/menu.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  MORE: (onClick, width = 20, height = 20, className) => (
    <Image
      src="/svg/ect/dots.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  SHARE: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/share.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  USER: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/user.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CAMERA: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/camera.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  FILTER: (onClick, width = 24, height = 24, className) => (
    <Image
      src="/svg/ect/filter.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  DESIGN: (onClick, width = 28, height = 28, className) => (
    <Image
      src="/svg/interests/design.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  TECH: (onClick, width = 28, height = 28, className) => (
    <Image
      src="/svg/interests/tech.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  BUSINESS: (onClick, width = 30, height = 22.5, className) => (
    <Image
      src="/svg/interests/business.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  ECONOMY: (onClick, width = 26, height = 26, className) => (
    <Image
      src="/svg/interests/economy.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  LANGUAGE: (onClick, width = 33, height = 20, className) => (
    <Image
      src="/svg/interests/language.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  CERTIFICATION: (onClick, width = 28, height = 19, className) => (
    <Image
      src="/svg/interests/certification.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  SELFDEVELOP: (onClick, width = 25.2, height = 28, className) => (
    <Image
      src="/svg/interests/selfDevelop.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  MARKETING: (onClick, width = 25.2, height = 28, className) => (
    <Image
      src="/svg/interests/marketing.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  RESET: (onClick, width = 19, height = 19, className) => (
    <Image
      src="/svg/ect/rotate-right.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  WRITE: (onClick, width = 16, height = 16, className) => (
    <Image
      src="/svg/ect/message-edit.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  KAKAO: (onClick, width = 18, height = 17, className) => (
    <Image
      src="/svg/ect/kakao.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
    />
  ),

  RLOGO: (onClick, width = 18, height = 17, className) => (
    <Image
      src="/svg/ect/logo.svg"
      width={width}
      height={height}
      onClick={onClick}
      className={className}
      loading="lazy"
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
