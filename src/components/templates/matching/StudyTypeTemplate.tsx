import ButtonOptionDetail from "@/components/organisms/ButtonOptionDetail";
import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TMatchingState, TDispatchFuncs } from "@/reducer/MatchingReducer";
import { CheckBarButton } from "@/components/molecules/IconLabelButton";

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
        <CheckBarButton
          type="defaultCheck"
          isActive={props.studyTypePreference === "online"}
          text="온라인 스터디"
          onClick={() => {
            props.setStudyTypePreference("online");
          }}
        />
        <CheckBarButton
          type="defaultCheck"
          isActive={props.studyTypePreference === "offline"}
          text="오프라인 스터디"
          onClick={() => {
            props.setStudyTypePreference("offline");
          }}
        />
        <CheckBarButton
          type="defaultCheck"
          isActive={props.studyTypePreference === "both"}
          text="온오프라인 상관 없어요"
          onClick={() => {
            props.setStudyTypePreference("both");
          }}
        />
      </div>
    </section>
  );
}

export default StudyTypeTemplate;
