"use client";
import { useContext, useEffect, useState } from "react";
import Icon from "../atoms/Icon";
import MenuBtn from "../molecules/MenuBtn";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";
import StudyList from "../templates/mystudy/StudyListContainer";
import UpcomingStudies from "../templates/mystudy/UpcomingStudies";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../organisms/auth-components/UserStatusProvider";

function MyStudyPage() {
  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);
  // console.log(session);

  return (
    <div className="flex flex-col">
      <Header
        leftSlot={
          <div className="flex gap-[12px] items-center">
            <MenuBtn session={session} />
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
      {session?.user.email && (
        <div>
          <UpcomingStudies userEmail={session?.user.email} />
          <StudyList userEmail={session?.user.email} />
        </div>
      )}
    </div>
  );
}

export default MyStudyPage;
