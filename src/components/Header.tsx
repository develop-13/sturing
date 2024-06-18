import Icon_Logo from "@/svg/Icon-logo";
import Link from "next/link";
import React from "react";
import { SlMenu } from "react-icons/sl";
import Rounded_Button from "./Button";

function Header() {
  return (
    <div>
      <div className="flex items-center w-auto h-[54px] mx-6">
        <SlMenu className="text-[32px] pr-3" />
        <Icon_Logo />
        <div className="ml-auto">
          <Rounded_Button className="w-[71px] h-[34px] border-blue-500">
            <p className="text-[10px] text-blue-500">간편로그인</p>
          </Rounded_Button>
        </div>
      </div>
      <div className="flex w-full text-center px-4 justify-between border-y border-borderColor1 text-textColor1 font-semibold">
        <Link className="py-4 flex-1 " href="/recommend">
          추천
        </Link>
        <Link className="py-4 flex-1" href="/search">
          검색
        </Link>
        <Link className="py-4 flex-1" href="/myStudy">
          내 스터디
        </Link>
      </div>
    </div>
  );
}

export default Header;
