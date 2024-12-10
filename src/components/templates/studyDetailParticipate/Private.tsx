"use client";
import WeekCalendar from "@/components/organisms/infoBox/CustomCalendar/WeekCalendar";
import React, { useContext, useEffect, useState } from "react";
import {
  TCheckListItem,
  TJoiningStudy_Client,
  TStudyMember,
} from "@/types/study";
import TodoListInfoBox from "@/components/organisms/infoBox/TodoListInfoBox";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "@/components/organisms/auth-components/UserStatusProvider";

type TPrivate = {
  memberCheckLists: TJoiningStudy_Client["memberCheckLists"];
  studyId: string;
  onUpdateCheckList: (
    myUserEmail: string,
    checkLists: TCheckListItem[]
  ) => void;
};

function Private(props: TPrivate) {
  // studyId의 currentMembers에서 userEmail에 해당하는 currentMember을 고른다.
  // currentMember에 checkList중에서
  // 현재 날짜에 따른 checkList를 보여준다.
  // Study의 checkList 중 현재 날짜인 것들을 보여준다.
  const { session }: UserStatusContextProps = useContext(UserStatusContext);
  // const checkList = getCheckLists(props.teamMembers, session?.user.email);

  const myUserEmail = session?.user.email || "none";

  const checkList = props.memberCheckLists[myUserEmail];

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCurrentDate = (selectedDate: Date) => {
    setCurrentDate(selectedDate); // 선택된 날짜를 상태로 업데이트
  };

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
      <WeekCalendar
        currentDate={currentDate}
        handleCurrentDate={handleCurrentDate}
      />
      <TodoListInfoBox
        studyId={props.studyId}
        todoList={checkList}
        date={currentDate}
        myUserEmail={myUserEmail}
        onUpdateCheckList={props.onUpdateCheckList}
      />
    </div>
  );
}

export default Private;
