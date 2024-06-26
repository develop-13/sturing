"use client";
import React from "react";
import { CiBookmark } from "react-icons/ci";
import IconFormat from "../common/IconFormat";

function BookMarkBtn() {
  const onClickChatBoxBtn = () => {
    console.log("관심 목록이동 구현해주세요");
  };
  return <IconFormat icon={<CiBookmark />} onClick={onClickChatBoxBtn} />;
}

export default BookMarkBtn;
