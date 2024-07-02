import Icon from "@/components/common/atoms/Icon";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
import React from "react";

function MemberFeedbackPage() {
  return (
    <div>
      <div>
        <HeaderForamt
          icons_left={<Icon type="BACK" />}
          text_center="팀원 후기 남기기"
        />
      </div>
    </div>
  );
}

export default MemberFeedbackPage;
