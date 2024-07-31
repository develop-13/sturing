"use client";
import { useEffect, useState } from "react";
import Icon from "../atoms/Icon";
import Header from "../organisms/Header";
import StudyOverview from "../organisms/StudyOverview";
import { TStudy } from "@/types/study";
import { useParams, useRouter } from "next/navigation";
import { fetchStudyDetail } from "@/api/fetchStudyDetail";
import { TabButtonGroup } from "../organisms/ButtonGroup";
import Team from "../templates/studyDetailParticipate/Team";
import Private from "../templates/studyDetailParticipate/Private";
import Schedule from "../templates/studyDetailParticipate/schedule";
import Feedback from "../templates/studyDetailParticipate/feedback";

type TParticipationOptions = "team" | "private" | "schedule" | "feedback";
const buttonGroupDatas: TParticipationOptions[] = [
  "team",
  "private",
  "schedule",
  "feedback",
];
const steps: Record<TParticipationOptions, React.ReactNode> = {
  team: <Team />,
  private: <Private />,
  schedule: <Schedule />,
  feedback: <Feedback />,
};

function PartcipatingStudyDetailPage() {
  const router = useRouter();
  const params = useParams<{ sid: string }>();
  const [selectedIdx, seSelectedIdx] = useState(0);
  const [studyDetail, setStudyDetail] = useState<TStudy | undefined>(undefined);
  useEffect(() => {
    const data = fetchStudyDetail(params.sid);
    setStudyDetail(data);
  }, [params.sid]);

  if (!studyDetail) return;
  // 한 번에 보여주기 위한 처리

  const onClickBtn = (selectedOptionIdx: number) => {
    seSelectedIdx(selectedOptionIdx);
  };

  return (
    <div className="bg-gray-100">
      {" "}
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
        selectedOptionIdx={selectedIdx}
        buttonGroupData={buttonGroupDatas}
      />
      {steps[buttonGroupDatas[selectedIdx]]}
    </div>
  );
}

export default PartcipatingStudyDetailPage;
