import Text from "@/components/atoms/Text";
import React from "react";
import DurationSetter from "../DurationSetter";

function StudyDurationSetter({
  currentDuration,
  handleSetStudyDuration,
}: {
  currentDuration: { startDate: Date; endDate: Date };
  handleSetStudyDuration: (startDate: Date, endDate: Date) => void;
}) {
  return (
    <div>
      {" "}
      <Text size="xl" weight="bold">
        스터디 상세정보를 입력해 주세요{" "}
      </Text>
      <div className="flex flex-col gap-3">
        <Text>스터디 진행 기간</Text>
        <DurationSetter
          duration={currentDuration}
          setDate={handleSetStudyDuration}
        />
      </div>
    </div>
  );
}

export default StudyDurationSetter;
