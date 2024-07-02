"use client";
import React from "react";
import RegionItem from "../atoms/RegionItem";

const regions = ["서울", "경기", "인천", "대전", "세종", "충남", "충북"];

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionSelect: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onRegionSelect,
}) => {
  return (
    <ul className="bg-gray-100 ml-4 border-[#E4E4E4] border-r h-full">
      {regions.map((region) => (
        <RegionItem
          key={region}
          selectedRegion={selectedRegion}
          region={region}
          onRegionSelect={() => onRegionSelect(region)}
        />
      ))}
    </ul>
  );
};

export default RegionSelector;
