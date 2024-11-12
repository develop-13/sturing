import { TStudyOverview } from "@/types/study";
import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";

const getPeriod = (startDate: string, endDate: string): number => {
  const currentYear = new Date().getFullYear();

  // startDate와 endDate를 MM-DD 형식에서 월과 일로 분리
  const [startMonth, startDay] = startDate.split("-").map(Number);
  const [endMonth, endDay] = endDate.split("-").map(Number);

  // 현재 연도와 분리된 월, 일로 Date 객체 생성
  const start = new Date(currentYear, startMonth - 1, startDay); // 월은 0부터 시작하므로 -1
  const end = new Date(currentYear, endMonth - 1, endDay);

  console.log(`start=${start} end=${end}`); // 확인용 로그

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

  return `${year}년 ${month}월 ${dateSpecific}일`;
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

export default StudyOverview;
