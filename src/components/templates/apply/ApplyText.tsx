import Text from "@/components/atoms/Text";
import TextSetter from "@/components/organisms/recruitmentComponents/TextSetter";
import TitleSetter from "@/components/organisms/recruitmentComponents/TitleSetter";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import { TApplyState } from "@/states/ApplyReducer";
import { useCallback } from "react";

type TApplyText = {
  state: TApplyState;
  handleStateChange: HandleStateChange<TApplyState>;
};

function ApplyText(props: TApplyText) {
  const handleSetInputText = useCallback(
    (inputContent: string) => {
      props.handleStateChange("applicationTitle", inputContent);
    },
    [props.state.applicationTitle]
  );

  const handleSetTextareaText = useCallback(
    (text: string) => {
      props.handleStateChange("commitment", text);
    },
    [props.state.commitment]
  );

  return (
    <section className="py-4 flex flex-col gap-5">
      {" "}
      <Text size="xl" weight="bold">
        스터디에 지원글을 작성해 주세요
      </Text>
      <TitleSetter
        type="writable"
        text={props.state.applicationTitle}
        placeholder="스터디 모집자에게 나를 어필할 수 있는 한 마디"
        handleSetInputText={handleSetInputText}
        intro={"스터디 지원글 제목"}
      />
      <TextSetter
        type="writable"
        intro="나의 각오"
        placeholder="지원글을 입력해 주세요(ex-나의 성격, 장점, 지원동기)"
        description={props.state.commitment}
        handleSetTextareaText={handleSetTextareaText}
      />
    </section>
  );
}

export default ApplyText;
