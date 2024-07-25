"use client";
import { useRouter } from "next/navigation";
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import InfoTags from "../molecules/InfoTags";
import StudyImageBox from "../molecules/StudyImageBox";
import { TStudy } from "@/types/study";

export default function StudyBox({ props }: { props: TStudy }) {
  const router = useRouter();
  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.push(`/study/${props.id}`);
      }}
    >
      <div className="flex flex-col">
        <StudyImageBox
          src={props.src}
          dayOfWeek={props.dayOfWeek}
          startTime={props.startTime}
        />
        <div className="flex flex-row gap-2 pt-3">
          <Button theme="primary" shape="tag">
            <Text size="xs" weight="bold" color="white">
              {props.type}
            </Text>
          </Button>
          <Button theme="secondary" shape="tag">
            <Text size="xs" weight="bold" color="main">
              {props.category}
            </Text>{" "}
          </Button>
        </div>
        <h1 className="text-[16px] font-bold pt-2">{props.title}</h1>
        <div className="pt-2">
          <InfoTags theme="transparent">
            <div className="flex items-center gap-[2px]">
              <Icon type="DATE" />
              <Text size="xs" weight="bold" color="gray-600">
                {props.startDate + "~" + props.endDate}
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
            props.currentParticipants.length +
            "/" +
            props.maxParticipants}
        </Text>
      </div>
    </div>
  );
}
