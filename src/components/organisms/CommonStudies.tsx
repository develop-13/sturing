import { TStudyItem } from "@/types/study";
import SlideContentList from "./SlideContentList";
import StudyBox from "./StudyBox";

function commonStudies({
  popularStudies,
  newStudies,
}: {
  popularStudies: TStudyItem[];
  newStudies: TStudyItem[];
}) {
  return (
    <div>
      <SlideContentList
        title={"인기 스터디"}
        hasArrow={true}
        className="text-lg"
      >
        {popularStudies.map((study: TStudyItem) => (
          <StudyBox props={study} key={study.createdAt} />
        ))}
      </SlideContentList>
      <SlideContentList
        title={"새로 개설된 스터디"}
        hasArrow={true}
        className="text-lg"
      >
        {newStudies.map((study: TStudyItem) => (
          <StudyBox props={study} key={study.createdAt} />
        ))}
      </SlideContentList>
    </div>
  );
}

export default commonStudies;
