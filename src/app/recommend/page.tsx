import TwoIconsFormat from "@/components/header_metarials/atoms/TwoIconsFormat";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
import React from "react";
import Icon from "@/components/common/atoms/Icon";

function RecommendPage() {
  return (
    <div>
      <HeaderForamt
        icons_left={
          <TwoIconsFormat gap={8}>
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </TwoIconsFormat>
        }
        icons_right={
          <TwoIconsFormat gap={12}>
            <Icon type="USER" />
            <Icon type="BELL" />
          </TwoIconsFormat>
        }
        hasTab={true}
      />
    </div>
  );
}

export default RecommendPage;
