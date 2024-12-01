import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LocationTable from "@/components/molecules/locationComponents/LocationTable";
import locationData from "@/db/locations";

type TLocationShowSetter = {
  currentLocation?: string;
  handleSetLocation: (word: string) => void;
};

function LocationShowSetter({
  currentLocation,
  handleSetLocation,
}: TLocationShowSetter) {
  const [showLocationSetter, setShowLocationSetter] = useState(false);

  const recruitmentPageRef = useRef<Element | null>(null); // useRef로 관리

  const [currentRegion, setCurrentRegion] = useState<string>(
    Object.keys(locationData)[0]
  );

  useEffect(() => {
    recruitmentPageRef.current = document.getElementById("recruitmentPage");
    console.log(recruitmentPageRef.current);
  }, []);

  const handleShowLocationSetter = () => {
    console.log(showLocationSetter);
    console.log(recruitmentPageRef.current);
    setShowLocationSetter(true);
  };

  const handleSetCurrentRegion = (region: string) => {
    setCurrentRegion(region);
  };

  return (
    <div className="flex flex-col gap-2">
      {showLocationSetter &&
        recruitmentPageRef.current &&
        createPortal(
          <div className="w-full h-full fixed z-9999 flex items-center ml-[-16px] bg-black bg-opacity-70 top-0">
            <LocationTable
              currentRegion={currentRegion}
              handleSetCurrentRegion={handleSetCurrentRegion}
              onSelect={(word: string) => {
                handleSetLocation(word);
                setShowLocationSetter(false);
              }}
            />
          </div>,
          recruitmentPageRef.current
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
      {/* <Button theme="ordinary" shape="border-dot">
        <Icon type="ADD" />
        <Text size="sm" weight="bold" color="gray-600">
          추가하기
        </Text>
      </Button> */}
    </div>
  );
}

export default React.memo(LocationShowSetter);
{
  /* <div className="flex items-center p-3 gap-1 w-full rounded-[5px] border border-gray-300">
          <Icon type="LOCATION" />
          <Text size="sm" weight="bold" color="gray-600">
            희망 스터디 위치를 등록해 주세요
          </Text>
        </div>
        <Button theme="ordinary" shape="border-dot">
          <Icon type="ADD" />
          <Text size="sm" weight="bold" color="gray-600">
            추가하기
          </Text>
        </Button> */
}
