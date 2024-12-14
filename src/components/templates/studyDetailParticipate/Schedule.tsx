import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import ScheduleCreator from "@/components/organisms/ScheduleCreator";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "@/components/organisms/auth-components/UserStatusProvider";
import MonthCalendar from "@/components/organisms/infoBox/CustomCalendar/MonthCalendar";
import ScheduleViewerInfoBox from "@/components/organisms/infoBox/ScheduleViewerInfoBox";
import { TJoiningStudy_Client, TSchedule } from "@/types/study";
import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { v4 } from "uuid";

type TScheduleSection = {
  studyId: string;
  handleUpdateSchedules: (schedules: TSchedule[]) => void;
  schedules: TJoiningStudy_Client["schedules"];
};

const deleteServerSchedule = async (
  scheduleId: string,
  studyId: string,
  userEmail: string
) => {
  try {
    const response = await fetch(`/joiningStudy/${studyId}/api`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scheduleId, // 클라이언트에서 보낸 schedule 데이터
        studyId, // 해당 스터디의 ID
        userEmail,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("서버에서 스케줄이 성공적으로 삭제되었습니다:", data);
    } else {
      console.error("서버 오류:", data.message);
    }
  } catch (error) {
    console.error("서버 요청 중 오류 발생:", error);
  }
};

const addServerSchedule = async (
  schedule: TSchedule,
  studyId: string,
  userEmail: string
) => {
  try {
    const response = await fetch(`/joiningStudy/${studyId}/api`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        schedule, // 클라이언트에서 보낸 schedule 데이터
        studyId, // 해당 스터디의 ID
        userEmail,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("서버에서 스케줄이 성공적으로 추가되었습니다:", data);
    } else {
      console.error("서버 오류:", data.message);
    }
  } catch (error) {
    console.error("서버 요청 중 오류 발생:", error);
  }
};
const patchServerSchedule = async () => {};

// schedules에서 today의 schedule을 골라줘
export const getTodaySchedule = (
  schedules: TSchedule[],
  today: Date
): TSchedule[] => {
  // Extract year, month, and date from `today`
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth(); // Note: 0-based (January is 0)
  const todayDate = today.getDate();

  // Filter schedules based on matching year, month, and date
  return schedules.filter((schedule) => {
    const scheduleDate = new Date(schedule.date);
    return (
      scheduleDate.getFullYear() === todayYear &&
      scheduleDate.getMonth() === todayMonth &&
      scheduleDate.getDate() === todayDate
    );
  });
};

function Schedule({
  schedules,
  handleUpdateSchedules,
  studyId,
}: TScheduleSection) {
  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  const myUserEmail = session?.user.email || "none";

  const [today, setToday] = useState(new Date());
  const [isCreatingNewSchedule, setIsCreatingNewSchedule] = useState(false);

  const rootLayout = useRef<Element | null>(null); // useRef로 관리
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeModal = () => {
    setIsCreatingNewSchedule(false);
  };

  const todaySchedules = getTodaySchedule(schedules, today);

  useEffect(() => {
    // 클라이언트 측에서 document에 접근하여 rootLayout 참조 설정
    rootLayout.current = document.getElementById("rootLayout");
  }, []);

  const handleSetToday = (date: number | string) => {
    setToday(new Date(today.getFullYear(), today.getMonth(), Number(date)));
  };

  const addSchedule = async (schedule: TSchedule) => {
    const updatedSchedules = [...schedules, schedule];
    handleUpdateSchedules(updatedSchedules); // 클라이언트 스케줄 추가 로직
    // 서버 스케줄 추가로직
    await addServerSchedule(schedule, studyId, myUserEmail);
  };

  const deleteSchedule = async (scheduleId: string) => {
    const toDelete = prompt("정말 삭제하시겠습니까? 네 라고 입력해주세요");
    if (!toDelete) return;

    const updatedSchedules = schedules.filter(
      (schedule) => schedule.scheduleId !== scheduleId // 클라이언트 스케줄 삭제로직
    );
    handleUpdateSchedules(updatedSchedules); // 클라이언트 스케줄 추가 로직

    await deleteServerSchedule(scheduleId, studyId, myUserEmail);
  };

  return (
    <div className="px-4 py-5 flex flex-col gap-4">
      <MonthCalendar
        today={today}
        handleSetToday={handleSetToday}
        schedules={schedules}
      />

      <Button
        onClick={() => {
          setIsCreatingNewSchedule((prev) => !prev);
        }}
        theme="secondary"
        extraCss=" p-1 rounded-[5px] hover:bg-mainColor hover:text-white "
      >
        <Text size="xs" weight="bold">
          새 스케줄 추가하기
        </Text>
      </Button>
      <div className="overflow-y-scroll flex flex-col gap-5 h-[200px]">
        {todaySchedules.map((schedule) => (
          <ScheduleViewerInfoBox
            key={schedule.scheduleId}
            todaySchedule={schedule}
            deleteSchedule={deleteSchedule}
          />
        ))}
      </div>

      {isCreatingNewSchedule &&
        rootLayout.current &&
        createPortal(
          <div className="w-[375px] h-full fixed top-0 z-50 flex items-center bg-black bg-opacity-70">
            <ScheduleCreator
              myUserEmail={myUserEmail}
              ref={modalRef}
              studyId={studyId}
              today={today}
              closeModal={closeModal}
              addSchedule={addSchedule}
            />
          </div>,
          rootLayout.current // useRef로 관리된 최상단page 참조
        )}
    </div>
  );
}

export default Schedule;
