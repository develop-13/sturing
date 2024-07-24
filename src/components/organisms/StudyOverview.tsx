import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";

type TStudyOverView = {
  type: "온라인" | "오프라인";
  category: string;
  title: string;
  startDate: string;
  endDate: string;
  src: string;
};

const getPeriod = (startDate: string, endDate: string): number => {
  const currentYear = new Date().getFullYear();
  const start = new Date(`${currentYear}-${startDate}`);
  const end = new Date(`${currentYear}-${endDate}`);

  // 날짜 차이를 밀리초로 계산 (number 타입으로 변환)
  const diffTime = Math.abs(end.getTime() - start.getTime());
  // 밀리초를 일 단위로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  // 일 단위를 주 단위로 변환
  const diffWeeks = Math.ceil(diffDays / 7);
  return diffWeeks;
};
function StudyOverview({ props }: { props: TStudyOverView }) {
  return (
    <div
      className="h-[287px] bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(21, 21, 21, 0.1), rgba(21, 21, 21, 1)), url(${props.src})`,
      }}
    >
      <div className="w-[75%] flex flex-col items-center gap-[12px] text-center 	">
        <div className="flex gap-[4px]">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              {props.type}
            </Text>
          </Button>
          <Button theme="secondary" shape="tag">
            <Text size="xs" weight="bold" color="main">
              {props.category}
            </Text>
          </Button>
        </div>
        <Text size="xl" weight="bold" color="white">
          {props.title}
        </Text>
        <InfoTags theme="transparent" padding={0}>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-400">
              {getPeriod(props.startDate, props.endDate)}주 진행
            </Text>
          </Button>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-400">
              {`${props.startDate}부터 시작`}
            </Text>
          </Button>
        </InfoTags>
      </div>
    </div>
  );
}

export default StudyOverview;
