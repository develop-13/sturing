import Link from "next/link";
import React from "react";

const pageNames = [
  ["recommendation", "추천"],
  ["search", "검색"],
  ["myStudy", "내 스터디"],
];

function Nav({ curPageName }: { curPageName: string }) {
  return (
    <div className="flex px-[16px] h-[48px] max-w-[375px] border-b border-[##E4E4E4]">
      {pageNames.map((pageName, idx) => (
        <Link
          href={`/${pageName[0]}`}
          key={idx}
          className={`cursor-pointer flex-1 flex items-center justify-center ${
            pageName[0] === curPageName ? "text-gray-1000" : "text-gray-700"
          }`}
        >
          {pageName[1]}
        </Link>
      ))}
    </div>
  );
}

export default Nav;
