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

const myStudyTabData = ["진행", "수락", "대기", "종료"] as const;
type MyStudyTab = (typeof myStudyTabData)[number];
const mutableStudyTabData: (string | undefined)[] = [...myStudyTabData];

const renderListViewer = (
  selectedKey: MyStudyTab,
  userEmail: string
): React.ReactNode => {
  switch (selectedKey) {
    case "진행":
      return <JoinedStudyViewer userEmail={userEmail} />;

    case "대기":
      return <WaitingAppliesViewer userEmail={userEmail} />;

    case "수락":
      return <AcceptedAppliesViewer userEmail={userEmail} />;

    case "종료":
      return <FinishedStudiesViewer />;
  }
};

function StudyList(props: TStudyList) {
  const [selectedIdx, setSelectedIdx] = useState(2);
  const selectedKey: MyStudyTab = myStudyTabData[selectedIdx];

  if (props?.userEmail === undefined) return null;

  return (
    <div>
      <div className="ml-[16px] mt-[40px] mb-[18px]">
        <Text size="xl" weight="bold">
          스터디 리스트
        </Text>
      </div>
      <TabButtonGroup
        buttonGroupData={mutableStudyTabData}
        selectedOptionIdx={selectedIdx}
        onClick={(idx: number) => {
          setSelectedIdx(idx);
        }}
      />
      {renderListViewer(selectedKey, props.userEmail)}
    </div>
  );
}

export default StudyList;
