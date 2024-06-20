"use client";
import React from "react";
import { CiBookmark } from "react-icons/ci";

function BookMarkBtn() {
  const onClickChatBoxBtn = () => {
    console.log("관심 목록이동 구현해주세요");
  };
  return <CiBookmark className="text-iconSize" onClick={onClickChatBoxBtn} />;
}

export default BookMarkBtn;
