import Icon from "@/components/atoms/Icon";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import React from "react";
import { TMatchingState, TDispatchFuncs } from "@/reducers/matchingReducer";
import { atmosphereData } from "@/db/atmospheres";

type TAtmosphereTemplate = {
  studyAtmospherePreference: TMatchingState["studyAtmospherePreference"];
  addStudyAtmospherePreference: TDispatchFuncs["addStudyAtmospherePreference"];
  deleteStudyAtmospherePreference: TDispatchFuncs["deleteStudyAtmospherePreference"];
};
const dummyUsername = "웅진";

function AtmosphereTemplate(props: TAtmosphereTemplate) {
  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="ATMOSPHERE" userName={dummyUsername} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        {atmosphereData.map((item) => (
          <IconLabelButton
            key={item.atmosphere}
            datas={{
              onClick: () => {
                if (props.studyAtmospherePreference.has(item.atmosphere)) {
                  props.deleteStudyAtmospherePreference(item.atmosphere);
                  return;
                }
                if (props.studyAtmospherePreference.size >= 3) {
                  alert("최대 3개까지만 선택 가능합니다.");
                  return;
                }
                props.addStudyAtmospherePreference(item.atmosphere);
              },
              text: item.atmosphere,
              usage: "gridItem",
              icon: <Icon type={item.atmosphere} />,
              isActive: props.studyAtmospherePreference.has(item.atmosphere),
            }}
          />
        ))}
      </main>
    </section>
  );
}

export default AtmosphereTemplate;
