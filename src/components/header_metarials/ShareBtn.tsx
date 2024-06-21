"use client";

import { GoShare } from "react-icons/go";

function ShareBtn() {
  const onClickShareBtn = () => {
    console.log("공유하기 기능을 구현해주세요!");
  };

  return <GoShare className="text-iconSize" onClick={onClickShareBtn} />;
}

export default ShareBtn;
