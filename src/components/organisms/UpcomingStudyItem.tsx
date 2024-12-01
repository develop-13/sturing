import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import StudyInfoItem from "./infoBox/InfoBox";

function UpcomingStudyItem() {
  return (
    <div className="px-[16px] pt-[20px] pb-[70px] flex flex-col gap-[20px] bg-gradient-to-br from-custom-blue-30 to-custom-pink-30">
      <Text size="xl" weight="bold">
        다가오는 스터디
      </Text>
      <StudyInfoItem theme="white">
        <div className="flex gap-[4px]">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              D-3
            </Text>
          </Button>
          <Button theme="secondary" shape="tag">
            <Text size="xs" weight="bold" color="main">
              6월 7일
            </Text>
          </Button>
        </div>
        <Text size="base" weight="bold">
          UXUI 디자이너 본질 강화 피그마 스터디
        </Text>
        <InfoTags theme="gray">
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-700">
              스타벅스 종로점
            </Text>
          </Button>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-700">
              06.07(토) 오후 8:00 - 9:00
            </Text>
          </Button>
        </InfoTags>
      </StudyInfoItem>
    </div>
  );
}

export default UpcomingStudyItem;
