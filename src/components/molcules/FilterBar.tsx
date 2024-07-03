"use client";
import Icon from "@/components/atoms/Icon";
import FilterItem from "../atoms/FilterItem";

const dummyFilters = ["분야", "지역", "인원", "기간", "직업", "역할"];

// useRef로 드래그시 나머지 아이템 보기 구현하기

function FilterBar() {
  return (
    <ul className="relative flex gap-[6px] text-[14px] m-4 overflow-hidden cursor-grab scrollbar-hide">
      {dummyFilters.map((filter) => (
        <FilterItem key={filter} filterName={filter} />
      ))}
      <div className="absolute right-0 top-0 h-full bg-white z-[99999px] flex items-center">
        <Icon type="FILTER" />
      </div>
    </ul>
  );
}

export default FilterBar;
