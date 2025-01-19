"use client";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import StudyOverviewItem from "../molecules/StudyOverviewItem";
import { TabButtonGroup } from "../organisms/ButtonGroup";
import InfoBox from "../organisms/infoBox/InfoBox";
import StudyOverview from "../organisms/StudyOverview";
import Header from "../organisms/Header";
import { TStudy, TStudyDetail, TStudyMember } from "@/types/study";
import TitleLink from "../molecules/TitleLink";
import getTranslation from "@/utils/getTranslation";
import { TStatus } from "@/types/apply";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SessionUser } from "@/app/utils/authOptions";
import { setStudyOnLocalStorage } from "@/utils/localStorageFuncs";
const Divider = dynamic(() => import("../atoms/Divider"), {
  ssr: false,
  loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
});
const ButtonLabel = dynamic(() => import("../molecules/IconLabelButton"), {
  ssr: false,
  loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
});
const UserInfoItem = dynamic(() => import("../molecules/UserInfoItem"), {
  ssr: false,
  loading: () => <></>, // Loading 상태일 때 비어있는 React Fragment 반환
});

const buttonGroupData = ["info", "member"];

const getSignUpButton = (status: TStatus, sid: string) => {
  switch (status) {
    case "joined":
      return (
        <Button shape="full" theme="ordinary" extraCss="p-2">
          <Text color="gray-500" weight="bold">
            이미 참여중인 스터디입니다.
          </Text>
        </Button>
      );

    case "hasApplied":
      return (
        <Button shape="full" theme="ordinary" extraCss="p-2">
          <Text color="gray-500" weight="bold">
            이미 지원한 스터디입니다.
          </Text>
        </Button>
      );

    case "notApplied":
      return (
        <Link href={`/apply/${sid}`} className="h-[48px]">
          <Button shape="full" theme="primary">
            <Text weight="bold">스터디 참여하기</Text>
          </Button>
        </Link>
      );
  }
};

