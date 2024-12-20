import { TStudyOverview } from "@/types/study";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import React from "react";

const getPeriod = (startDate: string, endDate: string) => {
  // ISO 형식 문자열을 Date 객체로 변환
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 날짜 차이를 밀리초로 계산
  const diffTime = Math.abs(end.getTime() - start.getTime());
  // 밀리초를 일 단위로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // 일 단위를 주 단위로 변환
  const diffWeeks = Math.ceil(diffDays / 7);

  return diffWeeks;
};

const getDateText = (date: string) => {
  const dateObj = new Date(date);
  const [year, month, dateSpecific] = [
    dateObj.getFullYear(),
    dateObj.getMonth(),
    dateObj.getDate(),
  ];

  return `${year}년 ${month + 1}월 ${dateSpecific}일`;
};

function StudyOverview({ props }: { props: TStudyOverview }) {
  const { startDate, endDate } = props.period;

  return (
    <div
      className="h-[287px] bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(21, 21, 21, 0.1), rgba(21, 21, 21, 1)), url(${props.imgSrc})`,
      }}
    >
      <div className="flex flex-col items-center gap-[12px] text-center 	">
        <div className="flex gap-[4px]">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              {props.type}
            </Text>
          </Button>
          {props.categories.map((category) => {
            return (
              <Button theme="secondary" shape="tag" key={category}>
                <Text size="xs" weight="bold" color="main">
                  {category}
                </Text>
              </Button>
            );
          })}
        </div>
        <Text size="xl" weight="bold" color="white">
          {props.title}
        </Text>
        <InfoTags theme="transparent" padding={0}>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-400">
              {getPeriod(startDate, endDate)}주 진행
            </Text>
          </Button>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-400">
              {`${getDateText(startDate)}부터 시작`}
            </Text>
          </Button>
        </InfoTags>
      </div>
    </div>
  );
}

export default React.memo(StudyOverview);
