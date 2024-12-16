"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../atoms/Icon";
import { createPortal } from "react-dom";
import Sidebar from "../templates/common/Sidebar";
import { Session } from "next-auth";

function MenuBtn({ session }: { session?: Session | null }) {
  const [upSidebar, setUpSidebar] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false); // 페이지 준비 상태 관리
  const rootLayout = useRef<Element | null>(null); // useRef로 관리
  const sidebarRef = useRef<HTMLDivElement | null>(null); // 모달 Ref

  const openSidebar = () => {
    setUpSidebar(true);
  };

  const closeSidebar = () => {
    setUpSidebar(false);
  };

  useEffect(() => {
    rootLayout.current = document.getElementById("rootLayout");
    if (rootLayout.current) {
      setIsPageReady(true); // 페이지가 준비되었음을 알림
    }
  }, []);

  return (
    <div>
      <Icon type="MENU" onClick={openSidebar} />
      {isPageReady &&
        rootLayout.current &&
        createPortal(
          <Sidebar
            session={session}
            ref={sidebarRef}
            isSidebarOpen={upSidebar}
            onCloseSidebar={closeSidebar}
          />,
          rootLayout.current // useRef로 관리된 최상단page 참조
        )}
    </div>
  );
}

export default MenuBtn;
