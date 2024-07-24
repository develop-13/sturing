import Icon from "../atoms/Icon";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";
import StudyList from "../organisms/StudyList";
import UpcomingStudies from "../organisms/UpcomingStudies";

function MyStudyPage() {
  return (
    <div className="flex flex-col">
      <Header
        leftSlot={
          <div className="flex gap-[12px] items-center">
            <Icon type="MENU" />
            <Icon type="LOGO" />
          </div>
        }
        rightSlot={
          <div className="flex gap-[12px] items-center">
            <Icon type="BELL" />
            <Icon type="USER" />
          </div>
        }
      />
      <NavButtonGroup />
      <UpcomingStudies />
      <StudyList />
    </div>
  );
}

export default MyStudyPage;
