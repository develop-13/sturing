"use client";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import MatchingTitle from "../../molecules/MatchingTitle";
import Icon from "@/components/atoms/Icon";
import { TIconData } from "@/components/atoms/Icon";
import { TMatchingState, TDispatchFuncs } from "@/reducer/MatchingReducer";

type TInterestsTemplate = {
  fieldLevels: TMatchingState["fieldLevels"];
  addInterest: TDispatchFuncs["addInterest"];
  deleteInterest: TDispatchFuncs["deleteInterest"];
};

const dummyUsername = "웅진";

type TInterest = { id: string; text: string; iconType: TIconData["type"] }[];

const interests: TInterest = [
  { id: "design", text: "디자인", iconType: "DESIGN" },
  { id: "tech", text: "개발 · 테크", iconType: "TECH" },
  { id: "business", text: "비즈니스", iconType: "BUSINESS" },
  { id: "marketing", text: "마케팅", iconType: "MARKETING" },
  { id: "economy", text: "경제", iconType: "ECONOMY" },
  { id: "language", text: "외국어", iconType: "LANGUAGE" },
  { id: "certification", text: "자격증", iconType: "CERTIFICATION" },
  { id: "selfDevelop", text: "자기계발", iconType: "SELFDEVELOP" },
];

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
        {interests.map((interest) => (
          <IconLabelButton
            key={interest.id}
            datas={{
              isActive: fieldLevels.has(interest.id),
              text: interest.text,
              icon: <Icon type={interest.iconType} />,
              usage: "gridItem",
              onClick: () => {
                if (fieldLevels.has(interest.id)) {
                  deleteInterest(interest.id);
                  return;
                }
                if (fieldLevels.size >= 3) {
                  alert("3개 이상만 선택가능합니다");
                  return;
                }
                addInterest(interest.id);
              },
            }}
          />
        ))}
      </main>
    </section>
  );
}

export default InterestsTemplate;
