"use client";
import Text from "@/components/atoms/Text";
import Button from "../Button";
import { signOut } from "next-auth/react";

export default function LogoutButton_temp() {
  return (
    <Button
      theme="primary"
      onClick={() => {
        // console.log("LogouButton clicked");
        signOut();
        // signOut({ redirect: false });
      }}
    >
      <Text weight="bold">임시 로그아웃</Text>
    </Button>
  );
}
