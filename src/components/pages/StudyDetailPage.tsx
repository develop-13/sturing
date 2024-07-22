"use client";
import { useRef, useState } from "react";
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

const dataSet: TInactiveStudyDataSet = new Map([
  ["info", "정보"],
  ["member", "팀원"],
]);

function StudyDetailPage() {
  // 1. 위치값을 state 값으로 한다. 단점: 한 번 밖에 안 바뀌는 값을 state로 하기에는..?
  // 2. 위칙값을 useRef에 담아둔다. 부모컴포넌트의 리랜더링을 어텋게 촉발시킬 건데?
  // 현재는 좋은 방법이 안 떠올라 1번을 택했지만 나중에 더 좋은 방법을 알아보자.
  const [selected, setSelected] = useState<TInactiveSelectedOption>(null);
  const [studyInfoBoxTop, setStudyInfoBoxTop] = useState(0);
  const [memberInfoBoxTop, setMemberInfoBoxTop] = useState(0);
  const boxRef = {
    info: useRef<HTMLDivElement>(null),
    member: useRef<HTMLDivElement>(null),
  };

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

  // infoBox에서 Top의 위치를 받아와서 set값으로 설정
  const getInfoBoxTop =
    (setInfoBoxTop: (infoBoxTop: number) => void) => (infoBoxTop: number) => {
      setInfoBoxTop(infoBoxTop);
    };

  return (
    <div className="bg-gray-100">
      <Header
        position="absolute"
        leftSlot={<Icon type="BACK" color="text-white" />}
        rightSlot={
          <div className="flex gap-[12px]">
            <Icon type="SHARE" color="text-white" />
            <Icon type="MORE" color="text-white" />
          </div>
        }
      />
      <StudyOverview />
      <TabButtonGroup
        onClick={onClickBtn}
        selectedOption={selected}
        dataSet={dataSet}
      />

      <section className="flex flex-col gap-[16px] study_detail_main px-[16px]">
        {/* 텝 매인 */}
        <ul className="flex flex-col gap-[12px] border-b pt-[2px]  pb-[20px] border-gray-300 study_detail_overview">
          <StudyOverviewItem icon={<br />} name="null" content="null" />
          <StudyOverviewItem icon={<br />} name="null" content="null" />
          <StudyOverviewItem icon={<br />} name="null" content="null" />
          <StudyOverviewItem icon={<br />} name="null" content="null" />
        </ul>
        <InfoBox
          theme="white"
          getInfoBoxTop={getInfoBoxTop(setStudyInfoBoxTop)}
          ref={boxRef.info}
        >
          {/* 스터디 정보 */}
          <div className="flex justify-between">
            <Text size="base" weight="bold">
              스터디 정보{" "}
            </Text>
            <Icon type="FORWARD" color="text-gray-300" />
          </div>
          <Divider type="row" />
          {/* 버튼 묶음 시작 */}
          <div className="flex gap-[4px]">
            <Button theme="primary" shape="tag">
              <Text size="xs" weight="bold" color="white">
                온라인
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                디자인
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                유데미
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="main">
                4.5
              </Text>
            </Button>
          </div>
          {/* 버튼 묶음 끝 */}
          <Text size="sm">
            UXUI 디자이너가 피그마를 활용해 포트폴리오를 쌓는 법 A to Z
          </Text>
          <Text size="xs" color="gray-600">
            유데미디자인랩{" "}
          </Text>
        </InfoBox>
        <InfoBox theme="white">
          {/* 스터디 정보 */}
          <div className="flex justify-between">
            <Text size="base" weight="bold">
              스터디 정보{" "}
            </Text>
            <Icon type="FORWARD" color="text-gray-300" />
          </div>
          <Divider type="row" />
          {/* 버튼 묶음 시작 */}
          <div className="flex gap-[4px]">
            <Button theme="primary" shape="tag">
              <Text size="xs" weight="bold" color="white">
                온라인
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                디자인
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                유데미
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="main">
                4.5
              </Text>
            </Button>
          </div>
          {/* 버튼 묶음 끝 */}
          <Text size="sm">
            UXUI 디자이너가 피그마를 활용해 포트폴리오를 쌓는 법 A to Z
          </Text>
          <Text size="xs" color="gray-600">
            유데미디자인랩{" "}
          </Text>
        </InfoBox>
        <InfoBox
          theme="white"
          getInfoBoxTop={getInfoBoxTop(setMemberInfoBoxTop)}
          ref={boxRef.member}
        >
          {/* 스터디 정보 */}
          <div className="flex justify-between">
            <Text size="base" weight="bold">
              스터디 정보{" "}
            </Text>
            <Icon type="FORWARD" color="text-gray-300" />
          </div>
          <Divider type="row" />
          {/* 버튼 묶음 시작 */}
          <div className="flex gap-[4px]">
            <Button theme="primary" shape="tag">
              <Text size="xs" weight="bold" color="white">
                온라인
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                디자인
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Text size="xs" weight="bold" color="main">
                유데미
              </Text>
            </Button>
            <Button theme="secondary" shape="tag">
              <Icon type="CHECKED" />
              <Text size="xs" weight="bold" color="main">
                4.5
              </Text>
            </Button>
          </div>
          {/* 버튼 묶음 끝 */}
          <Text size="sm">
            UXUI 디자이너가 피그마를 활용해 포트폴리오를 쌓는 법 A to Z
          </Text>
          <Text size="xs" color="gray-600">
            유데미디자인랩{" "}
          </Text>
        </InfoBox>
      </section>
    </div>
  );
}

export default StudyDetailPage;
