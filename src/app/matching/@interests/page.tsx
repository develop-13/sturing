import MatchingGridSection from "@/components/matching/MatchingGridSection";
import MatchingHeader from "@/components/matching/MatchingHeader";
import MatchingGridItem from "@/components/matching/MatchingGridItem";
import MainLayout from "@/components/common/mainLayout";

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

function Interests() {
  return (
    <section className="flex flex-col gap-10">
      <MatchingHeader
        title={[`웅진님 안녕하세요`, `현재 관심있는 분야는 무엇인가요?`]}
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

export default Interests;
