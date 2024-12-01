"use client";
import { useContext, useEffect, useState } from "react";
import Icon from "../atoms/Icon";
import Header from "../organisms/Header";
import StudyOverview from "../organisms/StudyOverview";
import {
  TStudy,
  TStudyDetail_participating,
  TStudyMember,
} from "@/types/study";
import { useParams, useRouter } from "next/navigation";
import { TabButtonGroup } from "../organisms/ButtonGroup";
import Team from "../templates/studyDetailParticipate/Team";
import Private from "../templates/studyDetailParticipate/Private";
import Schedule from "../templates/studyDetailParticipate/Schedule";
import Feedback from "../templates/studyDetailParticipate/Feedback";
import Loading from "../templates/Loading";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../organisms/auth-components/UserStatusProvider";

type TParticipationOptions = "team" | "private" | "schedule" | "feedback";
const buttonGroupDatas: TParticipationOptions[] = [
  "team",
  "private",
  "schedule",
  "feedback",
];

function JoiningStudy() {
  const router = useRouter();

  const { session, status }: UserStatusContextProps =
    useContext(UserStatusContext);

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user]);

  const params = useParams<{ sid: string }>();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [studyDetail, setStudyDetail] =
    useState<TStudyDetail_participating | null>(null);

  const handleAttendanceChange = (updatedTeamMembers: TStudyMember[]) => {
    setStudyDetail((prev: any) => {
      if (prev === null) {
        return { currentMembers: updatedTeamMembers }; // prev가 undefined일 경우 새로운 객체를 반환
      }
      return {
        ...prev, // 기존 state를 복사하고
        currentMembers: updatedTeamMembers, // currentMembers만 업데이트
      };
    });
  };

  const handleChange = (field: string, value: string) => {
    // 이걸로 갈까?
  };

  const handleCheckList = () => {};

  const steps: Record<TParticipationOptions, React.ReactNode> = {
    team: (
      <Team
        teamMembers={studyDetail?.currentMembers}
        studyId={params.sid}
        onAttendanceChange={handleAttendanceChange}
      />
    ),
    private: (
      <Private teamMembers={studyDetail?.currentMembers} studyId={params.sid} />
    ),
    schedule: <Schedule />,
    feedback: <Feedback />,
  };

  useEffect(() => {
    async function fetchStudy() {
      const data = await fetch(
        //sid에 해당하는 study도큐먼트 하나를 가져옴
        `/joiningStudy/[sid]/api?sid=${params.sid}`
      ).then((res) => res.json());
      // 서버에서 받은 data로 studyDetail 상태 업데이트
      setStudyDetail(data);
    }

    console.log("data refetching!");
    fetchStudy();
  }, []); // params.sid가 변경될 때마다 다시 fetchStudy() 실행

  console.log(studyDetail);

  if (!studyDetail) return <Loading />;

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
