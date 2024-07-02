"use client";

import CheckedBtn from "../../common/CheckedBtn";
import SubRegionItem from "../atoms/SubRegionItem";

const subRegions: Record<string, string[]> = {
  서울: ["강남구", "강동구", "강북구", "강서구"],
  경기: ["수원시", "고양시", "용인시", "성남시"],
  인천: ["중구", "동구", "미추홀구", "연수구"],
  대전: ["동구", "중구", "서구", "유성구"],
  세종: ["세종시"],
  충남: ["천안시", "아산시", "서산시", "논산시"],
  충북: ["청주시", "충주시", "제천시", "단양군"],
};

interface LocationSelectorProps {
  selectedRegion: string;
  onSelectSubRegion: (subRegion: string) => void;
  isSelectedSubRegion: (subRegion: string) => boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedRegion,
  onSelectSubRegion,
  isSelectedSubRegion,
}) => {
  return (
    <ul className="bg-white mr-4 h-full overflow-y-auto">
      <li
        key={"total"}
        className="mx-[10px] py-[14px] cursor-pointer text-[#676767] font-bold text-[14px] border-b border-[#E4E4E4]"
      >
        전체
      </li>
      {subRegions[selectedRegion].map((subRegion) => (
        <SubRegionItem
          key={subRegion}
          subRegion={subRegion}
          onSelectSubRegion={() => {
            onSelectSubRegion(subRegion);
          }}
          isSelectedSubRegion={isSelectedSubRegion(subRegion)}
        />
      ))}
    </ul>
  );
};

export default LocationSelector;
