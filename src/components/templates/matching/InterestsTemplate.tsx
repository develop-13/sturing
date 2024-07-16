"use client";
import ButtonLabel from "@/components/molecules/ButtonLabel";
import MatchingTitle from "../../molecules/MatchingTitle";
import Icon from "@/components/atoms/Icon";

const dummyUsername = "웅진";

function InterestsTemplate() {
  return (
    <section className="flex flex-col gap-10">
      <MatchingTitle type="INTEREST" userName={dummyUsername} />
      <main className="grid grid-cols-2 gap-[15px] w-full h-[405px]">
        <ButtonLabel
          type="matching"
          icon={<Icon type="DESIGN" />}
          text="디자인"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="TECH" />}
          text="개발 · 테크"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="BUSINESS" />}
          text="비즈니스"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="MARKETING" />}
          text="마케팅"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="ECONOMY" />}
          text="경제"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="LANGUAGE" />}
          text="외국어"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="CERTIFICATION" />}
          text="자격증"
        />
        <ButtonLabel
          type="matching"
          icon={<Icon type="SELFDEVELOP" />}
          text="자기계발"
        />
      </main>
    </section>
  );
}

export default InterestsTemplate;
