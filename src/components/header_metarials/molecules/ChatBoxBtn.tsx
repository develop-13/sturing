"use client";
import React from "react";
import { BsChatSquareDots } from "react-icons/bs";
import IconFormat from "../../common/atoms/IconFormat";

function ChatBoxBtn() {
  return (
    <IconFormat
      size={20}
      icon={<BsChatSquareDots />}
      onClick={() => {
        console.log(
          "chatbox기능 구현!(무슨 기능인지, ui가 어텋게 되는지 모르겠습니다)"
        );
      }}
    />
  );
}

export default ChatBoxBtn;
