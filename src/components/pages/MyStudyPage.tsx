import UseLoginCheckWrapper from "@/hooks/UseLoginCheckWrapper";
import Icon from "../atoms/Icon";
import MenuBtn from "../molecules/MenuBtn";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";
import StudyList from "../templates/mystudy/StudyListContainer";
import UpcomingStudies from "../templates/mystudy/UpcomingSchedules";

import { TSchedule } from "@/types/study";

function MyStudyPage({
  userSchedule,
  session,
}: {
  userSchedule: TSchedule[];
  session: any;
}) {
  return (
    <div className="flex flex-col">
      <Header
        leftSlot={
          <div className="flex gap-[12px] items-center">
            <MenuBtn session={session} />
            <Icon type="LOGO" />
          </div>
        }
      />
      {/* <UseLoginCheckWrapper /> */}
      <NavButtonGroup pathname="/mystudy" isLoggedIn={!!session?.user} />
      {session?.user.email && (
        <div>
          <UpcomingStudies userSchedule={userSchedule} />
          <StudyList userEmail={session?.user.email} />
        </div>
      )}
    </div>
  );
}

export default MyStudyPage;
