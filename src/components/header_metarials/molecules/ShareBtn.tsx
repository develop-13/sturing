"use client";

import { GoShare } from "react-icons/go";
import IconFormat from "../../common/atoms/IconFormat";

function ShareBtn() {
  return (
    <IconFormat
      onClick={() => {
        console.log("공유하기 기능을 구현해주세요!");
      }}
      icon={<GoShare />}
    />
  );
}

export default ShareBtn;
