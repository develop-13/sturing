import MatchingHeader from "../../common/MatchingHeader";
import StudyTypes from "../organisms/StudyTypes";

function StudyTypeTemplate() {
  return (
    <section className="flex flex-col gap-[60px]">
      <MatchingHeader
        title={["웅진님이 선호하는", "스터디 유형을 선택해 주세요."]}
      />
      <StudyTypes />
    </section>
  );
}

export default StudyTypeTemplate;
