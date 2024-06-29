"use client";
import Icon_Logo from "@/svg/Icon-logo";
import IconFormat from "../../common/atoms/IconFormat";

function LogoBtn() {
  return (
    <IconFormat
      onClick={() => {
        console.log("홈으로 리다이렉트 해주세요");
      }}
      icon={<Icon_Logo />}
    />
  );
}

export default LogoBtn;
