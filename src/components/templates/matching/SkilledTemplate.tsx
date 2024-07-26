import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TabButtonGroup } from "@/components/organisms/ButtonGroup";
import { TState, TDispatchFuncs } from "@/components/pages/MatchingPage";
import { useState } from "react";

type TSkilledTemplate = {
  fieldLevels: TState["fieldLevels"];
  setLevel: TDispatchFuncs["setLevel"];
};
const dummyUsername = "웅진";

function SkilledTemplate(props: TSkilledTemplate) {
  console.log("logging in SkilledTemplate");
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="LEVEL" userName={dummyUsername} />
      <main>
        <TabButtonGroup
          selectedOption={selectedOption}
          dataSet={props.fieldLevels}
          onClick={() => {}}
        />
        <div className="py-[16px] flex flex-col gap-[14px]">
          <ButtonOptionDetail
            role="TEXT"
            title="비기너"
            text="관련 공부를 이제 막 시작했어요"
          />
          <ButtonOptionDetail
            role="TEXT"
            title="신입"
            text="관련 분야에서 일한지 아직 1년이 안됐어요"
          />
          <ButtonOptionDetail
            role="TEXT"
            title="주니어"
            text="1-3년 정도 관련 분야 업무경험이 있어요"
          />
          <ButtonOptionDetail
            role="TEXT"
            title="시니어"
            text="4년 이상의 관련 분야 업무경험이 있어요"
          />
        </div>
      </main>
    </section>
  );
}

export default SkilledTemplate;
