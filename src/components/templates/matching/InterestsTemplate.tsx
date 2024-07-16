"use client";
import MatchingTitle from "../../molecules/MatchingTitle";

const dummyUsername = "웅진";

function InterestsTemplate() {
  return (
    <section className="flex flex-col gap-10">
      <MatchingTitle datas={{ type: "INTEREST", userName: dummyUsername }} />
      <main className="grid grid-cols-2 gap-[15px]"></main>;
    </section>
  );
}

export default InterestsTemplate;
