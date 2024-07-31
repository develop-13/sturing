import Icon from "@/components/atoms/Icon";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import React from "react";
import {
  TMatchingState,
  TDispatchFuncs,
} from "@/components/pages/MatchingPage";
import { TIconData } from "@/components/atoms/Icon";

type TAtmosphereTemplate = {
  studyAtmospherePreference: TMatchingState["studyAtmospherePreference"];
  addStudyAtmospherePreference: TDispatchFuncs["addStudyAtmospherePreference"];
  deleteStudyAtmospherePreference: TDispatchFuncs["deleteStudyAtmospherePreference"];
};
const dummyUsername = "웅진";

type TAtmosphereItem = {
  id: string;
  text: string;
  iconType: TIconData["type"];
};
const atmosphereItems: TAtmosphereItem[] = [
  { id: "friendly", text: "친근한", iconType: "FRIENDLY" },
  { id: "professional", text: "전문적인", iconType: "PROFESSIONAL" },
  { id: "serious", text: "진지한", iconType: "SERIOUS" },
  { id: "systematic", text: "체계적인", iconType: "SYSTEMATIC" },
  { id: "enthusiastic", text: "열정적인", iconType: "ENTHUSIASTIC" },
  { id: "responsible", text: "책임감있는", iconType: "RESPONSIBLE" },
  { id: "learning", text: "학습중심적", iconType: "LEARNING" },
  { id: "cooperative", text: "협력적인", iconType: "COOPERATIVE" },
  { id: "selfDirected", text: "자기주도적", iconType: "SELFDIRECTED" },
  { id: "free", text: "자유로운", iconType: "FREE" },
];

function AtmosphereTemplate(props: TAtmosphereTemplate) {
  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="ATMOSPHERE" userName={dummyUsername} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        {atmosphereItems.map((item) => (
          <ButtonLabel
            key={item.id}
            datas={{
              onClick: () => {
                if (props.studyAtmospherePreference.has(item.id)) {
                  props.deleteStudyAtmospherePreference(item.id);
                  return;
                }
                if (props.studyAtmospherePreference.size >= 3) {
                  alert("최대 3개까지만 선택 가능합니다.");
                  return;
                }
                props.addStudyAtmospherePreference(item.id);
              },
              isActive: props.studyAtmospherePreference.has(item.id),
              text: item.text,
              icon: <Icon type={item.iconType} />,
              theme: "ordinary",
              role: "matchingItem",
            }}
          />
        ))}
      </main>
    </section>
  );
}

export default AtmosphereTemplate;
