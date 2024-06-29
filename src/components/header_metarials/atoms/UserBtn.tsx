"use client";
import React from "react";
import IconFormat from "../../common/atoms/IconFormat";
import { FaRegUser } from "react-icons/fa6";

function UserBtn() {
  return (
    <IconFormat
      icon={<FaRegUser />}
      onClick={() => {
        // 유저 아이콘 클릭시 마이 페이지로 이동
        console.log("user icon clicked! go to my Page!");
      }}
    />
  );
}

export default UserBtn;
