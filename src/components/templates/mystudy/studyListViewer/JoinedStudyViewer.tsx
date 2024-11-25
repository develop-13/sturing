import Divider from "@/components/atoms/Divider";
import Icon from "@/components/atoms/Icon";
import Text from "@/components/atoms/Text";
import Button from "@/components/molecules/Button";
import InfoTags from "@/components/molecules/InfoTags";
import InfoBox from "@/components/organisms/infoBox/InfoBox";
import { TStudy } from "@/types/study";
import { formatDate } from "@/utils/formatDate";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import Link from "next/link";

function JoinedStudyViewer({ userEmail }: { userEmail: string }) {
  const [currentStudyTab, setCurrentStudyTab] = useState<
    "recruiting" | "inProgress"
  >("inProgress");

  const [currentData, setCurrentData] = useState({
    recruiting: [],
    inProgress: [],
  });

  useEffect(() => {
    async function getStudiesInParticipate() {
      try {
        const res = await fetch(
          `/mystudy/api?userEmail=${userEmail}&type=joinedStudy`
        );
        if (!res.ok) throw new Error("Failed to fetch joined studies");
        const data = await res.json();

        const { onGoingStudies, recrutingStudies } = data;

        setCurrentData((prev) => ({
          recruiting: recrutingStudies,
          inProgress: onGoingStudies,
        }));
      } catch (error) {
        console.error(error);
      }
    }

    getStudiesInParticipate();
  }, [currentStudyTab, userEmail]); // 의존성 배열에 currentStudyTab과 userEmail 추가

  console.log(currentData);

  return (
    <div className="h-[300px] overflow-scroll bg-gray-100 px-[16px] pt-[20px] pb-[40px] flex flex-col gap-[16px]">
      <div className="flex gap-3">
        <Button
          shape="listItem"
          extraCss="p-4 border-2 border-[#D9E3FF]"
          activeClassname=" bg-[#ECF1FF] border-[#A0B8FF] "
          onClick={() => {
            setCurrentStudyTab("inProgress");
          }}
          isActive={currentStudyTab === "inProgress"}
        >
          진행 중
        </Button>
        <Button
          shape="listItem"
          extraCss="p-4 border-2 border-[#D9E3FF]"
          activeClassname=" bg-[#ECF1FF] border-[#A0B8FF] "
          onClick={() => {
            setCurrentStudyTab("recruiting");
          }}
          isActive={currentStudyTab === "recruiting"}
        >
          진행 예정
        </Button>
      </div>
      {currentData[currentStudyTab].map((study: TStudy) => (
        <Link key={v4()} href={`/joiningStudy/${study._id}`}>
          <InfoBox theme="gradient" key={v4()}>
            <InfoTags theme="transparent">
              <Button theme="transparent" shape="tag">
                <Text size="xs" weight="bold" color="gray-700">
                  {study.type}
                </Text>
              </Button>
              <Button theme="transparent" shape="tag">
                <Text size="xs" weight="bold" color="gray-700">
                  {formatDate(study.period.startDate, "month-day") +
                    "~" +
                    formatDate(study.period.endDate, "month-day")}
                </Text>
              </Button>
              <Button theme="transparent" shape="tag">
                <Text size="xs" weight="bold" color="gray-700">
                  {study.location}
                </Text>
              </Button>
            </InfoTags>
            <Text size="base" weight="bold">
              {study.title}
            </Text>
            <Divider type="row" my={8} />
            <InfoTags theme="white" padding={3} mx={13} className="">
              <Button theme="transparent" shape="tag">
                <Icon type="MEMBERS" />
                <Text size="xs" weight="bold" color="gray-700">
                  팀원 {study.maxMembersNum}명
                </Text>
              </Button>
              <Button theme="transparent" shape="tag">
                <Icon type="DATE_COLOR" />
                <Text size="xs" weight="bold" color="gray-700">
                  매주 {study.dayOfWeek}
                </Text>
              </Button>
              <Button theme="transparent" shape="tag">
                <Icon type="CHECKBOX_COLOR" />
                <Text size="xs" weight="bold" color="gray-700">
                  사진인증
                  {/* {study.tasks} */}
                </Text>
              </Button>
            </InfoTags>
          </InfoBox>
        </Link>
      ))}
    </div>
  );
}

export default JoinedStudyViewer;
