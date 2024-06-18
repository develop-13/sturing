"use client";
// 클라이언트 컴포넌트로 두어서 url값에 접근할 수 있도록 함
import Icon_Logo from "@/svg/Icon-logo";
import React from "react";
import { SlMenu } from "react-icons/sl";
import Rounded_Button from "./Button";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { VscBell } from "react-icons/vsc";
import { FaRegUser } from "react-icons/fa6";
import Nav from "./Nav";

let isLoggedin = false; // 임의로 지정

function HeaderSection() {
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
      <div>
        <header className="w-full p-[15px]  flex justify-between items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
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
        </header>
        <Nav curPageName={pageName} />
      </div>
    );
  } else {
    return (
      <header className="w-full p-[15px]  flex gap-[11px] items-center  max-w-[375px] max-h-[54px]">
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
      </header>
    );
  }
}

export default HeaderSection;
