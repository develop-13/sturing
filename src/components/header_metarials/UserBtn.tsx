"use client";
import React from "react";
import IconFormat from "../common/IconFormat";
import { FaRegUser } from "react-icons/fa6";

function UserBtn() {
  const onClickUser = () => {
    // 유저 아이콘 클릭시 마이 페이지로 이동
    console.log("user icon clicked! go to my Page!");
  };
  return <IconFormat icon={<FaRegUser />} onClick={onClickUser} />;
}

export default UserBtn;
