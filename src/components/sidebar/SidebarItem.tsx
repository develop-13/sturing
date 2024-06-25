"use client";

import Link from "next/link";
import { SlArrowDown } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";

import IconFormat from "../header_metarials/IconFormat";

type TProps = {
  fontWeight?: number;
  text: string;
  textColor?: string;
  data?: string[] | { id: number; title: string }[];
  lineHeight?: number;
};

function SidebarItem(props: TProps) {
  const { text, textColor, data, fontWeight, lineHeight } = props;
  const effectiveWeight = fontWeight || 600;
  const effectiveHeight = lineHeight || 24;
  return (
    <Link
      href={"#"}
      className={` cursor-pointer flex justify-between items-center`}
    >
      <h1
        className={`font-[${effectiveWeight}] text-[18px] leading-[${effectiveHeight}px] tracking-[-3%] ${
          textColor ? `text-[${textColor}]` : "text-gray-1000"
        }`}
      >
        {text}
      </h1>

      {data ? (
        <div
          onClick={() => {
            console.log("데이터 보여주기 기능? 왜 클릭하면 내려가지?");
          }}
        >
          <IconFormat icon={<IoIosArrowDown />} />
        </div>
      ) : null}
    </Link>
  );
}

export default SidebarItem;
