import Icon from "@/components/atoms/Icon";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import React from "react";
import { TState, TDispatchFuncs } from "@/components/pages/MatchingPage";

type TAtmosphereTemplate = {
  studyAtmospherePreference: TState["studyAtmospherePreference"];
  setStudyAtmospherePreference: TDispatchFuncs["setStudyAtmospherePreference"];
};
const dummyUsername = "웅진";

function AtmosphereTemplate(props: TAtmosphereTemplate) {
  return (
    <section className="flex flex-col gap-[40px] py-[20px]">
      <MatchingTitle role="ATMOSPHERE" userName={dummyUsername} />{" "}
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        <ButtonLabel
          datas={{
            text: "친근한",
            icon: <Icon type="FRIENDLY" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "전문적인",
            icon: <Icon type="PROFESSIONAL" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "진지한",
            icon: <Icon type="SERIOUS" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "체계적인",
            icon: <Icon type="SYSTEMATIC" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "열정적인",
            icon: <Icon type="ENTHUSIASTIC" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "책임감있는",
            icon: <Icon type="RESPONSIBLE" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "학습중심적",
            icon: <Icon type="LEARNING" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "협력적인",
            icon: <Icon type="COOPERATIVE" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "자기주도적",
            icon: <Icon type="SELFDIRECTED" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "자유로운",
            icon: <Icon type="FREE" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
      </main>
    </section>
  );
}

export default AtmosphereTemplate;
