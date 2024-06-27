"use client";

import TabHeader from "@/components/matching/SkillTabHeader";
import TabMain from "@/components/matching/SkillTabMain";

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
