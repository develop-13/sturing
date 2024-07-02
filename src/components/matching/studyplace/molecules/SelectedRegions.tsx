"use client";
import React from "react";
import SelectedRegionItem from "../atoms/SelectedRegionItem";

interface SelectedRegionsProps {
  selectedSubRegions: string[];
  onRemoveSubRegion: (subRegion: string) => void;
}

const SelectedRegions: React.FC<SelectedRegionsProps> = ({
  selectedSubRegions,
  onRemoveSubRegion,
}) => {
  return (
    <ul className="mt-4 flex gap-[14px] mx-4">
      {selectedSubRegions.map((subRegion) => (
        <SelectedRegionItem
          key={subRegion}
          subRegion={subRegion}
          onRemoveSubRegion={() => onRemoveSubRegion(subRegion)}
        />
      ))}
    </ul>
  );
};

export default SelectedRegions;
