import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import {
  TMatchingState,
  TDispatchFuncs,
} from "@/components/pages/MatchingPage";

type TStudyTypeTemplate = {
  studyTypePreference: TMatchingState["studyTypePreference"];
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
          isActive={props.studyTypePreference === "online"}
          onClick={() => {
            props.setStudyTypePreference("online");
          }}
        />
        <ButtonOptionDetail
          role="CHECK"
          checkType="defaultCheck"
          text="오프라인 스터디"
          isActive={props.studyTypePreference === "offline"}
          onClick={() => {
            props.setStudyTypePreference("offline");
          }}
        />
        <ButtonOptionDetail
          role="CHECK"
          checkType="defaultCheck"
          text="온오프라인 상관 없어요"
          isActive={props.studyTypePreference === "both"}
          onClick={() => {
            props.setStudyTypePreference("both");
          }}
        />
      </div>
    </section>
  );
}

export default StudyTypeTemplate;
