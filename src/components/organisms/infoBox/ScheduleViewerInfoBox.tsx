import React from "react";
import InfoBox from "./InfoBox";
import Text from "@/components/atoms/Text";
import Divider from "@/components/atoms/Divider";
import InfoTags from "@/components/molecules/InfoTags";
import { TSchedule } from "@/types/study";
import Icon from "@/components/atoms/Icon";

type ScheduleViewerInfoBox = {
  todaySchedule: TSchedule;
  deleteSchedule: (scheduleId: string) => void;
};

const days = ["일", "월", "화", "수", "목", "금", "토"];

const onClicDelete = () => {};

const onClickEdit = () => {};

function ScheduleViewerInfoBox({
  todaySchedule,
  deleteSchedule,
}: ScheduleViewerInfoBox) {
  console.log(todaySchedule);
  const {
    date: dateStr,
    scheduleId,
    detail,
    location,
    title,
    startTime,
    endTime,
  } = todaySchedule;
  const dateObj = new Date(dateStr);
  const [month, date, day] = [
    dateObj.getMonth() + 1,
    dateObj.getDate(),
    dateObj.getDay(),
  ];

  return (
    <InfoBox theme="white">
      <div className="flex justify-between">
        <Text weight="bold" size="base">
          {`${month}.${date}(${days[day]})`}
        </Text>
        <div className="flex items-center">
          <Icon
            type="REMOVE"
            onClick={() => {
              deleteSchedule(scheduleId);
            }}
          />
        </div>
      </div>
      <Divider type="row" my={8} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <Text weight="bold" size="base">
            {`${title}`}
          </Text>
          <Text weight="bold" size="sm" color="gray-700">
            {`${detail}`}
          </Text>
        </div>
        <InfoTags theme="gray" className="p-3 text-gray-700">
          <Text size="xs" weight="bold">
            {`${location}`}
          </Text>
          <Text size="xs" weight="bold">
            {`${month}.${date}(${days[day]}) ${startTime} - ${endTime}`}
          </Text>
        </InfoTags>
      </div>
    </InfoBox>
  );
}

export default ScheduleViewerInfoBox;
