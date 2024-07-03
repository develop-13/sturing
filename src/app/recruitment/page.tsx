import CancelBtn from "@/components/header_metarials/atoms/CancelBtn";
import TemporalSaveBtn from "@/components/header_metarials/atoms/TemporalSaveBtn";
import HeaderForamt from "@/components/organisms/headerForamt";
import React from "react";

function RecruitmentPage() {
  return (
    <div>
      {" "}
      <HeaderForamt
        icons_left={<CancelBtn />}
        icons_right={<TemporalSaveBtn />}
      />
    </div>
  );
}

export default RecruitmentPage;
