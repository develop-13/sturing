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

let isLoggedin = false; // 임의로 지정. 여기서 로그인에 대한 정보를 가져오는 함수가 필요함

const hasLogoPages = ["recommendation", "myStudy", "search"];
// 로고가 보여지는 페이지.

function HeaderSection() {
  // url에 따라 형태를 달리함
  const [empty, pageName, searchingWord] = usePathname().split("/");

  let hasLogo = hasLogoPages.includes(pageName) ? true : false;

  if (pageName == "search" && searchingWord) {
    hasLogo = false;
  } // 검색페이지인데, 검색창에 단어를 검색하는 경우에는 로고가 보여지지 않는다.

  if (hasLogo) {
    // 로고가 보여지게끔 스타일링
    return (
      <div>
        <header className="w-full p-[15px]  flex justify-between items-center max-w-[375px] max-h-[54px] border-b border-[##E4E4E4]">
          <div className="flex gap-[8px] items-center">
            <SlMenu className="text-iconSize" />
            <Icon_Logo />
          </div>
          {isLoggedin ? ( // 로그인 여부에 따라 헤더 오른쪽 보여지는 아이콘이 달라지게 함, 추후 컴포넌트로 분리 예정
            <div className="flex gap-[12px] items-center">
              <VscBell className="text-iconSize" />
              <FaRegUser className="text-iconSize" />
            </div> // 로그인 되어있을 때는 벨과 유저 아이콘이 보여지도록 함
          ) : (
            // 로그인 되어있을 때는 간편 로그인 버튼이 보여지도록 함
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
      // 로고가 안보여지게끔 스타일링
      <header className="w-full p-[15px]  flex gap-[11px] items-center  max-w-[375px] max-h-[54px]">
        <IoIosArrowBack className="text-iconSize" />
        {searchingWord && ( // 검색중이면 검색창이 보여지게끔 함
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
