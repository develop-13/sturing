"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import StudyOverviewItem from "../molecules/StudyOverviewItem";
import {
  TabButtonGroup,
  TInactiveStudyDataSet,
  TInactiveSelectedOption,
} from "../organisms/ButtonGroup";
import InfoBox from "../organisms/InfoBox";
import StudyOverview from "../organisms/StudyOverview";
import Header from "../organisms/Header";
import { fetchStudyDetail } from "@/api/fetchStudyDetail";
import { TStudy } from "@/types/study";
import TitleLink from "../molecules/TitleLink";
import ButtonLabel from "../molecules/ButtonLabel";
import UserInfoItem from "../molecules/UserInfoItem";

type IconAtmosphereMapping = {
  [key: string]: [string, JSX.Element];
};

const iconAtmosphereMapping: IconAtmosphereMapping = {
  serious: ["진지한", <Icon type="SERIOUS" size={16} />],
  friendly: ["친근한", <Icon type="FRIENDLY" size={16} />],
  professional: ["전문적인", <Icon type="PROFESSIONAL" size={16} />],
};

const dataSet: TInactiveStudyDataSet = new Map([
  ["info", "정보"],
  ["member", "팀원"],
]);

function StudyDetailPage() {
  const router = useRouter();
  const params = useParams<{ sid: string }>();
  const [selected, setSelected] = useState<TInactiveSelectedOption>(null);
  const [studyInfoBoxTop, setStudyInfoBoxTop] = useState(0);
  const [memberInfoBoxTop, setMemberInfoBoxTop] = useState(0);
  const boxRef = {
    info: useRef<HTMLDivElement>(null),
    member: useRef<HTMLDivElement>(null),
  };

  const [studyDetail, setStudyDetail] = useState<TStudy | undefined>(undefined);

  useEffect(() => {
    const data = fetchStudyDetail(params.sid);
    setStudyDetail(data);
    console.log(data);
  }, [params.sid]);

  const onClickBtn = (selectedOption: TInactiveSelectedOption) => {
    setSelected((prev) => selectedOption);
    switch (selectedOption) {
      case "info":
        window.scrollTo({ top: studyInfoBoxTop, behavior: "smooth" });
        break;
      case "member":
        window.scrollTo({ top: memberInfoBoxTop, behavior: "smooth" });
        break;
    }
  };

  const getInfoBoxTop =
    (setInfoBoxTop: (infoBoxTop: number) => void) => (infoBoxTop: number) => {
      setInfoBoxTop(infoBoxTop);
    };

  if (!studyDetail) return null;
  return (
    <div className="bg-gray-100">
      <Header
        position="absolute"
        leftSlot={
          <Icon
            type="BACK"
            color="text-white"
            onClick={() => {
              router.back();
            }}
          />
        }
        rightSlot={
          <div className="flex gap-[12px] items-center">
            <Icon type="SHARE" color="text-white" />
            <Icon type="MORE" color="text-white" />
          </div>
        }
      />
      <StudyOverview
        props={{
          ...studyDetail,
        }}
      />
      <TabButtonGroup
        onClick={onClickBtn}
        selectedOption={selected}
        dataSet={dataSet}
      />

      <section className="flex flex-col gap-[16px] study_detail_main px-[16px]">
        <ul className="flex flex-col gap-[12px] border-b pt-[12px] pb-[20px] border-gray-300 study_detail_overview">
          <StudyOverviewItem
            icon={<Icon type="MEMBERS" />}
            name="팀원"
            content={"최대 " + studyDetail?.maxParticipants + "명"}
          />
          <StudyOverviewItem
            icon={<Icon type="DATE_COLOR" />}
            name="일정"
            content={
              studyDetail?.dayOfWeek + "요일" + " " + studyDetail?.startTime
            }
          />
          <StudyOverviewItem
            icon={<Icon type="CHECKBOX" />}
            name="과제"
            content="스터디 게시판 사진 인증"
          />
          <StudyOverviewItem
            icon={<Icon type="LOCATION_COLOR" />}
            name="위치"
            content={studyDetail?.location + ""}
          />
        </ul>
        <InfoBox
          theme="white"
          getInfoBoxTop={getInfoBoxTop(setStudyInfoBoxTop)}
          ref={boxRef.info}
        >
          <TitleLink
            props={{
              title: "스터디 정보",
              hasArrow: true,
              arrowColor: "gray-300",
            }}
          />
          <Divider type="row" />
          <div className="flex gap-[4px]">
            <Button theme="primary" shape="tag">
              <Text size="xs" weight="bold" color="white">
                {studyDetail?.type}
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                {studyDetail?.category}
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Icon type="STAR" />
              <Text size="xs" weight="bold" color="main">
                {studyDetail?.rate}
              </Text>
            </Button>
          </div>
          <Text size="sm" weight="bold">
            {studyDetail?.title}
          </Text>
        </InfoBox>
        <InfoBox theme="white">
          <Text size="sm" weight="bold">
            해당 스터디의 분위기
          </Text>
          <Divider type="row" />
          <div className="flex gap-[6px]">
            {studyDetail?.atmosphere.map((it, idx) => (
              <ButtonLabel
                key={idx}
                datas={{
                  theme: "secondary",
                  icon: iconAtmosphereMapping[it][1],
                  role: "studyItem",
                  text: iconAtmosphereMapping[it][0],
                }}
              />
            ))}
          </div>
        </InfoBox>
        <InfoBox
          theme="white"
          getInfoBoxTop={getInfoBoxTop(setMemberInfoBoxTop)}
          ref={boxRef.member}
        >
          <Text size="sm" weight="bold">
            해당 스터디에서 원하는 팀원
          </Text>
          <Divider type="row" />
          <div className="flex gap-[6px]">
            {studyDetail?.desiredMember.ageRange && (
              <ButtonLabel
                key="ageRange"
                datas={{
                  theme: "secondary",
                  role: "studyItem",
                  text: studyDetail?.desiredMember.ageRange,
                }}
              />
            )}
            {studyDetail?.desiredMember.studyLevel && (
              <ButtonLabel
                key="studyLevel"
                datas={{
                  theme: "secondary",
                  role: "studyItem",
                  text: studyDetail?.desiredMember.studyLevel,
                }}
              />
            )}
          </div>
          <div className="flex gap-[6px]">
            {studyDetail?.desiredMember.roles &&
              studyDetail?.desiredMember.roles.map((role, idx) => (
                <ButtonLabel
                  key={role}
                  datas={{
                    theme: "secondary",
                    role: "studyItem",
                    text: role,
                  }}
                />
              ))}
          </div>
        </InfoBox>
        <InfoBox theme="white">
          <div className="flex gap-[8px]">
            <Text size="sm" weight="bold">
              팀원 프로필
            </Text>
            <Text size="sm" weight="bold" color="main">
              {studyDetail?.currentParticipants.length +
                "/" +
                studyDetail?.maxParticipants}
            </Text>
          </div>
          <Divider type="row" />
          <div className="flex flex-col gap-2">
            {studyDetail?.currentParticipants?.map((participant, idx) => {
              return (
                <UserInfoItem
                  key={participant.userId}
                  name={participant.userName}
                  role={participant.role}
                  isCreator={participant.userId === studyDetail.creatorId}
                  profileImage={
                    participant.profileImage ||
                    "/img/profile/defaultProfileImage.png"
                  }
                />
              );
            })}
          </div>
        </InfoBox>
      </section>
    </div>
  );
}

export default StudyDetailPage;
