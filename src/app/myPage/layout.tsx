import ArrowBackBtn from "@/components/header_metarials/ArrowBackBtn";
import BookMarkBtn from "@/components/header_metarials/BookMarkBtn";
import ChatBoxBtn from "@/components/header_metarials/ChatBoxBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <HeaderForamt
        icons_left={<ArrowBackBtn />}
        text_center="마이페이지"
        icons_right={
          <div className="flex gap-3 items-center">
            <ChatBoxBtn />
            <BookMarkBtn />
          </div>
        }
      />
      {children}
    </div>
  );
}

export default MyPageLayout;
