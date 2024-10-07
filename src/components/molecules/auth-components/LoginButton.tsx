"use client";
import Text from "@/components/atoms/Text";
import Button from "../Button";

export default function LoginButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      theme="secondary"
      extraCss="p-[6px] rounded-[5px]"
      onClick={onClick}
    >
      <Text weight="bold">간편 로그인</Text>
    </Button>
  );
}
