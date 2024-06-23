import TemporalSaveBtn from "@/components/header_metarials/TemporalSaveBtn";
import CancelBtn from "@/components/header_metarials/CancelBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function ApplicationPage() {
  return (
    <div>
      <HeaderForamt
        icons_left={<CancelBtn />}
        icons_right={<TemporalSaveBtn />}
      />
    </div>
  );
}

export default ApplicationPage;
