"use client";
import { useContext, useEffect } from "react";
import Icon from "../atoms/Icon";
import MenuBtn from "../molecules/MenuBtn";
import { NavButtonGroup } from "../organisms/ButtonGroup";
import Header from "../organisms/Header";
import StudyList from "../templates/mystudy/StudyListContainer";
import UpcomingStudies from "../templates/mystudy/UpcomingSchedules";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import { useRouter } from "next/navigation";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../../providers/ModalProvider";
import useLoginCheck from "@/hooks/useLoginCheck";

function MyStudyPage() {
  const { session }: UserStatusContextProps = useContext(UserStatusContext);

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { openModal } = modalInfo;

  useLoginCheck();

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
      <NavButtonGroup
        pathname="/mystudy"
        isLoggedIn={!!session?.user}
        openLoginLodal={openModal}
      />
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
