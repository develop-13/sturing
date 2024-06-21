"use client";
import Icon_Logo from "@/svg/Icon-logo";
import { SlMenu } from "react-icons/sl";

function MenuLogo() {
  const onClickBack = () => {
    console.log("menu modal show!");
  };

  return (
    <div>
      <div className="flex gap-[8px] items-center">
        <SlMenu className="text-iconSize" onClick={onClickBack} />
        <Icon_Logo />
      </div>
    </div>
  );
}

export default MenuLogo;
