"use client";

import { PiDotsThreeOutlineFill } from "react-icons/pi";
import IconFormat from "../common/IconFormat";

function MoreInfo() {
  const onClickMoreInfoBtn = () => {
    console.log("... 클릭시 나타날 페이지를 구현해주세요");
  };

  return (
    <IconFormat
      size={20}
      onClick={onClickMoreInfoBtn}
      icon={<PiDotsThreeOutlineFill />}
    />
  );
}

export default MoreInfo;
