"use client";
import Icon_Logo from "@/svg/Icon-logo";
import { SlMenu } from "react-icons/sl";
import IconFormat from "./IconFormat";

function MenuLogo() {
  const onClickBack = () => {
    console.log("menu modal show!");
  };

  return (
    <div>
      <div className="flex gap-[8px] items-center">
        <IconFormat onClick={onClickBack} icon={<SlMenu />} />
        <Icon_Logo />
      </div>
    </div>
  );
}

export default MenuLogo;
