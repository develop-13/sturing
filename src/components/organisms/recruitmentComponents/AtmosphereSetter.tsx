import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import { atmosphereData } from "@/db/atmospheres";
import { TAtmosphere } from "@/types/common";
import React from "react";

type TAtmosphereSetter = {
  selectedAtmospheres: TAtmosphere[];
  handleAtmosphere: (selectedAtmosphere: TAtmosphere) => void;
};

function AtmosphereSetter(props: TAtmosphereSetter) {
  const { selectedAtmospheres, handleAtmosphere } = props;

  return (
    <div>
      <Text>스터디 분위기 키워드(선택)</Text>
      <div className="flex gap-2 flex-wrap mt-3">
        {atmosphereData.map((atmosphere) => (
          <IconLabelButton
            key={atmosphere}
            datas={{
              text: atmosphere,
              usage: "listItem",
              isActive: selectedAtmospheres.includes(atmosphere),
              icon: <Icon type={atmosphere} width={16} height={16} />,
              theme: "ordinary",
              extraStyle: "text-xs !p-1",
              onClick: () => {
                handleAtmosphere(atmosphere);
              },
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default AtmosphereSetter;
