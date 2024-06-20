import ArrowBackBtn from "@/components/header_metarials/ArrowBackBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function MatchingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderForamt icons_left={<ArrowBackBtn />} />
      {children}
    </div>
  );
}

export default MatchingLayout;
