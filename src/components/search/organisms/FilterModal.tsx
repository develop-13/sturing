import React from "react";

const dummyFilters = ["분야", "지역", "인원", "기간", "직업", "역할"];

const dummyItems = [
  "디자인",
  "개발.테크",
  "마케팅",
  "비즈니스",
  "경제",
  "외국어",
  "자격증",
  "자기개발",
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
      <ul className="mx-4 my-8">
        {dummyItems.map((it) => (
          <li key={it}>
            <input type="checkbox" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterModal;
