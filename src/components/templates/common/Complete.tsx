import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import React from "react";

type TComplete = {
  mainText: string;
  subText: string;
};

function Complete(props: TComplete) {
  const { mainText, subText } = props;

  return (
    <div className="w-full h-screen bg-white absolute left-0 top-0 flex items-center justify-center ">
      <div className="flex flex-col gap-4 items-center justify-center">
        <Icon type="COMPLETE" width={62} height={62} />
        <Text size="lg" weight="bold">
          {mainText}
        </Text>
        <div className="w-[80%] text-center">
          <Text>{subText}</Text>
        </div>
      </div>
    </div>
  );
}

export default Complete;
