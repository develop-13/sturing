import CancelBtn from "@/components/header_metarials/molecules/CancelBtn";
import TemporalSaveBtn from "@/components/header_metarials/molecules/TemporalSaveBtn";
import HeaderForamt from "@/components/header_metarials/organisms/headerForamt";
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
