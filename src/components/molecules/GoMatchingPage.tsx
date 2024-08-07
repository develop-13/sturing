"use client";

import { useRouter } from "next/navigation";

import Icon from "../atoms/Icon";
import Text from "../atoms/Text";

//GoMatchingPage를 TitleLink랑 합치고 싶었음
// 왜냐하면 디자인도 >로 겹치는 부분이 있어서
// 하지만 역할이 다름. GoMatchingPage는 라우팅 기능, TitleLink는 슬라이딩 기능
function GoMatchingPage() {
  const router = useRouter();

  return (
    <div
      className="h-[43px] bg-black text-white flex gap-[8px] items-center px-[16px] hover:underline cursor-pointer "
      onClick={() => router.push("/matching")}
    >
      <Icon type="RLOGO" />
      <Text size="sm" weight="bold">
        매칭항목 선택하고 딱 맞는 스터디 추천받기
      </Text>
      <Icon type="FORWARD" />
    </div>
  );
}

export default GoMatchingPage;
