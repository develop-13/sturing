import { useEffect, useState } from "react";
import Text from "../../atoms/Text";
import { TabButtonGroup } from "../../organisms/ButtonGroup";
import JoinedStudyViewer from "@/components/templates/mystudy/studyListViewer/JoinedStudyViewer";
import WaitingAppliesViewer from "@/components/templates/mystudy/studyListViewer/WaitingAppliesViewer";
import AcceptedAppliesViewer from "@/components/templates/mystudy/studyListViewer/AcceptedAppliesViewer";
import FinishedStudiesViewer from "@/components/templates/mystudy/studyListViewer/FinishedStudiesViewer";

type TStudyList = {
  userEmail?: string;
};

const myStudyTabData = ["진행", "수락", "대기", "종료"];

const myStudyDataMap = {
  진행: "joinedStudies",
  수락: "accepted_applies",
  대기: "wating_applies",
  종료: "myStudiesDone",
} as const;

type TUserStudyDataList = {
  joinedStudies: any[];
  accepted_applies: any[]; // 내가 개설한 스터디에 온 지원서들
  wating_applies: any[]; // 내가 지원한 지원서들,
  myStudiesDone: any[]; // 내가 참여한 스터디인데 이미 활동기간이 끝난 스터디들
};

// 타입 단언을 통해 인덱스 타입 오류 해결

const renderListViewer = (
  userStudyDataList: TUserStudyDataList,
  selectedKey: keyof typeof myStudyDataMap
): React.ReactNode => {
  switch (selectedKey) {
    case "진행":
      return (
        <JoinedStudyViewer
          studyData={userStudyDataList[myStudyDataMap[selectedKey]]}
        />
      );

    case "대기":
      return (
        <WaitingAppliesViewer
          applyData={userStudyDataList[myStudyDataMap[selectedKey]]}
        />
      );

    case "수락":
      return (
        <AcceptedAppliesViewer
          applyData={userStudyDataList[myStudyDataMap[selectedKey]]}
        />
      );

    case "종료":
      return <FinishedStudiesViewer />;
  }
};

function StudyList(props: TStudyList) {
  const [selectedIdx, setSelectedIdx] = useState(2);
  const selectedKey = myStudyTabData[
    selectedIdx
  ] as keyof typeof myStudyDataMap;

  const [userStudyDataList, setUserStudyDataList] = useState({
    joinedStudies: [],
    accepted_applies: [], // 내가 개설한 스터디에 온 지원서들
    wating_applies: [], // 내가 지원한 지원서들,
    myStudiesDone: [], // 내가 참여한 스터디인데 이미 활동기간이 끝난 스터디들
  });

  useEffect(() => {
    // 유저 관련 스터디 가져오는 로직
    async function getUserStudyData() {
      const data = await fetch(
        `/mystudy/api/userDatas?userEmail=${props.userEmail}`
      ).then((res) => res.json());

      const { studies, acceptedApplies, pendingApplies } = data;
      const { active, completed } = studies;

      setUserStudyDataList({
        ...userStudyDataList,
        accepted_applies: acceptedApplies,
        wating_applies: pendingApplies,
        myStudiesDone: completed,
        joinedStudies: active,
      });
    }
    getUserStudyData();
  }, []);

  console.log(userStudyDataList);

  return (
    <div>
      <div className="ml-[16px] mt-[40px] mb-[18px]">
        <Text size="xl" weight="bold">
          스터디 리스트
        </Text>
      </div>
      <TabButtonGroup
        buttonGroupData={myStudyTabData}
        selectedOptionIdx={selectedIdx}
        onClick={(idx: number) => {
          setSelectedIdx(idx);
        }}
      />
      {renderListViewer(userStudyDataList, selectedKey)}
    </div>
  );
}

export default StudyList;
