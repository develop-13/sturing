import { TSchedule } from "@/types/study";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import StudyInfoItem from "./infoBox/InfoBox";
import { getDateInfo } from "@/utils/formatDate";

function UpcomingScheduleItem(props: TSchedule) {
  const { date, title, location, startTime, endTime } = props;

  const { month, day, dayDifference } = getDateInfo(new Date(date));

  return (
    <div className="px-[16px] pt-[20px] pb-[70px] flex flex-col gap-[20px] bg-gradient-to-br from-custom-blue-30 to-custom-pink-30">
      <Text size="xl" weight="bold">
        나의 일정
      </Text>
      <StudyInfoItem theme="white">
        <div className="flex gap-[4px]">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              {`D-${dayDifference}`}
            </Text>
          </Button>
          <Button theme="secondary" shape="tag">
            <Text size="xs" weight="bold" color="main">
              {`${month}월 ${day}일`}
            </Text>
          </Button>
        </div>
        <Text size="base" weight="bold">
          {title}
        </Text>
        <InfoTags theme="gray">
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-700">
              {location}
            </Text>
          </Button>
          <Button theme="transparent" shape="tag">
            <Text size="xs" weight="bold" color="gray-700">
              {`${startTime}~${endTime}`}
            </Text>
          </Button>
        </InfoTags>
      </StudyInfoItem>
    </div>
  );
}

export default UpcomingScheduleItem;
