"use client";

import CheckedBtn from "./CheckedBtn";

function SubRegionItem({
  subRegion,
  onSelectSubRegion,
  isSelectedSubRegion,
}: {
  subRegion: string;
  onSelectSubRegion: () => void;
  isSelectedSubRegion: boolean;
}) {
  return (
    <li
      key={subRegion}
      className={`mx-[10px] py-[14px] cursor-pointer font-bold text-[#676767] text-[14px] border-[#E4E4E4] border-b flex justify-between bg-[#ECF1FF]`}
      style={{
        backgroundColor: `${isSelectedSubRegion ? "#ECF1FF" : "white"}`,
      }}
      onClick={onSelectSubRegion}
    >
      <span>{subRegion}</span>
      {isSelectedSubRegion ? <CheckedBtn color="#4171FF" /> : null}
    </li>
  );
}

export default SubRegionItem;
