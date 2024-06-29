import React from "react";

import SidebarComponent from "@/components/sidebar/Sidebar";

// 사이드바를 라우트로서 구현하는 것이 아닌 컴포넌트로 구현할 경우 사이드바를 열지 말지에 대한
// 상태값이 필요할 것 같다. 상태관리 라이브러리?

function InterceptingSidebar() {
  return (
    <div>
      <SidebarComponent />
    </div>
  );
}

export default InterceptingSidebar;
