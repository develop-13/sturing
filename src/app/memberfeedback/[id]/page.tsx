import ArrowBackBtn from "@/components/common/ArrowBackBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function MemberFeedbackPage() {
  return (
    <div>
      <div>
        <HeaderForamt
          icons_left={<ArrowBackBtn />}
          text_center="팀원 후기 남기기"
        />
      </div>
    </div>
  );
}

export default MemberFeedbackPage;
