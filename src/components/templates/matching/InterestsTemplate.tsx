"use client";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import MatchingTitle from "../../molecules/MatchingTitle";
import Icon from "@/components/atoms/Icon";

const dummyUsername = "웅진";

function InterestsTemplate() {
  return (
    <section className="flex flex-col gap-[40px]">
      <MatchingTitle role="INTEREST" userName={dummyUsername} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        <ButtonLabel
          datas={{
            text: "디자인",
            icon: <Icon type="DESIGN" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "개발 · 테크",
            icon: <Icon type="TECH" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "비즈니스",
            icon: <Icon type="BUSINESS" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "마케팅",
            icon: <Icon type="MARKETING" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "경제",
            icon: <Icon type="ECONOMY" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "외국어",
            icon: <Icon type="LANGUAGE" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "자격증",
            icon: <Icon type="CERTIFICATION" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
        <ButtonLabel
          datas={{
            text: "자기계발",
            icon: <Icon type="SELFDEVELOP" />,
            theme: "ordinary",
            role: "matchingItem",
          }}
        />
      </main>
    </section>
  );
}

export default InterestsTemplate;
