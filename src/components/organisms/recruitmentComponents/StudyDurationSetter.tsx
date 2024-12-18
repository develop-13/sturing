import Text from "@/components/atoms/Text";
import React from "react";
import MonthCalendar from "../infoBox/CustomCalendar/MonthCalendar";

function StudyDurationSetter({
  currentDuration,
  handleSetStudyDuration,
}: {
  currentDuration: { startDate: Date | null; endDate: Date | null };
  handleSetStudyDuration: (
    startDate: Date | null,
    endDate: Date | null
  ) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <Text size="xl" weight="bold">
        스터디 상세정보를 입력해 주세요{" "}
      </Text>
      <div className="flex flex-col gap-4">
        <Text>스터디 진행 기간</Text>
        <MonthCalendar
          currentDate={new Date()}
          duration={currentDuration}
          onChange={handleSetStudyDuration}
        />
      </div>
    </div>
  );
}

export default StudyDurationSetter;
