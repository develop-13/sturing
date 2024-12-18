"use client";

import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

export interface Tduration {
  startDate: Date | null;
  endDate: Date | null;
}

const formatRange = (start: Date | null, end: Date | null): string => {
  if (!start) return "";
  const startString = `${start.getFullYear()}.${
    start.getMonth() + 1
  }.${start.getDate()}`;
  if (!end) return startString;
  const endString = `${end.getFullYear()}.${
    end.getMonth() + 1
  }.${end.getDate()}`;
  return `${startString}~${endString}`;
};

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
  onChange?: (duration: Tduration) => void;
}

const MonthCalendar: React.FC<MonthCalendarProps> = ({
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
      onChange && onChange({ startDate: day, endDate: null });
    } else if (startDate && !endDate) {
      // 시작날짜가 정해져있고 끝 날짜는 안정해져 있을 떄, 임의의 날짜를 클릭하면
      if (day > startDate) {
        // 클릭한 날짜가 시작 날짜보다 늦은 날짜라면 클릭한 날짜를 끝 날짜로.
        setEndDate(day);
        onChange && onChange({ startDate, endDate: day });
      } else if (sameDate(day, startDate)) {
        // 같은 날짜를 두 번 클릭하면 무효
        // Reset selection
        setStartDate(null);
        setEndDate(null);
        onChange && onChange({ startDate: null, endDate: null });
      } else {
        // 클릭한 날짜가 시작날짜보다 빠른 날짜라면 클릭한 날짜를 시작 날짜로.
        // Set new startDate
        setStartDate(day);
        onChange && onChange({ startDate: day, endDate });
      }
    } else {
      // 시작날짜도, 끝 날짜도 안정해져 있을 떄
      // Set startDate to clicked date
      setStartDate(day);
      setEndDate(null);
      onChange && onChange({ startDate: day, endDate: null });
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

  // Generate calendar grid
  const generateCalendar = () => {
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];

    // visibleMonth -- 어떤 달의 1일.. 을 기준으로 달력 데이터를 생성
    // 달력데이터는 week으로 이루어짐

    const firstDayOfMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      visibleMonth.getFullYear(),
      visibleMonth.getMonth() + 1,
      0
    );
    const totalDays = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay();
    // 해당달의 1일의 요일

    // Fill the first week with nulls until the first day
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }
    // 일요일부터 해당달의 1일의 요일까지는 표시하지 않을거니까 null을 넣음
    // 하지만 어쨌든 달력에 존재는 해야하니까 넣는거임

    for (let date = 1; date <= totalDays; date++) {
      const dayDate = new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth(),
        date
      ); // 1일부터 해당달의 마지막 일자까지 각 달의 년,월,일을 넣음
      currentWeek.push(dayDate);

      if (currentWeek.length === 7) {
        // 일주일 마다 끊어서 넣음
        weeks.push(currentWeek);
        currentWeek = [];
      }
    } //해당달의 1일부터 마지막날까지 다 구한뒤에

    // Fill the last week with nulls if necessary
    // 31일 이후에 마지막 주의 날짜가 남았다면 빈칸 처리
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const weeks = generateCalendar();

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

function page() {
  const [duration, setDuration] = useState<Tduration>({
    startDate: null,
    endDate: null,
  });

  return (
    <div>
      <MonthCalendar
        currentDate={new Date()}
        duration={duration}
        onChange={(newDuration) => setDuration(newDuration)}
      />
    </div>
  );
}

export default page;
