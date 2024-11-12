import Link from "next/link"; // Link 컴포넌트 import
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import StudyImageBox from "../molecules/StudyImageBox";
import { TStudyItem } from "@/types/study";

export default function StudyBox({ props }: { props: TStudyItem }) {
  let startDateMonth = new Date(props.period.startDate).getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
  let startDate = new Date(props.period.startDate).getDate();
  let endDateMonth = new Date(props.period.endDate).getMonth() + 1;
  let endDate = new Date(props.period.endDate).getDate();

  return (
    <Link href={`/study/${props._id}`}>
      <div className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="flex flex-col w-[182px]">
          <StudyImageBox
            src={props.imgSrc || "/img/studyItem/studyItemImg1.png"}
            dayOfWeek={props.dayOfWeek}
            startTime={props.time?.startTime}
          />
          <div className="flex flex-row gap-2 pt-3">
            <Button theme="primary" shape="tag">
              <Text size="xs" weight="bold" color="white">
                {props.type}
              </Text>
            </Button>
            <Button theme="secondary" shape="tag" key={props.categories[0]}>
              <Text size="xs" weight="bold" color="main">
                {props.categories[0]}
              </Text>
            </Button>
          </div>
          <h1 className="text-[16px] font-bold pt-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {props.title}
          </h1>
          <div className="pt-2">
            <InfoTags theme="transparent">
              <div className="flex items-center gap-[2px]">
                <Icon type="DATE" />
                <Text size="xs" weight="bold" color="gray-600">
                  {`${startDateMonth}.${startDate}~${endDateMonth}.${endDate}`}
                </Text>
              </div>
              <div className="flex items-center gap-[1px]">
                <Icon type="LOCATION" />
                <Text size="xs" weight="bold" color="gray-600">
                  {props.location}
                </Text>
              </div>
            </InfoTags>
          </div>
          <Divider type="row" color="gray-400" my={8} />
          <Text size="xs" weight="bold" color="gray-700">
            {"모집 중 " +
              props.currentMembers?.length +
              "/" +
              props.maxMembersNum}
          </Text>
        </div>
      </div>
    </Link>
  );
}
