"use client";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import StudyOverviewItem from "../molecules/StudyOverviewItem";
import { TabButtonGroup } from "../organisms/ButtonGroup";
import InfoBox from "../organisms/InfoBox";
import StudyOverview from "../organisms/StudyOverview";
import Header from "../organisms/Header";
import { TStudyDetail } from "@/types/study";
import TitleLink from "../molecules/TitleLink";
import ButtonLabel from "../molecules/IconLabelButton";
import UserInfoItem from "../molecules/UserInfoItem";

const buttonGroupData = ["info", "member"];

function studyInfoPage() {
  // console.log(`studyInfoPage render!`);
  const router = useRouter();
  const params = useParams<{ sid: string }>();
  const [selectedIdx, setSelected] = useState(0);
  const [studyInfoBoxTop, setStudyInfoBoxTop] = useState(0);
  const [memberInfoBoxTop, setMemberInfoBoxTop] = useState(0);
  const [studyInfo, setStudyInfo] = useState<TStudyDetail | undefined>(
    undefined
  );
  const boxRef = {
    info: useRef<HTMLDivElement>(null),
    member: useRef<HTMLDivElement>(null),
  };

  // console.log(boxRef.info.current);
  // console.log(boxRef.member.current);

  useEffect(() => {
    // 스터디를 가져옴

    async function fetchstudyInfo() {
      const fetchedStudyInfo = await fetch(
        `/study/[sid]/api?sid=${params.sid}`
      ).then((res) => res.json());
      const { study, userEmailRoleMap } = fetchedStudyInfo;
      study.currentMembers = userEmailRoleMap;
      setStudyInfo(study);
      console.log(study);
    }

    fetchstudyInfo();
  }, [params.sid]);

  const onClickBtn = (selectedOptionIdx: number) => {
    setSelected(selectedOptionIdx);

    switch (buttonGroupData[selectedOptionIdx]) {
      case "info":
        window.scrollTo({ top: memberInfoBoxTop, behavior: "smooth" });
        break;
      case "member":
        window.scrollTo({ top: studyInfoBoxTop, behavior: "smooth" });
        console.log(buttonGroupData[selectedOptionIdx]);
        console.log(`studyInfoBoxTop=${studyInfoBoxTop}`);
        console.log(`memberInfoBoxTop=${memberInfoBoxTop}`);
        break;
    }
    console.log("haha");
    console.log(document.documentElement.scrollTop);
  };

  const getInfoBoxTop =
    (setInfoBoxTop: (infoBoxTop: number) => void) => (infoBoxTop: number) => {
      setInfoBoxTop(infoBoxTop);
    };

  if (!studyInfo) return;
  // 한 번에 보여주기 위한 처리

  return (
    <div className="bg-gray-100">
      <Header
        position="absolute"
        leftSlot={
          <Icon
            type="BACK"
            onClick={() => {
              router.back();
            }}
          />
        }
        rightSlot={
          <div className="flex gap-[12px] items-center">
            <Icon type="SHARE" />
            <Icon type="MORE" />
          </div>
        }
      />
      <StudyOverview
        props={{
          type: studyInfo.type,
          categories: studyInfo.categories,
          title: studyInfo.title,
          startDate: studyInfo.period.startDate,
          endDate: studyInfo.period.endDate,
          src: studyInfo.imgSrc,
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
            content={
              studyInfo?.dayOfWeek + "요일" + " " + studyInfo?.time.startTime
            }
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
        <InfoBox
          theme="white"
          getInfoBoxTop={getInfoBoxTop(setStudyInfoBoxTop)}
          ref={boxRef.info}
        >
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
            {studyInfo?.title}
          </Text>
        </InfoBox>
        <InfoBox theme="white">
          <Text size="sm" weight="bold">
            해당 스터디의 분위기
          </Text>
          <Divider type="row" />
          <div className="flex gap-[6px]">
            {studyInfo?.atmospheres.map((atmosphere, idx) => (
              <ButtonLabel
                key={uuidv4()}
                datas={{
                  theme: "secondary",
                  icon: <Icon type={atmosphere} />,
                  text: atmosphere,
                  usage: "listItem",
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
            {studyInfo?.preferentialAge && (
              <ButtonLabel
                key={uuidv4()}
                datas={{
                  theme: "secondary",
                  usage: "listItem",
                  text: studyInfo?.preferentialAge as string,
                }}
              />
            )}
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
        <InfoBox theme="white">
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
            {/* {studyInfo?.currentMembers &&
              Object.entries(studyInfo.currentMembers).map(
                ([key, participant]) => (
                  <UserInfoItem
                    key={uuidv4()}
                    name={participant.name}
                    role={participant.role}
                    isCreator={participant.email === studyInfo.creatorEmail}
                    profileImage={
                      participant.imgSrc ||
                      "/img/profile/defaultProfileImage.png"
                    }
                  />
                )
              )} */}
          </div>
        </InfoBox>
      </section>
    </div>
  );
}

export default studyInfoPage;
