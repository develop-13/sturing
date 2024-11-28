import React from "react";
import InfoBox from "../infoBox/InfoBox";
import Text from "../../atoms/Text";
import Divider from "../../atoms/Divider";

type TCustomCalendar = {
  currentDate: Date;
  handleCurrentDate: (selectedDate: Date) => void; // 클릭된 날짜를 받는 함수
};

const renderCalendarItem = (
  currentDate: Date,
  handleCurrentDate: (date: Date) => void
) => {
  // 오늘 날짜
  const today = currentDate.getDate();

  // 오늘 날짜의 요일 (0: 일요일, 6: 토요일)
  const dayOfWeek = currentDate.getDay();

  // 이번 주 일요일 구하기
  const sundayDateObj = new Date(currentDate);
  sundayDateObj.setDate(currentDate.getDate() - dayOfWeek); // 오늘에서 요일만큼 빼면 일요일
  const sundayDate = sundayDateObj.getDate();

  // 요일 배열
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  // 날짜와 요일을 생성
  const dateDayArr = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sundayDateObj);
    date.setDate(sundayDate + i);
    dateDayArr.push({
      day: days[i],
      date: date.getDate(),
      fullDate: date, // 클릭 이벤트에서 사용할 전체 날짜 객체
      isToday: date.getDate() === today, // 오늘 날짜인지 확인
    });
  }

  // JSX를 반환
  return (
    <div className="grid grid-cols-7 gap-2 w-full text-center text-sm font-bold">
      {dateDayArr.map(({ day, date, fullDate, isToday }, idx) => (
        <div
          key={idx}
          className={`flex flex-col gap-[12px] items-center justify-center cursor-pointer ${
            idx === 0
              ? "text-red-500" // 일요일 스타일
              : idx === 6
              ? "text-blue-500" // 토요일 스타일
              : "text-black"
          }`}
          onClick={() => handleCurrentDate(fullDate)} // 클릭 이벤트 추가
        >
          <Text>{day}</Text>
          <Text
            className={`${
              isToday
                ? "bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                : "w-8 h-8 flex items-center justify-center"
            }`}
          >
            {date}
          </Text>
        </div>
      ))}
    </div>
  );
};

function WeekCalendar(props: TCustomCalendar) {
  return (
    <InfoBox theme="white">
      <Text size="base" weight="bold">
        {props.currentDate.getMonth() + 1}월
      </Text>
      <Divider type="row" />
      {renderCalendarItem(props.currentDate, props.handleCurrentDate)}
    </InfoBox>
  );
}

export default WeekCalendar;
