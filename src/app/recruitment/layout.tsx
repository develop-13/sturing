import TemporalSaveBtn from "@/components/header_metarials/TemporalSaveBtn";
import CancelBtn from "@/components/header_metarials/cancelBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function RecruitmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderForamt
        icons_left={<CancelBtn />}
        icons_right={<TemporalSaveBtn />}
      />
      {children}
    </div>
  );
}

export default RecruitmentLayout;
