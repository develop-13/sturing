"use client";
import React from "react";
import { VscBell } from "react-icons/vsc";
import IconFormat from "../common/IconFormat";

function BellBtn() {
  const onClickBell = () => {
    // 벨 아이콘 클릭시 동작기능
    console.log("bell icon clicked!");
  };

  return <IconFormat onClick={onClickBell} icon={<VscBell />} />; // 로그인 되어있을 때는 벨과 유저 아이콘이 보여지도록 함
}

export default BellBtn;
