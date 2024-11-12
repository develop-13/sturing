import Divider from "@/components/atoms/Divider";
import Text from "@/components/atoms/Text";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import React from "react";

function Team() {
  return (
    <div>
      <InfoBox theme="white">
        <Text size="lg" weight="bold">
          팀원별 진척도
        </Text>
        <Divider type="row" />
      </InfoBox>
    </div>
  );
}

export default Team;
