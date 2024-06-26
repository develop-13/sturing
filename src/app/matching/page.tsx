"use client";

import ArrowBackBtn from "@/components/header_metarials/ArrowBackBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React, { useState } from "react";

function MatchingPage() {
  const [state, setState] = useState(0);

  return (
    <div>
      {" "}
      <HeaderForamt icons_left={<ArrowBackBtn />} />
      <div>{state}</div>
    </div>
  );
}

export default MatchingPage;
