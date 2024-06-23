import CancelBtn from "@/components/header_metarials/CancelBtn";
import TemporalSaveBtn from "@/components/header_metarials/TemporalSaveBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
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
