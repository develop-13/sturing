import AttendanceInfoBox from "@/components/organisms/infoBox/AttendanceInfoBox";
import MemberProgressInfoBox from "@/components/organisms/infoBox/MemberProgressInfoBox";
import { TJoiningStudy_Client } from "@/types/study";
import React, { useMemo } from "react";

export type TTeam = {
  teamMembers: TJoiningStudy_Client["currentMembers"];
  memberAttendances: TJoiningStudy_Client["memberAttendances"];
  studyId: string;
  onAttendanceChange: (myUserEmail: string, attendance: boolean) => void;
};

function Team(props: TTeam) {
  if (!props.teamMembers) return null;

  console.log(props.teamMembers);

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
      <MemberProgressInfoBox teamMembers={props.teamMembers} />
      <AttendanceInfoBox
        // 하위 컴포넌트에서 전체 state값을 수정함.
        // 대신 다른 하위 컴포넌트가 랜더링 안되게끔 상위 컴포넌트가 전해줄 props를 나눔
        studyId={props.studyId}
        memberAttendances={props.memberAttendances}
        onAttendanceChange={props.onAttendanceChange}
      />
    </div>
  );
}

export default React.memo(Team);
