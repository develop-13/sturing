"use client";
import React, { useState } from "react";
import RegionSelector from "../molecules/RegionSelector";
import LocationSelector from "../molecules/LocationSelector";
import SelectedRegions from "../molecules/SelectedRegions";

const LocationPicker: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("서울");
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>("");
  const [selectedSubRegions, setSelectedSubRegions] = useState<string[]>([]);

  const handleSelectSubRegion = (subRegion: string) => {
    if (!selectedSubRegions.includes(subRegion)) {
      setSelectedSubRegions([...selectedSubRegions, subRegion]);
    }
  };

  const handleRemoveSubRegion = (subRegion: string) => {
    setSelectedSubRegions(
      selectedSubRegions.filter((region) => region !== subRegion)
    );
  };

  const isSelectedSubRegion = (subRegion: string) => {
    return selectedSubRegions.includes(subRegion);
  };

  return (
    <div className="max-w-[375px] h-[333px] overflow-scroll  border-[#E4E4E4] border-t">
      <div className="grid grid-cols-[133px_1fr]">
        <RegionSelector
          selectedRegion={selectedRegion}
          onRegionSelect={setSelectedRegion}
        />
        <LocationSelector
          selectedRegion={selectedRegion}
          onSelectSubRegion={handleSelectSubRegion}
          isSelectedSubRegion={isSelectedSubRegion}
        />
      </div>
      <SelectedRegions
        selectedSubRegions={selectedSubRegions}
        onRemoveSubRegion={handleRemoveSubRegion}
      />
    </div>
  );
};

export default LocationPicker;
