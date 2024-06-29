"use client";

import { PiDotsThreeOutlineFill } from "react-icons/pi";
import IconFormat from "../../common/atoms/IconFormat";

function MoreInfo() {
  return (
    <IconFormat
      size={20}
      onClick={() => {
        console.log("... 클릭시 나타날 페이지를 구현해주세요");
      }}
      icon={<PiDotsThreeOutlineFill />}
    />
  );
}

export default MoreInfo;
