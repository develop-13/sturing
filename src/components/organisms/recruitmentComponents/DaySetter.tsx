import Text from "@/components/atoms/Text";
import Select from "@/components/molecules/Select";
import { HandleStateChange } from "@/components/pages/RecruitmentPage";
import { TStudyRecruitment } from "@/types/study";
import React, { useCallback } from "react";

const days = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

const times = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

type TDaySetter = {
  dayOfWeek: string;
  time: {
    startTime: string;
    endTime: string;
  };
  handleStateChange: HandleStateChange<TStudyRecruitment>;
};

function DaySetter(props: TDaySetter) {
  const { dayOfWeek, time, handleStateChange } = props;
  const { startTime, endTime } = time;

  const handleSetDay = useCallback(
    (type: string, day: string) => {
      handleStateChange("dayOfWeek", day);
    },
    [dayOfWeek]
  );
  const handleSetTime = useCallback(
    (type: string, time: string) => {
      switch (type) {
        case "startTime":
          handleStateChange("time", { endTime, startTime: time });
          break;

        case "endTime":
          handleStateChange("time", { endTime: time, startTime });
          break;
      }
    },
    [startTime, endTime]
  );

  return (
    <div>
      <div className="flex flex-col gap-[11px]">
        <div>
          <Text size="sm" weight="bold">
            스터디 진행 요일
          </Text>
          <Select datas={days} type="day" setterFuncs={handleSetDay} />
        </div>
        <div>
          <Text size="sm" weight="bold">
            스터디 시작 시간
          </Text>
          <Select datas={times} type="startTime" setterFuncs={handleSetTime} />
        </div>
        <div>
          <Text size="sm" weight="bold">
            스터디 종료시간
          </Text>
          <Select datas={times} type="endTime" setterFuncs={handleSetTime} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(DaySetter);
