import React from "react";
import MatchingHeader from "../../common/MatchingHeader";
import MainLayout from "@/components/common/atoms/mainLayout";
import MatchingGridSection from "../../common/MatchingGridSection";
import MatchingGridItem from "../../common/MatchingGridItem";

const svgPaths = [
  ["/svg/atmosphere/friendly.svg", "친근한"],
  ["/svg/atmosphere/professional.svg", "전문적인"],
  ["/svg/atmosphere/serious.svg", "진지한"],
  ["/svg/atmosphere/systematic.svg", "체계적인"],
  ["/svg/atmosphere/enthusiastic.svg", "열정적인"],
  ["/svg/atmosphere/responsible.svg", "책임감 있는"],
  ["/svg/atmosphere/learningOriented.svg", "학습중심적"],
  ["/svg/atmosphere/cooperative.svg", "협력적인"],
  ["/svg/atmosphere/selfDirected.svg", "자기주도적"],
  ["/svg/atmosphere/free.svg", "자유로운"],
];

function AtmosphereTemplate() {
  return (
    <section className="flex flex-col gap-10">
      <MatchingHeader
        title={[`웅진님이 선호하는`, `스터디 분위기를 선택해 주세요.`]}
        subtitle={[`최대 3개까지 선택 가능합니다.`]}
      />
      <MainLayout>
        <MatchingGridSection>
          {svgPaths.map((pathname, idx) => (
            <MatchingGridItem
              key={idx}
              svgPath={pathname[0]}
              name={pathname[1]}
            />
          ))}
        </MatchingGridSection>
      </MainLayout>
    </section>
  );
}

export default AtmosphereTemplate;
