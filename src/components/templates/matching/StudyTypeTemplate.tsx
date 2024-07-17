import ButtonOptionDetail from "@/components/molecules/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";

function StudyTypeTemplate() {
  const dummyUsername = "웅진";

  return (
    <section className="flex flex-col">
      <MatchingTitle type="TYPE" userName={dummyUsername} />
      <div className="pt-[20px] flex flex-col gap-[14px]">
        <ButtonOptionDetail role="TYPE" detail="온라인 스터디" />
        <ButtonOptionDetail role="TYPE" detail="오프라인 스터디" />
        <ButtonOptionDetail role="TYPE" detail="온오프라인 상관 없어요" />
      </div>
    </section>
  );
}

export default StudyTypeTemplate;
