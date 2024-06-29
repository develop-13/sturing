import MatchingHeader from "../../common/MatchingHeader";
import StudyTypes from "../organisms/StudyTypes";

function StudyTypeTemplate() {
  return (
    <div>
      <MatchingHeader
        title={["웅진님이 선호하는", "스터디 유형을 선택해 주세요."]}
      />
      <StudyTypes />
    </div>
  );
}

export default StudyTypeTemplate;
