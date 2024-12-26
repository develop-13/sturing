"use client";
import { useRouter } from "next/navigation";
import Icon from "../atoms/Icon";
import { useState } from "react";

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

  const onClickSearchIcon = () => {
    // 기존 검색어 목록을 가져오기 (로컬 스토리지에서)
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    // 중복 검색어 제거
    const filteredSearches = storedSearches.filter(
      (item: string) => item !== query
    );
    // 최신 검색어를 맨 앞에 추가하고 최대 5개만 유지
    const updatedSearches = [query, ...filteredSearches].slice(0, 5);
    // 로컬 스토리지에 업데이트된 검색어 목록 저장
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    // 검색 결과 페이지로 이동
    router.push(`/search/result?query=${query}`);
  };

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
      <Icon type="SEARCH" onClick={onClickSearchIcon} />
    </div>
  );
}

export default Searchbar;
