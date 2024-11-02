import React from "react";
import IconLabelButton from "../IconLabelButton";
import { v4 } from "uuid";

type TSelectedLocations = {
  selectedLocations: Record<string, boolean>;
  deleteLocation: (region: string, location: string) => void;
};

function SelectedLocations(props: TSelectedLocations) {
  const { selectedLocations, deleteLocation } = props;

  return (
    <div className="flex gap-[14px] mt-[26px] h-[35px]">
      {Array.from(Object.keys(selectedLocations)).map((location) => (
        <IconLabelButton
          key={v4()}
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
  );
}

export default SelectedLocations;
