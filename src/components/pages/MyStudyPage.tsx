import Icon from "../atoms/Icon";
import Header from "../organisms/Header";
import StudyList from "../organisms/StudyList";
import UpcomingStudies from "../organisms/UpcomingStudies";

function MyStudyPage() {
  return (
    <div className="flex flex-col">
      <Header
        leftSlot={
          <div className="flex gap-[12px]">
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          <div className="flex gap-[12px]">
            <Icon type="BELL" />
            <Icon type="USER" />
          </div>
        }
      />

      <UpcomingStudies />
      <StudyList />
    </div>
  );
}

export default MyStudyPage;
