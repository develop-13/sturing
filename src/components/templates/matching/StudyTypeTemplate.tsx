import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TState, TDispatchFuncs } from "@/components/pages/MatchingPage";

type TStudyTypeTemplate = {
  studyTypePreference: TState["studyTypePreference"];
  setStudyTypePreference: TDispatchFuncs["setStudyTypePreference"];
};

function StudyTypeTemplate(props: TStudyTypeTemplate) {
  const dummyUsername = "웅진";

  return (
    <section className="flex flex-col gap-[60px] py-[20px]">
      <MatchingTitle role="TYPE" userName={dummyUsername} />
      <div className="flex flex-col gap-[14px]">
        <ButtonOptionDetail
          role="CHECK"
          checkType="defaultCheck"
          text="온라인 스터디"
        />
        <ButtonOptionDetail
          role="CHECK"
          checkType="defaultCheck"
          text="오프라인 스터디"
        />
        <ButtonOptionDetail
          role="CHECK"
          checkType="defaultCheck"
          text="온오프라인 상관 없어요"
        />
      </div>
    </section>
  );
}

export default StudyTypeTemplate;
