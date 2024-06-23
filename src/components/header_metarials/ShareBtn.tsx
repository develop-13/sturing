"use client";

import { GoShare } from "react-icons/go";
import IconFormat from "./IconFormat";

function ShareBtn() {
  const onClickShareBtn = () => {
    console.log("공유하기 기능을 구현해주세요!");
  };

  return <IconFormat onClick={onClickShareBtn} icon={<GoShare />} />;
}

export default ShareBtn;
