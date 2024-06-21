"use client";

import { PiDotsThreeOutlineFill } from "react-icons/pi";

function MoreInfo() {
  const onClickMoreInfoBtn = () => {
    console.log("... 클릭시 나타날 페이지를 구현해주세요");
  };

  return (
    <PiDotsThreeOutlineFill
      className="text-iconSize"
      onClick={onClickMoreInfoBtn}
    />
  );
}

export default MoreInfo;
