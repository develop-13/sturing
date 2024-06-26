import React from "react";

import SidebarComponent from "@/components/sidebar/Sidebar";

function InterceptingSidebar() {
  console.log("InterceptingSidebar");
  return (
    <div>
      <SidebarComponent />
    </div>
  );
}

export default InterceptingSidebar;
