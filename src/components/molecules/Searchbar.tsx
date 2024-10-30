"use client";
import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import { useState } from "react";
import Suggestions from "../organisms/Suggestions";

type TSearchbar = {
  placeholder?: string;
  usage: "header" | "main";
  value?: string;
  className?: string;
};

function Searchbar({ placeholder, usage, className, value = "" }: TSearchbar) {
  const [query, setQuery] = useState(value);
  // state값을 자체적으로 갖게끔 함

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  const router = useRouter();
  let searchbarSize = "";
  let searchIconColor = "";
  switch (usage) {
    case "header":
      searchbarSize = "px-[16px] h-[36px]";
      searchIconColor = "text-gray-800";
      break;
    case "main":
      searchbarSize = "px-[20px] h-[48px]";
      searchIconColor = "text-mainColor";
      break;
  }

  return (
    <div
      className={
        "w-full flex items-center gap-[10px] bg-main-100 rounded-full " +
        searchbarSize +
        " " +
        className
      }
    >
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 border-none outline-none bg-transparent text-[14px] text-gray-1000 font-bold placeholder:text-gray-700"
        value={query}
        onChange={onChangeQuery}
      />
      <Icon
        type="SEARCH"
        onClick={() => router.push(`/search/result?query=${query}`)}
      />
    </div>
  );
}

export default Searchbar;
