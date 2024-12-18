"use client";

import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import { formatRange, generateCalendar } from "@/utils/Calendar";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface Tduration {
  startDate: Date | null;
  endDate: Date | null;
}

const renderTextByDay = (day: number) => {
  if (day > 9) {
    return <Text>{day}</Text>;
  } else {
    return <Text className="px-1">{day}</Text>;
  }
};

interface MonthCalendarProps {
  currentDate: Date;
  duration: Tduration;
  onChange?: (startDate: Date | null, endDate: Date | null) => void;
}

const MonthCalendarr: React.FC<MonthCalendarProps> = ({
  currentDate,
  duration,
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(duration.startDate);
  const [endDate, setEndDate] = useState<Date | null>(duration.endDate);
  const [visibleMonth, setVisibleMonth] = useState<Date>(currentDate);

  useEffect(() => {
    setStartDate(duration.startDate);
    setEndDate(duration.endDate);
  }, [duration]);

  const sameDate = (d1: Date, d2: Date): boolean => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleDateClick = (day: Date) => {
    // 임의의 날짜를 클릭했을 떄
    if (startDate && endDate) {
      // Reset startDate to clicked date, clear endDate
      // 시작날짜와 끝 날짜의 값이 있는 상태에서 임의의 날짜를 클릭하면 클릭한 날짜가 startDate가 됨
      setStartDate(day);
      setEndDate(null);
      onChange && onChange(day, null);
    } else if (startDate && !endDate) {
      // 시작날짜가 정해져있고 끝 날짜는 안정해져 있을 떄, 임의의 날짜를 클릭하면
      if (day > startDate) {
        // 클릭한 날짜가 시작 날짜보다 늦은 날짜라면 클릭한 날짜를 끝 날짜로.
        setEndDate(day);
        onChange && onChange(startDate, day);
      } else if (sameDate(day, startDate)) {
        // 같은 날짜를 두 번 클릭하면 무효
        // Reset selection
        setStartDate(null);
        setEndDate(null);
        onChange && onChange(null, null);
      } else {
        // 클릭한 날짜가 시작날짜보다 빠른 날짜라면 클릭한 날짜를 시작 날짜로.
        // Set new startDate
        setStartDate(day);
        onChange && onChange(day, endDate);
      }
    } else {
      // 시작날짜도, 끝 날짜도 안정해져 있을 떄
      // Set startDate to clicked date
      setStartDate(day);
      setEndDate(null);
      onChange && onChange(day, null);
    }
  };

  const changeMonth = (offset: number) => {
    const newMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + offset,
      1
    );
    setVisibleMonth(newMonth);
  };

  const weeks = generateCalendar(visibleMonth);

  return (
    <InfoBox theme="white">
      <div className="h-6 flex items-center">
        <Text size="base" weight="bold" color="gray-700">
          {formatRange(startDate, endDate)}
        </Text>
      </div>
      <Divider type="row" />
      <div className="flex items-center justify-between mb-4">
        <Button>
          <Icon
            type="BACK"
            className="float-left"
            width={7}
            height={7}
            onClick={() => changeMonth(-1)}
          />
        </Button>
        <Text className="float-left ml-4" size="base" weight="bold">
          {`${visibleMonth.getFullYear()}년 ${visibleMonth.getMonth() + 1}월`}
        </Text>
        <Button onClick={() => changeMonth(1)}>
          <Icon type="FORWARD" className="float-left" width={7} height={7} />
        </Button>
      </div>
      <table className="w-full p-4 border-gray clear-both">
        <thead>
          <tr>
            <th className="text-red-500">일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th className="text-mainColor">토</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            // 각 주를 순회
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                // 각 날짜를 순회, 각 날짜의 스타일을 적용
                if (day === null) {
                  return <td key={dayIndex}></td>;
                } else {
                  const dayOfWeek = day.getDay();

                  const isStartDate = startDate && sameDate(day, startDate);
                  const isEndDate = endDate && sameDate(day, endDate);
                  const isInRange =
                    startDate && endDate && day >= startDate && day <= endDate;

                  const classes = twMerge(
                    "cursor-pointer text-center p-2",
                    dayOfWeek === 0 && "text-red-500",
                    dayOfWeek === 6 && "text-blue-500",
                    isStartDate || isEndDate ? "p-0" : "",
                    isInRange ? "bg-gray-200" : ""
                  );

                  return (
                    <td
                      key={dayIndex}
                      className={classes}
                      onClick={() => handleDateClick(day)}
                    >
                      {isStartDate || isEndDate ? (
                        <Text className="bg-blue-500 text-white rounded-full p-2 ">
                          {renderTextByDay(day.getDate())}
                        </Text>
                      ) : (
                        <Text> {renderTextByDay(day.getDate())}</Text>
                      )}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </InfoBox>
  );
};

export default MonthCalendarr;
