"use client";
import { useContext, useEffect } from "react";
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
import { useRouter } from "next/navigation";
import {
  ModalContextProps,
  ModalProviderContext,
} from "../organisms/ModalProvider";

function MyStudyPage() {
  const router = useRouter();

  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  const modalInfo: ModalContextProps = useContext(ModalProviderContext);
  const { openModal } = modalInfo;

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user]);

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
