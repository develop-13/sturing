"use client";
import locationData from "@/db/locations";
// 후에 서버통신으로 가져옴
import { useEffect, useState } from "react";
import Searchbar from "../molecules/Searchbar";
import Suggestions from "./Suggestions";
import Button from "../molecules/Button";
import { v4 as uuidv4 } from "uuid";
import Text from "../atoms/Text";
import IconLabelButton, { CheckBarButton } from "../molecules/IconLabelButton";

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

  const onSelect = (word: string) => {
    // 지역 클릭
    console.log("onSelect occurred");
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
    // <section className="flex flex-col py-[20px]">
    <div>
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
                onClick={() => setCurrentRegion(region)}
                key={uuidv4()}
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
          <div className="flex-grow">
            {/* 해당 도의 지역구들 */}
            {locationData[currentRegion].map((location) => (
              <CheckBarButton
                type="checkOnClick"
                isActive={Boolean(
                  selectedLocations[currentRegion + " " + location]
                )}
                onClick={() => {
                  let fullName = currentRegion + " " + location;
                  onSelect(fullName);
                }}
                key={uuidv4()}
              >
                <Text
                  size="sm"
                  weight="bold"
                  color={
                    selectedLocations[currentRegion + " " + location]
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
      {/* 선택된 항목 */}
      <div className="flex gap-[14px] mt-[26px] h-[35px]">
        {Array.from(Object.keys(selectedLocations)).map((location) => (
          <IconLabelButton
            key={uuidv4()}
            datas={{
              onClick: () => {
                deleteLocation(location.split(" ")[0], location.split(" ")[1]);
              },
              text: location.split(" ")[1],
              usage: "close",
              extraStyle:
                "px-[14px] py-[9px] bg-main-100 text-mainColor rounded-[8px] border border-mainColor",
            }}
          />
        ))}
      </div>
    </div>
    // </section>
  );
}

export default LocationSetter;
