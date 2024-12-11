import React, { forwardRef, useContext, useState } from "react";
import Select from "../molecules/Select";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import { TSchedule } from "@/types/study";
import { v4 } from "uuid";

const timeDatas = [
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

type TScheduleCreator = {
  addSchedule: (schedule: TSchedule) => void;
  closeModal: () => void;
  today: Date;
  studyId: string;
  myUserEmail: string;
};

const ScheduleCreator = forwardRef<HTMLDivElement, TScheduleCreator>(
  function ScheduleCreator(props: TScheduleCreator, ref) {
    const [schedule, setChedule] = useState({
      userEmail: props.myUserEmail,
      scheduleId: v4(),
      studyId: props.studyId,
      startTime: "",
      endTime: "",
      date: props.today,
      title: "",
      location: "",
      detail: "",
    });

    const onChangeScheduleHandler = (
      field: keyof typeof schedule,
      value: (typeof schedule)[keyof typeof schedule]
    ) => {
      setChedule({ ...schedule, [field]: value });
    };

    const onClickBtn = () => {
      console.log("schedule");
      console.log(schedule);

      props.addSchedule(schedule);
      props.closeModal();
    };

    return (
      <div
        ref={ref}
        className="bg-white w-full h-full px-3 py-4 flex flex-col gap-5"
      >
        {" "}
        <Text size="base" weight="bold">
          스케줄 추가 양식
        </Text>
        <div>
          <Text size="sm" weight="bold">
            시작 시간
          </Text>
          <Select
            type="startTime"
            datas={timeDatas}
            setterFuncs={(type, time) => {
              onChangeScheduleHandler(type as keyof typeof schedule, time);
            }}
          />
        </div>
        <div>
          <Text size="sm" weight="bold">
            종료 시간
          </Text>
          <Select
            type="endTime"
            datas={timeDatas}
            setterFuncs={(type, time) => {
              onChangeScheduleHandler(type as keyof typeof schedule, time);
            }}
          />
        </div>
        <div>
          <Text size="sm" weight="bold">
            제목
          </Text>
          <div className="w-full border border-gray-300 rounded-[5px] px-4 py-3 flex items-center">
            <input
              onChange={(e) => {
                onChangeScheduleHandler("title", e.target.value);
              }}
              type="text"
              className="w-full h-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
            />
          </div>{" "}
        </div>
        <div>
          <Text size="sm" weight="bold">
            위치
          </Text>
          <div className="w-full border border-gray-300 rounded-[5px] px-4 py-3 flex items-center">
            <input
              onChange={(e) => {
                onChangeScheduleHandler("location", e.target.value);
              }}
              type="text"
              className="w-full h-full border-none outline-none text-[14px] placeholder:font-medium placeholder:text-gray-600"
            />
          </div>{" "}
        </div>
        <div className="flex flex-col">
          <label htmlFor="scheduleDetail">
            <Text size="sm" weight="bold">
              일정
            </Text>
          </label>
          <textarea
            id="scheduleDetail"
            onChange={(e) => {
              onChangeScheduleHandler("detail", e.target.value);
            }}
            cols={10}
            rows={5}
            className="px-4 py-3 border border-gray-300 resize-none outline-none rounded-[5px] text-[14px] placeholder:font-medium placeholder:text-gray-600"
          ></textarea>
        </div>
        <div className="flex gap-4">
          <Button
            theme="ordinary"
            extraCss="p-3 rounded-[5px] flex-2"
            onClick={() => {
              props.closeModal();
            }}
          >
            취소하기
          </Button>
          <Button
            theme="primary"
            extraCss="p-3 rounded-[5px] flex-1"
            onClick={onClickBtn}
          >
            추가하기
          </Button>
        </div>
      </div>
    );
  }
);

export default ScheduleCreator;
