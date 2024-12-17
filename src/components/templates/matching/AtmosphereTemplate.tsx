import Icon from "@/components/atoms/Icon";
import IconLabelButton from "@/components/molecules/IconLabelButton";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import React from "react";
import { TMatchingState, TDispatchFuncs } from "@/reducers/matchingReducer";
import { atmosphereData } from "@/db/atmospheres";
import { iconAdapter } from "@/adapters/adapters";

type TAtmosphereTemplate = {
  userName?: string | null;

  studyAtmospherePreference: TMatchingState["studyAtmospherePreference"];
  addStudyAtmospherePreference: TDispatchFuncs["addStudyAtmospherePreference"];
  deleteStudyAtmospherePreference: TDispatchFuncs["deleteStudyAtmospherePreference"];
};

function AtmosphereTemplate(props: TAtmosphereTemplate) {
  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="ATMOSPHERE" userName={props.userName} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        {atmosphereData.map((item) => (
          <IconLabelButton
            key={item}
            datas={{
              onClick: () => {
                if (props.studyAtmospherePreference[item]) {
                  props.deleteStudyAtmospherePreference(item);
                  return;
                }
                if (Object.keys(props.studyAtmospherePreference).length >= 3) {
                  alert("최대 3개까지만 선택 가능합니다.");
                  return;
                }
                props.addStudyAtmospherePreference(item);
              },
              text: item,
              usage: "gridItem",
              icon: <Icon type={iconAdapter(item)} />,
              isActive: props.studyAtmospherePreference[item],
            }}
          />
        ))}
      </main>
    </section>
  );
}

export default AtmosphereTemplate;
