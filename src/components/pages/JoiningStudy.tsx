"use client";
import { useEffect, useState } from "react";
import Icon from "../atoms/Icon";
import Header from "../organisms/Header";
import StudyOverview from "../organisms/StudyOverview";
import { TStudy } from "@/types/study";
import { useParams, useRouter } from "next/navigation";
// import { fetchStudyDetail } from "@/app/api/fetchStudyDetail";
import { TabButtonGroup } from "../organisms/ButtonGroup";
import Team from "../templates/studyDetailParticipate/Team";
import Private from "../templates/studyDetailParticipate/Private";
import Schedule from "../templates/studyDetailParticipate/Schedule";
import Feedback from "../templates/studyDetailParticipate/Feedback";

type TParticipationOptions = "team" | "private" | "schedule" | "feedback";
const buttonGroupDatas: TParticipationOptions[] = [
  "team",
  "private",
  "schedule",
  "feedback",
];

function JoiningStudy() {
  const router = useRouter();
  const params = useParams<{ sid: string }>();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [studyDetail, setStudyDetail] = useState<TStudy | undefined>(undefined);

  const steps: Record<TParticipationOptions, React.ReactNode> = {
    team: (
      <Team teamMembers={studyDetail?.currentMembers} studyId={params.sid} />
    ),
    private: <Private />,
    schedule: <Schedule />,
    feedback: <Feedback />,
  };
  console.log(`paramsId = ${params.sid}`);

  useEffect(() => {
    async function fetchStudy() {
      const data = await fetch(
        `/joiningStudy/[sid]/api?sid=${params.sid}`
      ).then((res) => res.json());
      // 서버에서 받은 data로 studyDetail 상태 업데이트
      setStudyDetail(data);
    }

    fetchStudy();
  }, [params.sid]); // params.sid가 변경될 때마다 다시 fetchStudy() 실행

  console.log(studyDetail);

  if (!studyDetail) return <div>loading...</div>;

  const onClickBtn = (selectedOptionIdx: number) => {
    setSelectedIdx(selectedOptionIdx);
  };

  return (
    <div className="bg-gray-100">
      {" "}
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

export default JoiningStudy;
