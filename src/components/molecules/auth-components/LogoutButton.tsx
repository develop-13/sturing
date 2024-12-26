"use client";
import Button from "../Button";
import Text from "@/components/atoms/Text";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <Button
      theme="secondary"
      extraCss="p-[6px] rounded-[5px]"
      onClick={signOut}
    >
      <Text weight="bold">로그 아웃</Text>
    </Button>
  );
}

export default LogoutButton;
