import MatchingHeader from "../../molcules/MatchingHeader";
import SkilledMain from "../../organisms/SkilledMain";

function SkilledTemplate() {
  return (
    <section className="flex flex-col gap-10">
      <MatchingHeader
        title={[`관심 분야에 대한 `, `나의 직업 수준을 선택해 주세요.`]}
      />
      <SkilledMain />
    </section>
  );
}

export default SkilledTemplate;
