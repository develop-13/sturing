import StudyList from "../organisms/StudyList";
import UpcomingStudies from "../organisms/UpcomingStudies";

function MyStudyPage() {
  return (
    <div className="flex flex-col gap-[40px]">
      <UpcomingStudies />
      <StudyList />
    </div>
  );
}

export default MyStudyPage;