function StudyInfoPage({
  studyInfo,
  status,
  session,
}: {
  studyInfo: TStudy;
  status: TStatus;
  session?: SessionUser;
}) {
  const router = useRouter();
  const params = useParams<{ sid: string }>();
  const [selectedIdx, setSelected] = useState(0);
  const boxRef = {
    info: useRef<HTMLDivElement>(null),
    member: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (session) {
      setStudyOnLocalStorage(studyInfo); // 스터디를 가져오면서 로컬에 저장
    }
  }, []);

  const onClickBtn = (selectedOptionIdx: number) => {
    setSelected(selectedOptionIdx);

    const targetElement = document.getElementById(
      buttonGroupData[selectedOptionIdx]
    );
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100">
      <Header
        position="absolute"
        className="px-4"
        leftSlot={
          <Icon
            type="BACK"
            onClick={() => {
              router.back();
            }}
          />
        }
      />
      <StudyOverview
        props={{
          _id: studyInfo._id,
          type: studyInfo.type,
          categories: studyInfo.categories,
          title: studyInfo.title,
          period: studyInfo.period,
          imgSrc: studyInfo.imgSrc,
        }}
      />
      <TabButtonGroup
        onClick={onClickBtn}
        selectedOptionIdx={selectedIdx}
        buttonGroupData={buttonGroupData}
      />
      <section className="flex flex-col gap-[16px] study_detail_main px-[16px]">
        <ul className="flex flex-col gap-[12px] border-b pt-[12px] pb-[20px] border-gray-300 study_detail_overview">
          <StudyOverviewItem
            icon={<Icon type="MEMBERS" />}
            name="팀원"
            content={"최대 " + studyInfo?.maxMembersNum + "명"}
          />
          <StudyOverviewItem
            icon={<Icon type="DATE_COLOR" />}
            name="일정"
            content={studyInfo?.dayOfWeek + " " + studyInfo?.time.startTime}
          />
          <StudyOverviewItem
            icon={<Icon type="CHECKBOX_COLOR" />}
            name="과제"
            content="스터디 게시판 사진 인증"
          />
          <StudyOverviewItem
            icon={<Icon type="LOCATION_COLOR" />}
            name="위치"
            content={studyInfo?.location + ""}
          />
        </ul>
        <InfoBox id="info" theme="white" ref={boxRef.info}>
          <TitleLink
            title="스터디 정보"
            hasArrow={true}
            arrowColor="gray-300"
          />
          <Divider type="row" />
          <div className="flex gap-[4px]">
            <Button theme="primary" shape="tag">
              <Text size="xs" weight="bold" color="white">
                {studyInfo?.type}
              </Text>
            </Button>
            {studyInfo.categories.map((category) => (
              <Button theme="secondary" shape="tag" key={category}>
                <Text size="xs" weight="bold" color="main">
                  {category}
                </Text>
              </Button>
            ))}
            <Button theme="secondary" shape="tag">
              <Icon type="STAR" />
              <Text size="xs" weight="bold" color="main">
                {studyInfo?.rate}
              </Text>
            </Button>
          </div>
          <Text size="sm" weight="bold">
            {studyInfo?.description}
          </Text>
        </InfoBox>

        <InfoBox theme="white" id="atmosphere">
          <Text size="sm" weight="bold">
            해당 스터디의 분위기
          </Text>
          <Divider type="row" />
          <div className="flex gap-[6px] flex-wrap">
            {studyInfo?.atmospheres.map((atmosphere, idx) => (
              <ButtonLabel
                key={uuidv4()}
                datas={{
                  theme: "secondary",
                  icon: <Icon type={atmosphere} height={16} width={16} />,
                  text: atmosphere,
                  usage: "listItem",
                }}
              />
            ))}
          </div>
        </InfoBox>
        <InfoBox theme="white" id="member" ref={boxRef.member}>
          <Text size="sm" weight="bold">
            해당 스터디에서 원하는 팀원
          </Text>
          <Divider type="row" />
          <div className="flex gap-[6px]">
            {studyInfo?.preferentialAge &&
              studyInfo?.preferentialAge.map((age) => (
                <ButtonLabel
                  key={uuidv4()}
                  datas={{
                    theme: "secondary",
                    usage: "listItem",
                    text: Math.floor(Number(age) / 10) * 10 + "대",
                  }}
                />
              ))}
            {studyInfo?.preferentialLevel && (
              <ButtonLabel
                key={uuidv4()}
                datas={{
                  theme: "secondary",
                  usage: "listItem",
                  text: studyInfo?.preferentialLevel,
                }}
              />
            )}
          </div>
          <div className="flex gap-[6px]">
            {studyInfo?.necessaryRoles &&
              studyInfo?.necessaryRoles.map((role) => (
                <ButtonLabel
                  key={uuidv4()}
                  datas={{
                    theme: "secondary",
                    usage: "listItem",
                    text: role,
                  }}
                />
              ))}
          </div>
        </InfoBox>
        <InfoBox theme="white" id="profile">
          <div className="flex gap-[8px]">
            <Text size="sm" weight="bold">
              팀원 프로필
            </Text>
            <Text size="sm" weight="bold" color="main">
              {studyInfo?.currentMembers.length +
                "/" +
                studyInfo?.maxMembersNum}
            </Text>
          </div>
          <Divider type="row" />
          <div className="flex flex-col gap-2">
            {studyInfo?.currentMembers?.map((member?: TStudyMember) => (
              <UserInfoItem
                key={uuidv4()}
                topText={member?.userName || "예명"}
                bottomText={getTranslation(member?.role)}
                imgSrc={
                  member?.applicantImgSrc ||
                  "/img/profile/defaultProfileImage.png"
                }
              />
            ))}
          </div>
        </InfoBox>
        {getSignUpButton(status, params.sid)}
      </section>
    </div>
  );
}

export default StudyInfoPage;
