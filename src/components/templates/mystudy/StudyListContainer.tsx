"use client";
import { useState } from "react";
import Text from "../../atoms/Text";
import { TabButtonGroup } from "../../organisms/ButtonGroup";
import dynamic from "next/dynamic";
import ViewerContainer from "./studyListViewer/ViewerContainer";

const JoinedStudyViewer = dynamic(
  () =>
    import("@/components/templates/mystudy/studyListViewer/JoinedStudyViewer"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2">
        <div className="bg-gray-300 w-4/5 h-4 rounded animate-pulse"></div>
        <div className="bg-gray-300 w-3/4 h-4 rounded animate-pulse"></div>
        <div className="bg-gray-300 w-2/3 h-4 rounded animate-pulse"></div>
      </div>
    ),
  }
);
const WaitingAppliesViewer = dynamic(
  () =>
    import(
      "@/components/templates/mystudy/studyListViewer/WaitingAppliesViewer"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2">
        <div className="bg-gray-300 w-4/5 h-4 rounded animate-pulse"></div>
        <div className="bg-gray-300 w-3/4 h-4 rounded animate-pulse"></div>
        <div className="bg-gray-300 w-2/3 h-4 rounded animate-pulse"></div>
      </div>
    ),
  }
);
const AcceptedAppliesViewer = dynamic(
  () =>
    import(
      "@/components/templates/mystudy/studyListViewer/AcceptedAppliesViewer"
    ),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-2">
        <div className="bg-gray-300 w-4/5 h-4 rounded animate-pulse"></div>
        <div className="bg-gray-300 w-3/4 h-4 rounded animate-pulse"></div>
        <div className="bg-gray-300 w-2/3 h-4 rounded animate-pulse"></div>
      </div>
    ),
  }
);
// import FinishedStudiesViewer from "@/components/templates/mystudy/studyListViewer/FinishedStudiesViewer";

type TStudyList = {
  userEmail?: string;
};

// const myStudyTabData = ["진행", "수락", "대기", "종료"] as const;
const myStudyTabData = ["진행", "수락", "대기"] as const;
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

    // case "종료":
    //   return <FinishedStudiesViewer />;
  }
};

function StudyList(props: TStudyList) {
  const [selectedIdx, setSelectedIdx] = useState(0);
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
      <ViewerContainer>
        {renderListViewer(selectedKey, props.userEmail)}
      </ViewerContainer>
    </div>
  );
}

export default StudyList;
