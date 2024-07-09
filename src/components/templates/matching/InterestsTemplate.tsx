"use client";
import Text from "@/components/atoms/Text";
import MatchingTitle from "../../molcules/MatchingTitle";
// import MatchingGridSection from "../../atoms/MatchingGridSection";
// import MatchingGridItem from "../../atoms/MatchingGridItem";

const svgPaths = [
  ["/svg/interests/business.svg", "비즈니스"],
  ["/svg/interests/certification.svg", "자격증"],
  ["/svg/interests/design.svg", "디자인"],
  ["/svg/interests/economy.svg", "경제"],
  ["/svg/interests/improvement.svg", "자기 계발"],
  ["/svg/interests/language.svg", "외국어"],
  ["/svg/interests/marketing.svg", "마케팅"],
  ["/svg/interests/tech.svg", "개발.테크"],
];

const dummyUsername = "웅진";

function InterestsTemplate() {
  return (
    <section className="flex flex-col">
      <MatchingTitle datas={{ type: "INTEREST", userName: dummyUsername }} />
      {/* <div className="mx-4">
        <MatchingGridSection>
          {svgPaths.map((pathname, idx) => (
            <MatchingGridItem
              key={idx}
              svgPath={pathname[0]}
              name={pathname[1]}
            />
          ))}
        </MatchingGridSection>
      </div> */}
    </section>
  );
}

export default InterestsTemplate;
