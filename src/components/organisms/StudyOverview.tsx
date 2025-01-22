import { TStudyOverview } from "@/types/study";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import React from "react";
import Image from "next/image"; // next/image 사용

const getPeriod = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7);
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
    <div className="relative h-[287px] flex items-center justify-center">
      {/* Image 컴포넌트를 사용해 배경 이미지 설정 */}
      <Image
        src={props.imgSrc as string}
        alt={props.title}
        layout="fill" // 부모를 기준으로 가득 채움
        objectFit="cover" // 이미지 비율 유지하며 채움
        objectPosition="center" // 이미지 정렬
        priority // 중요한 이미지인 경우 우선 로드
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-[12px] text-center">
        <div className="flex gap-[4px]">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              {props.type}
            </Text>
          </Button>
          {props.categories.map((category) => (
            <Button theme="secondary" shape="tag" key={category}>
              <Text size="xs" weight="bold" color="main">
                {category}
              </Text>
            </Button>
          ))}
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
