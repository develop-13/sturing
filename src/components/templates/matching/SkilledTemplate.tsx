import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TabButtonGroup } from "@/components/organisms/ButtonGroup";
import { TState, TDispatchFuncs } from "@/components/pages/MatchingPage";
import { useState } from "react";
import OptionButtonContainer from "@/components/organisms/OptionButtonContainer";

type TSkilledTemplate = {
  interests: TState["interests"];
  fieldLevels: TState["fieldLevels"];
  setLevel: TDispatchFuncs["setLevel"];
};
const dummyUsername = "웅진";

function SkilledTemplate(props: TSkilledTemplate) {
  console.log("logging in SkilledTemplate");
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  // 분야

  const onSelect = (selectedCategoryIdx: number) => {
    setSelectedCategoryIdx(selectedCategoryIdx);
  };

  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="LEVEL" userName={dummyUsername} />
      <main>
        <TabButtonGroup
          selectedOptionIdx={selectedCategoryIdx}
          buttonGroupData={props.interests}
          onClick={onSelect}
        />
        <div className="py-[16px] flex flex-col gap-[14px]">
          <OptionButtonContainer
            interests={props.interests}
            selectedCategoryIdx={selectedCategoryIdx}
            fieldLevels={props.fieldLevels}
            setLevel={props.setLevel}
          />
        </div>
      </main>
    </section>
  );
}

export default SkilledTemplate;
