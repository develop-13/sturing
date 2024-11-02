import React from "react";
import Button from "../Button";
import Text from "@/components/atoms/Text";
import { CheckBarButton } from "../IconLabelButton";
import { v4 } from "uuid";
import locationData from "@/db/locations";

type TLocationTable = {
  selectedLocations?: Record<string, boolean>;
  currentRegion: string;
  handleSetCurrentRegion: (region: string) => void;
  onSelect: (word: string) => void;
};

function LocationTable(props: TLocationTable) {
  const { currentRegion, handleSetCurrentRegion, onSelect, selectedLocations } =
    props;

  return (
    <div className="w-full">
      {" "}
      <article className="h-[333px] overflow-y-scroll mx-[-16px] border-t border-gray-300">
        <div className="flex">
          <div className="w-[133px] pl-[16px] bg-gray-200 ">
            {/* 주요도시 및 도 */}
            {Object.keys(locationData).map((region) => (
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
            {locationData[currentRegion].map((location) => (
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
      </article>{" "}
    </div>
  );
}

export default LocationTable;
