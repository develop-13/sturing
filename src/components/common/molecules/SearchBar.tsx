"use client";

import SearchIcon from "../atoms/SearchIcon";

type TProps = {
  placeholder?: string;
  px: number;
  py: number;
};

function SearchBar(props: TProps) {
  const { placeholder, px, py } = props;

  return (
    <div
      className={`flex gap-[10px] bg-[#ECF1FF] rounded-full`}
      style={{ padding: `${py}px ${px}px` }}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-inherit text-[14px] outline-none placeholder-[#676767] tracking-[-3%] leading-[22px] font-semibold "
      />
      <SearchIcon />
    </div>
  );
}

export default SearchBar;
