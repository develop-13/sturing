import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TabButtonGroup } from "@/components/organisms/ButtonGroup";
import { TMatchingState, TDispatchFuncs } from "@/states/matchingReducer";
import { useState } from "react";
import OptionButtonContainer from "@/components/organisms/OptionButtonContainer";
import { TLevel } from "@/types/common";

type TSkilledTemplate = {
  interests: TMatchingState["interests"];
  fieldLevels: TMatchingState["fieldLevels"];
  setLevel: TDispatchFuncs["setLevel"];
};

const dummyUsername = "웅진";

function SkilledTemplate(props: TSkilledTemplate) {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);
  // 분야

  const selectedCategory = props.interests[selectedCategoryIdx];
  const categoryLevel = props.fieldLevels[selectedCategory];

  const onClickButtonGroup = (selectedCategoryIdx: number) => {
    setSelectedCategoryIdx(selectedCategoryIdx);
  };

  const onClickButtonContainer = (dataId: TLevel) => () => {
    props.setLevel(props.interests[selectedCategoryIdx], dataId);
  };

  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="LEVEL" userName={dummyUsername} />
      <main>
        <TabButtonGroup
          selectedOptionIdx={selectedCategoryIdx}
          buttonGroupData={props.interests}
          onClick={onClickButtonGroup}
        />
        <div className="py-[16px] flex flex-col gap-[14px]">
          <OptionButtonContainer
            level={categoryLevel}
            onClick={onClickButtonContainer}
          />
        </div>
      </main>
    </section>
  );
}

export default SkilledTemplate;
