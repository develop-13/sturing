import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LocationTable from "@/components/molecules/locationComponents/LocationTable";
import locationData from "@/db/locations";
import { onlineLocationData } from "@/db/OnlineLocations";
import { TStudyRecruitment } from "@/types/study";

type TLocationShowSetter = {
  type: TStudyRecruitment["type"];
  currentLocation?: string;
  handleSetLocation: (word: string) => void;
};

function LocationShowSetter({
  type,
  currentLocation,
  handleSetLocation,
}: TLocationShowSetter) {
  const [showLocationSetter, setShowLocationSetter] = useState(false);

  const pageRef = useRef<Element | null>(null); // useRef로 관리

  const currentLocationData =
    type === "offline" ? locationData : onlineLocationData;

  // const [currentRegion, setCurrentRegion] = useState<string>(
  //   Object.keys(currentLocationData)[0]
  // );

  // const currentRegion = Object.keys(currentLocationData)[0];

  useEffect(() => {
    pageRef.current = document.getElementById("rootLayout");
    console.log(pageRef.current);
  }, []);

  const handleShowLocationSetter = () => {
    console.log(showLocationSetter);
    console.log(pageRef.current);
    setShowLocationSetter(true);
  };

  // const handleSetCurrentRegion = (region: string) => {
  //   console.log(`region=${region}`);
  //   setCurrentRegion(region);
  // };

  return (
    <div className="flex flex-col gap-2">
      {showLocationSetter &&
        pageRef.current &&
        createPortal(
          <div className="w-[375px] h-full fixed z-9999 flex items-center px-4 bg-black bg-opacity-70 top-0">
            <LocationTable
              locationDatas={currentLocationData}
              onSelect={(word: string) => {
                handleSetLocation(word);
                setShowLocationSetter(false);
              }}
            />
          </div>,
          pageRef.current
        )}

      <div
        onClick={handleShowLocationSetter}
        className=" p-3  w-full rounded-[5px] border border-gray-300 cursor-pointer hover:bg-gray-200"
      >
        {" "}
        {currentLocation ? (
          currentLocation
        ) : (
          <div className="flex items-center gap-1 ">
            <Icon type="LOCATION" />
            <Text size="sm" weight="bold" color="gray-600">
              희망 스터디 위치를 등록해 주세요
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(LocationShowSetter);
