"use client";
// 클라이언트 컴포넌트로 두어서 url값에 접근할 수 있도록 함

import Icon_Logo from "@/svg/Icon-logo";
import Link from "next/link";
import React from "react";
import { SlMenu } from "react-icons/sl";
import Rounded_Button from "./Button";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa6";

let isLoggedin = false; // 임의로 지정

function Header() {
  // url에 따라 형태를 달리함
  const [empty, pageName, searchingWord] = usePathname().split("/");

  let hasLogo = ["recommendation", "myStudy", "search"].includes(pageName)
    ? true
    : false;

  if (pageName == "search" && searchingWord) {
    hasLogo = false;
  }

  if (hasLogo) {
    return (
      <header>
        <div className="w-full p-[15px]  flex justify-between items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
          <div className="flex gap-[8px] items-center">
            <SlMenu className="text-iconSize" />
            <Icon_Logo />
          </div>
          {isLoggedin ? (
            <div className="flex gap-[12px] items-center">
              <VscBell className="text-iconSize" />
              <FaRegUser className="text-iconSize" />
            </div>
          ) : (
            <Rounded_Button className="w-[71px] h-[34px]  border-blue-500">
              <p className=" text-blue-500 font-medium text-[12px] leading-[18px] tracking-[-3%]	">
                간편로그인
              </p>
            </Rounded_Button>
          )}
        </div>
        <div className="flex px-[16px] h-[48px] w-full border-b border-[##E4E4E4]">
          <Link
            className={`flex-1 flex items-center justify-center ${
              pageName === "recommendation" ? "text-gray-1000" : "text-gray-700"
            }`}
            href={"/recommendation"}
          >
            추천
          </Link>
          <Link
            className={`flex-1 flex items-center justify-center ${
              pageName === "search" ? "text-gray-1000" : "text-gray-700"
            }`}
            href={"/search"}
          >
            검색
          </Link>
          <Link
            className={`flex-1 flex items-center justify-center ${
              pageName === "myStudy" ? "text-gray-1000" : "text-gray-700"
            }`}
            href={"/myStudy"}
          >
            내 스터디
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <div className="w-full p-[15px]  flex gap-[11px] items-center  max-w-[375px] max-h-[54px]">
        <IoIosArrowBack className="text-iconSize" />
        {searchingWord && (
          <div className="w-full py-[7px] px-[16px] max-w-[311px] max-h-[36px] bg-[#ECF1FF] flex gap-[10px] items-center rounded-full">
            <input
              type="text"
              className="w-full bg-inherit text-[14px] tracking-[-3%] leading-[22px] font-semibold "
            />
            <IoSearchOutline className="text-iconSize" />
          </div>
        )}
      </div>
    );
  }
}

export default Header;
