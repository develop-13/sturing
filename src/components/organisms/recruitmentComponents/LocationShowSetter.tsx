import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import LocationSetter from "../LocationSetter";

function LocationShowSetter() {
  const [showLocationSetter, setShowLocationSetter] = useState(false);

  const handleShowLocationSetter = () => {
    setShowLocationSetter(!showLocationSetter);
  };

  return (
    <div className="flex flex-col gap-2">
      {showLocationSetter && createPortal(<LocationSetter />, document.body)}

      <div
        className="flex items-center p-3 gap-1 w-full rounded-[5px] border border-gray-300 cursor-pointer hover:bg-gray-200"
        onClick={handleShowLocationSetter}
      >
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
      </Button>
    </div>
  );
}

export default LocationShowSetter;
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
