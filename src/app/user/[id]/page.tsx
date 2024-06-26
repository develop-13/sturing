import ArrowBackBtn from "@/components/common/ArrowBackBtn";
import BookMarkBtn from "@/components/header_metarials/BookMarkBtn";
import ChatBoxBtn from "@/components/header_metarials/ChatBoxBtn";
import HeaderForamt from "@/components/header_metarials/headerForamt";
import React from "react";

function UserPage() {
  return (
    <div>
      <HeaderForamt
        icons_left={<ArrowBackBtn />}
        icons_right={
          <div className="flex gap-3 items-center">
            <ChatBoxBtn /> <BookMarkBtn />
          </div>
        }
      />
    </div>
  );
}

export default UserPage;
