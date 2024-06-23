"use client";
import React from "react";
import { VscBell } from "react-icons/vsc";
import IconFormat from "./IconFormat";

// 벨과 유저 아이콘 묶은 것을 하나의 컴포넌트로 빼놓았습니다.
function BellBtn() {
  const onClickBell = () => {
    // 벨 아이콘 클릭시 동작기능
    console.log("bell icon clicked!");
  };

  return <IconFormat onClick={onClickBell} icon={<VscBell />} />; // 로그인 되어있을 때는 벨과 유저 아이콘이 보여지도록 함
}

export default BellBtn;
