"use client";
import Image from "next/image";
import React from "react";
import CheckBoxIcon from "@/public/svg/tick-square.svg";
import CheckboxItem from "../atoms/CheckboxItem";

const dummyFilters = ["분야", "지역", "인원", "기간", "직업", "역할"];

const dummyItems = [
  { name: "디자인", num: 41 },
  { name: "개발.태크", num: 22 },
  { name: "마케팅", num: 22 },
  { name: "비즈니스", num: 22 },
  { name: "경제", num: 22 },
  { name: "외국어", num: 22 },
  { name: "자격증", num: 22 },
  { name: "자기개발", num: 22 },
];

function FilterModal() {
  return (
    <div>
      <h1 className="font-semibold text-[18px] leading-[27px] mx-[15px] my-5">
        필터
      </h1>
      <ul className="px-4 py-2 border-b border-[#E4E4E4] flex gap-6 text-base font-semibold text-gray-700">
        {dummyFilters.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      <ul className="mx-4 my-8 flex flex-col gap-[21px]">
        {dummyItems.map((it) => (
          <CheckboxItem key={it.name} name={it.name} num={it.num} />
        ))}
      </ul>
    </div>
  );
}

export default FilterModal;
