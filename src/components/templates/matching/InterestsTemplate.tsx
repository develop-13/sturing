"use client";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import MatchingTitle from "../../molecules/MatchingTitle";
import Icon from "@/components/atoms/Icon";
import { TMatchingState, TDispatchFuncs } from "@/reducers/matchingReducer";
import { categories } from "@/db/categories";
import { iconAdapter } from "@/utils/adapters/adapters";

type TInterestsTemplate = {
  userName?: string | null;
  fieldLevels: TMatchingState["fieldLevels"];
  addInterest: TDispatchFuncs["addInterest"];
  deleteInterest: TDispatchFuncs["deleteInterest"];
};

function InterestsTemplate({
  userName,
  fieldLevels,
  deleteInterest,
  addInterest,
}: TInterestsTemplate) {
  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="INTEREST" userName={userName} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        {categories.map((interest) => (
          <IconLabelButton
            key={interest}
            datas={{
              isActive:
                fieldLevels[interest] == "" || Boolean(fieldLevels[interest]),
              text: interest,
              icon: <Icon type={iconAdapter(interest)} />,
              usage: "gridItem",
              onClick: () => {
                if (fieldLevels[interest] === "") {
                  deleteInterest(interest);
                  return;
                }
                if (Object.keys(fieldLevels).length >= 3) {
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
