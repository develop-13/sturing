"use client";
import Icon_Logo from "@/svg/Icon-logo";
import { SlMenu } from "react-icons/sl";
import IconFormat from "./IconFormat";
import { useRouter } from "next/navigation";

function MenuLogo() {
  const router = useRouter();

  const onClickBack = () => {
    console.log("menu modal show!");
    router.push("/sidebarr");
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
