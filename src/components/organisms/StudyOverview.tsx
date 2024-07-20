import Image from "../atoms/Image";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";

type TStudyOverView = {
  src: string;
  type: string;
  title: string;
  period: string;
  category: string;
  startDate: string;
}; // 추후에 studyDatas 활용

function StudyOverview() {
  return (
    <div
      className="h-[287px] bg-cover bg-center flex items-center justify-center mx-[-16px]"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(21, 21, 21, 0.1), rgba(21, 21, 21, 1)), url('/img/study-overview-example.png')`,
      }}
    >
      <div className="flex flex-col items-center gap-[12px]">
        <div className="flex gap-[4px]">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              오프라인
            </Text>
          </Button>
          <Button theme="secondary" shape="tag">
            <Text size="xs" weight="bold" color="main">
              디자인
            </Text>
          </Button>
        </div>
        <Text size="xl" weight="bold" color="white">
          AI 활용 UXUI 포트폴리오 스터디 모집
        </Text>
        <InfoTags theme="transparent" padding={0}>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-400">
              4주 진행
            </Text>
          </Button>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-400">
              06.21(일)부터 시작
            </Text>
          </Button>
        </InfoTags>
      </div>
    </div>
  );
}

export default StudyOverview;
