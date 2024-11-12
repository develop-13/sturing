import { TApply } from "@/types/apply";
import InfoBox from "../../../organisms/infoBox/InfoBox";
import Text from "@/components/atoms/Text";
import InfoTags from "@/components/molecules/InfoTags";
import { v4 } from "uuid";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/molecules/Button";
import { formatDate } from "@/utils/formatDate";

type TWaitingAppliesViewer = { applyData: TApply[] };

function WaitingAppliesViewer(props: TWaitingAppliesViewer) {
  return (
    <div className="bg-gray-100 px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[16px]">
      {props.applyData?.map((applyData) => {
        return (
          <InfoBox theme="white" key={v4()}>
            <div className="flex items-center justify-end mb-2">
              <Text size="sm" color="main">{`${formatDate(
                applyData.applicationDate,
                "full"
              )} 지원`}</Text>
            </div>
            <InfoTags theme="transparent" className="text-sm">
              <Text>
                {applyData.studyType === "online" ? "온라인" : "오프라인"}
              </Text>
              <Text>{`${formatDate(
                applyData.studyStartDate,
                "month-day"
              )}~${formatDate(applyData.studyEndDate, "month-day")}`}</Text>
              <Text>{applyData.studyLocation}</Text>
            </InfoTags>
            <Text size="lg" weight="bold" color="gray-800" className="">
              {applyData.studyTitle}
            </Text>
            <Divider type="row" color="bg-gray-300" classname="mb-4" />
            <div className="flex space-x-4">
              <Button extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100">
                지원서 보기
              </Button>
              <Button extraCss="flex-1 py-2 border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100">
                지원 취소하기
              </Button>
            </div>
          </InfoBox>
        );
      })}
    </div>
  );
}

export default WaitingAppliesViewer;
