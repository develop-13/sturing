import TabHeader from "@/components/common/molecules/TabHeader";
import MatchingHeader from "../../common/MatchingHeader";
import SkilledTabMain from "../organisms/SkilledTabMain";

function SkilledTemplate() {
  return (
    <section className="flex flex-col">
      <MatchingHeader
        title={[`관심 분야에 대한 `, `나의 직업 수준을 선택해 주세요.`]}
      />
      <TabHeader />
      <SkilledTabMain />
    </section>
  );
}

export default SkilledTemplate;
