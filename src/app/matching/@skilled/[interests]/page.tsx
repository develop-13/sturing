"use client";

import TabHeader from "@/components/matching/SkillTabHeader";
import TabMain from "@/components/matching/SkillTabMain";

// 문제점: 각 세그먼트의 라우트 주소가 다르기 때문에 뒤로가기 누르면 이전 탭이 선택됨? => 이게 맞나?

function Tabs() {
  // params의 id로 현재 어떤 텝인지 식별

  return (
    <div>
      <TabHeader />
      <TabMain />
    </div>
  );
}

export default Tabs;
