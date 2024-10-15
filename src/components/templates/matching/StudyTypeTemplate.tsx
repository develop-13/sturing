import MatchingTitle from "@/components/molecules/MatchingTitle";
import { TMatchingState, TDispatchFuncs } from "@/reducers/matchingReducer";
import { CheckBarButton } from "@/components/molecules/IconLabelButton";
import Text from "@/components/atoms/Text";

type TStudyTypeTemplate = {
  userName?: string | null;
  studyTypePreference: TMatchingState["studyTypePreference"];
  setStudyTypePreference: TDispatchFuncs["setStudyTypePreference"];
};

function StudyTypeTemplate(props: TStudyTypeTemplate) {
  return (
    <section className="flex flex-col gap-[60px] py-[20px]">
      <MatchingTitle role="TYPE" userName={props.userName} />
      <div className="flex flex-col gap-[14px]">
        <CheckBarButton
          type="defaultCheck"
          isActive={props.studyTypePreference === "online"}
          onClick={() => {
            props.setStudyTypePreference("online");
          }}
        >
          <Text
            size="base"
            weight="bold"
            color={props.studyTypePreference === "online" ? "main" : "gray-700"}
          >
            온라인 스터디
          </Text>
        </CheckBarButton>
        <CheckBarButton
          type="defaultCheck"
          isActive={props.studyTypePreference === "offline"}
          onClick={() => {
            props.setStudyTypePreference("offline");
          }}
        >
          <Text
            size="base"
            weight="bold"
            color={
              props.studyTypePreference === "offline" ? "main" : "gray-700"
            }
          >
            오프라인 스터디
          </Text>
        </CheckBarButton>
        <CheckBarButton
          type="defaultCheck"
          isActive={props.studyTypePreference === "both"}
          onClick={() => {
            props.setStudyTypePreference("both");
          }}
        >
          <Text
            size="base"
            weight="bold"
            color={props.studyTypePreference === "both" ? "main" : "gray-700"}
          >
            온오프라인 상관 없어요{" "}
          </Text>
        </CheckBarButton>
      </div>
    </section>
  );
}

export default StudyTypeTemplate;
