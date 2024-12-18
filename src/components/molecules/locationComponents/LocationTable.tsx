import React, { useState } from "react";
import Button from "../Button";
import Text from "@/components/atoms/Text";
import { CheckBarButton } from "../IconLabelButton";
import { v4 } from "uuid";
import { TLocation } from "@/types/common";
type TLocationTable = {
  locationDatas: TLocation;
  selectedLocations?: Record<string, boolean>;
  // currentRegion: string;
  // handleSetCurrentRegion: (region: string) => void;
  onSelect: (word: string) => void;
};

function LocationTable(props: TLocationTable) {
  const { onSelect, selectedLocations, locationDatas } = props;

  const [currentRegion, setCurrentRegion] = useState(
    Object.keys(locationDatas)[0]
  );

  const handleSetCurrentRegion = (region: string) => {
    console.log(`region=${region}`);
    setCurrentRegion(region);
  };

  return (
    <div className="w-full">
      <article className="h-[333px] overflow-y-scroll mx-[-16px] border-t border-gray-300">
        <div className="flex">
          <div className="w-[133px] pl-[16px] bg-gray-200 ">
            {/* 주요도시 및 도 */}
            {Object.keys(locationDatas).map((region) => (
              <Button
                theme="transparent"
                extraCss={
                  region === currentRegion
                    ? "h-[50px] !bg-mainColor "
                    : "h-[50px] "
                }
                onClick={() => handleSetCurrentRegion(region)}
                key={v4()}
              >
                <Text
                  size="sm"
                  weight="bold"
                  color={region === currentRegion ? "white" : "gray-600"}
                >
                  {region}
                </Text>
              </Button>
            ))}
          </div>
          <div className="flex-grow bg-white">
            {/* 해당 도의 지역구들 */}
            {locationDatas[currentRegion].map((location) => (
              <CheckBarButton
                type="checkOnClick"
                isActive={Boolean(
                  selectedLocations?.[currentRegion + " " + location]
                )}
                onClick={() => {
                  let fullName = currentRegion + " " + location;
                  onSelect(fullName);
                }}
                key={v4()}
              >
                <Text
                  size="sm"
                  weight="bold"
                  color={
                    selectedLocations?.[currentRegion + " " + location]
                      ? "main"
                      : "gray-1000"
                  }
                >
                  {location}
                </Text>
              </CheckBarButton>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export default LocationTable;
