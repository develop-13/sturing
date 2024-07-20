"use client";
import { useRef, useState } from "react";
import Divider from "../atoms/Divider";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Button from "../molecules/Button";
import StudyOverviewItem from "../molecules/StudyOverviewItem";
import {
  StudyDetailButtonGroup,
  TStudyDetailTab,
} from "../organisms/ButtonGroup";
import InfoBox from "../organisms/InfoBox";
import StudyOverview from "../organisms/StudyOverview";

// 1. 위치값을 state 값으로 한다. 단점: 한 번 밖에 안 바뀌는 값을 state로 하기에는..?
// 2. 위칙값을 useRef에 담아둔다. 부모컴포넌트의 리랜더링을 어텋게 촉발시킬 건데?

function StudyDetailPage() {
  const studyInfoBoxRef = useRef<HTMLDivElement>(null);
  const memberInfoBoxRef = useRef<HTMLDivElement>(null);
  const [studyInfoBoxTop, setStudyInfoBoxTop] = useState(0);
  const [memberInfoBoxTop, setMemberInfoBoxTop] = useState(0);

  const [selected, setSelected] = useState<TStudyDetailTab>(null);

  const onClickBtn = (InfoBoxTop: number, tab: TStudyDetailTab) => () => {
    window.scrollTo({ top: InfoBoxTop, behavior: "smooth" });
    setSelected(tab);
  };
  // console.log(`studyInfoBoxTop=${studyInfoBoxTop}`);
  // console.log(`memberInfoBoxTop=${memberInfoBoxTop}`);

  const getInfoBoxTop =
    (setInfoBoxTop: (infoBoxTop: number) => void) => (infoBoxTop: number) => {
      setInfoBoxTop(infoBoxTop);
    };

  return (
    <div className="px-[16px] bg-gray-100">
      <StudyOverview />
      <StudyDetailButtonGroup
        onClickBtn={onClickBtn}
        selectedTab={selected}
        studyInfoBoxTop={studyInfoBoxTop}
        memberInfoBoxTop={memberInfoBoxTop}
      />

      <section className="flex flex-col gap-[16px] study_detail_main">
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
          ref={studyInfoBoxRef}
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
          ref={memberInfoBoxRef}
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
