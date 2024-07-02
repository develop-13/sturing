"use client";
import IconFormat from "@/components/common/atoms/IconFormat";
import { IoCheckmark } from "react-icons/io5";

function CheckedBtn({ color }: { color: string }) {
  return (
    <IconFormat
      icon={<IoCheckmark className="text-gray-400" />}
      color={color}
      onClick={() => {
        console.log("체크 기능");
      }}
    />
  );
}

export default CheckedBtn;
