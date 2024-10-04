"use client";
import Text from "@/components/atoms/Text";
import Button from "../Button";
import { SessionProvider, signIn } from "next-auth/react";
import { Session } from "next-auth";

export default function LoginButton({ session }: { session: Session | null }) {
  return (
    <SessionProvider session={session}>
      <Button
        theme="secondary"
        extraCss="p-[6px] rounded-[5px]"
        onClick={() => {
          console.log("LoginButton clicked");
          signIn();
        }}
      >
        <Text weight="bold">간편 로그인</Text>
      </Button>
    </SessionProvider>
  );
}
