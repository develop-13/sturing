"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "../atoms/Icon";
import { createPortal } from "react-dom";
import Sidebar from "../templates/Sidebar";
import { Session } from "next-auth";

function MenuBtn({ session }: { session?: Session | null }) {
  const [upSidebar, setUpSidebar] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false); // 페이지 준비 상태 관리
  const recommendPageRef = useRef<Element | null>(null); // useRef로 관리
  const sidebarRef = useRef<HTMLDivElement | null>(null); // 모달 Ref

  const openSidebar = () => {
    console.log("sidebar Clicked");
    setUpSidebar(true);
  };

  const closeSidebar = () => {
    setUpSidebar(false);
  };

  useEffect(() => {
    recommendPageRef.current = document.getElementById("recommendPage");

    if (recommendPageRef.current) {
      setIsPageReady(true); // 페이지가 준비되었음을 알림
    }
  }, []);

  return (
    <div>
      <Icon type="MENU" onClick={openSidebar} />
      {isPageReady &&
        recommendPageRef.current && // recommendPage가 준비된 후에만 포털 렌더링
        createPortal(
          <Sidebar
            session={session}
            ref={sidebarRef}
            isSidebarOpen={upSidebar}
            onCloseSidebar={closeSidebar}
          />,
          recommendPageRef.current // useRef로 관리된 recommendPage 참조
        )}
    </div>
  );
}

export default MenuBtn;
