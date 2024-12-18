import React, { useState } from "react";
import InfoBox from "../InfoBox";
import Text from "@/components/atoms/Text";
import Divider from "@/components/atoms/Divider";
import { TSchedule } from "@/types/study";

const generateCalendar = (
  year: number,
  month: number,
  schedules: TSchedule[]
) => {
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();
  const getLastDateOfMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const daySet = new Set();

  schedules.forEach((schedule) => {
    const date = new Date(schedule.date);
    const dateKey = [date.getFullYear(), date.getMonth(), date.getDate()].join(
      "-"
    );
    daySet.add(dateKey);
  });

  const firstDay = getFirstDayOfMonth(year, month); // 현재달의 첫날의 요일
  const lastDate = getLastDateOfMonth(year, month); // 현재달의 마지막날

  const dates = [];

  // 이전 달
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({ day: "", year, month, hasSchedule: false });
  }

  // 현재 달
  for (let i = 1; i <= lastDate; i++) {
    const currentDate = new Date(year, month - 1, i);
    const key = [
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    ].join("-");

    if (daySet.has(key)) {
      dates.push({ day: i, year, month, hasSchedule: true });
    } else {
      dates.push({ day: i, year, month, hasSchedule: false });
    }
  }
  return dates;
};

const MonthCalendar = ({
  today,
  handleSetToday,
  schedules,
}: {
  today: Date;
  handleSetToday: (date: number | string) => void;
  schedules: TSchedule[];
}) => {
  const [currentYear, currentMonth, currentDate] = [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  ];

  const getIsToday = (date: {
    day: number | string;
    year: number;
    month: number;
    hasSchedule: boolean;
  }) => {
    return (
      date.year === currentYear &&
      date.month === currentMonth &&
      Number(date.day) === currentDate
    );
  };

  console.log(schedules);

  const dates = generateCalendar(currentYear, currentMonth, schedules);

  return (
    <InfoBox theme="white">
      <div className="mx-auto font-sans font-bold">
        {/* <div className="text-xl font-bold mb-2">{`${year}년 ${month}월`}</div> */}
        <Text>{`${currentYear}년 ${currentMonth}월`}</Text>
        <Divider type="row" my={10} />
        <div className="grid grid-cols-7 gap-2 ">
          {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
            <Text key={index} className=" text-gray-800 text-center">
              {day}
            </Text>
          ))}
          {dates.map((date, index) => {
            const isToday = getIsToday(date);
            return (
              <div
                key={index}
                onClick={() => handleSetToday(date.day)}
                className={`relative cursor-pointer flex items-center justify-center w-8 h-8 rounded-full text-sm leading-5
              ${isToday ? "bg-blue-500 text-white font-bold" : ""}
              ${
                index % 7 === 0
                  ? "text-red-500"
                  : index % 7 === 6
                  ? "text-blue-500"
                  : ""
              }`}
              >
                {" "}
                {date.hasSchedule && (
                  <div className="w-1 h-1 rounded-full bg-mainColor absolute top-0 "></div>
                )}
                {date.day}
              </div>
            );
          })}
        </div>
      </div>
    </InfoBox>
  );
};

export default MonthCalendar;
