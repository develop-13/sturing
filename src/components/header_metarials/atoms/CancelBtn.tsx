"use client";
import React from "react";

function CancelBtn() {
  return (
    <span
      className="font-normal text-[14px] leading-[22px] tracking-[-3%] text-[#909090]"
      onClick={() => {
        console.log("취소기능을 구현해주세요");
      }}
    >
      취소
    </span>
  );
}

export default CancelBtn;
