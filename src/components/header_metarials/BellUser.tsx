"use client";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { VscBell } from "react-icons/vsc";

// 벨과 유저 아이콘 묶은 것을 하나의 컴포넌트로 빼놓았습니다.
function BellUser() {
  const onClickBell = () => {
    // 벨 아이콘 클릭시 동작기능
    console.log("bell icon clicked!");
  };

  const onClickUser = () => {
    // 유저 아이콘 클릭시 마이 페이지로 이동
    console.log("user icon clicked! go to my Page!");
  };

  return (
    <div className="flex gap-[12px] items-center">
      <VscBell className="text-iconSize" onClick={onClickBell} />
      <FaRegUser className="text-iconSize" onClick={onClickUser} />
    </div>
  ); // 로그인 되어있을 때는 벨과 유저 아이콘이 보여지도록 함
}

export default BellUser;
