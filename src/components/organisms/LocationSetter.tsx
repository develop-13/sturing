"use client";
import locationData from "@/db/locations";
// 후에 서버통신으로 가져옴
import { useState } from "react";
import LocationTable from "../molecules/locationComponents/LocationTable";
import SelectedLocations from "../molecules/locationComponents/SelectedLocations";

type TLocationSetter = {
  selectedLocations: Record<string, boolean>;
  addLocation: (region: string, location: string) => void;
  deleteLocation: (region: string, location: string) => void;
};

function LocationSetter({
  selectedLocations,
  addLocation,
  deleteLocation,
}: TLocationSetter) {
  const [currentRegion, setCurrentRegion] = useState<string>(
    Object.keys(locationData)[0] // 서울
  );

  const handleSetCurrentRegion = (region: string) => {
    () => setCurrentRegion(region);
  };

  const onSelect = (word: string) => {
    // 지역 클릭
    const [region, location] = word.split(" ");
    if (selectedLocations[region + " " + location]) {
      alert("이미 선택하신 지역입니다");
      return;
    }

    if (Object.keys(selectedLocations).length >= 3) {
      alert("최대 3개까지만 선택 가능합니다.");
      return;
    }

    addLocation(region, location); // state에 지역 추가
  };

  return (
    <div>
      <LocationTable
        currentRegion={currentRegion}
        handleSetCurrentRegion={handleSetCurrentRegion}
        onSelect={onSelect}
        selectedLocations={selectedLocations}
      />
      {/* 선택된 항목 */}
      <SelectedLocations
        deleteLocation={deleteLocation}
        selectedLocations={selectedLocations}
      />
    </div>
  );
}

export default LocationSetter;
