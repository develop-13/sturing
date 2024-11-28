"use client";
import Text from "@/components/atoms/Text";
import WeekCalendar from "@/components/organisms/CustomCalendar/WeekCalendar";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import React, { useContext, useEffect, useState } from "react";
import { TTeam } from "./Team";
import { TCheckListItem, TStudyMember } from "@/types/study";
import TodoListInfoBox from "@/components/organisms/infoBox/TodoListInfoBox";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "@/components/organisms/auth-components/UserStatusProvider";

type TPrivate = {
  teamMembers?: TStudyMember[];
  studyId: string;
};

const getCheckLists = (teamMembers?: TStudyMember[], userEmail?: string) => {
  if (!teamMembers || !userEmail) return [];
  // 나의 체크리스트를 구하는 항목이 빠짐 = userEmail이 필요함
  const myInfo = teamMembers.find(
    (teamMember) => teamMember.userEmail == userEmail
  );
  return myInfo?.checkList;
};

function Private(props: TPrivate) {
  // studyId의 currentMembers에서 userEmail에 해당하는 currentMember을 고른다.
  // currentMember에 checkList중에서
  // 현재 날짜에 따른 checkList를 보여준다.
  // Study의 checkList 중 현재 날짜인 것들을 보여준다.
  const { session }: UserStatusContextProps = useContext(UserStatusContext);
  const [checkList, setCheckList] = useState(
    getCheckLists(props.teamMembers, session?.user.email)
  );

  useEffect(() => {
    async function getUpdatedCheckList() {}
  }, [checkList]);

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
      <TodoListInfoBox todoList={checkList} date={currentDate} />
    </div>
  );
}

export default Private;
