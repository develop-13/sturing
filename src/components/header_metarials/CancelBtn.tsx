"use client";
import React from "react";

function CancelBtn() {
  const onClickCancelBtn = () => {
    console.log("취소기능을 구현해주세요");
  };
  return (
    <span
      className="font-normal text-[14px] leading-[22px] tracking-[-3%] text-[#909090]"
      onClick={onClickCancelBtn}
    >
      취소
    </span>
  );
}

export default CancelBtn;
