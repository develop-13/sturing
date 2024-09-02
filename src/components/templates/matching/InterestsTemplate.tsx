"use client";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import MatchingTitle from "../../molecules/MatchingTitle";
import Icon from "@/components/atoms/Icon";
import { TMatchingState, TDispatchFuncs } from "@/reducers/matchingReducer";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/utils/adapters/adapters";

type TInterestsTemplate = {
  fieldLevels: TMatchingState["fieldLevels"];
  addInterest: TDispatchFuncs["addInterest"];
  deleteInterest: TDispatchFuncs["deleteInterest"];
};

const dummyUsername = "웅진";

function InterestsTemplate({
  fieldLevels,
  deleteInterest,
  addInterest,
}: TInterestsTemplate) {
  console.log("logging in InterestsTemplate");

  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="INTEREST" userName={dummyUsername} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        {categories.map((interest) => (
          <IconLabelButton
            key={interest}
            datas={{
              isActive: fieldLevels.has(interest),
              text: interest,
              icon: <Icon type={iconAdapter(interest)} />,
              usage: "gridItem",
              onClick: () => {
                if (fieldLevels.has(interest)) {
                  deleteInterest(interest);
                  return;
                }
                if (fieldLevels.size >= 3) {
                  alert("3개 이상만 선택가능합니다");
                  return;
                }
                addInterest(interest);
              },
            }}
          />
        ))}
      </main>
    </section>
  );
}

export default InterestsTemplate;
