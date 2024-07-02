"use client";
import React from "react";
import { VscBell } from "react-icons/vsc";
import IconFormat from "../../common/atoms/IconFormat";

function BellBtn() {
  return (
    <IconFormat
      onClick={() => {
        console.log("bell icon clicked!");
      }}
      icon={<VscBell />}
    />
  ); // 로그인 되어있을 때는 벨과 유저 아이콘이 보여지도록 함
}

export default BellBtn;
