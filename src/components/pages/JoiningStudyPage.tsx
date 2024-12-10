"use client";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Icon from "../atoms/Icon";
import Header from "../organisms/Header";
import StudyOverview from "../organisms/StudyOverview";
import {
  TCheckListItem,
  TJoiningStudy_Client,
  TJoiningStudy_Server,
  TSchedule,
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
import {
  JoiningStudyReducer,
  initialState,
} from "@/reducers/JoiningStudyReducer";

type TParticipationOptions = "team" | "private" | "schedule" | "feedback";
const buttonGroupDatas: TParticipationOptions[] = [
  "team",
  "private",
  "schedule",
  "feedback",
];

function JoiningStudyPage() {
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
  // const [JoiningStudy, setJoiningStudy] = useState<TJoiningStudy | null>(null);
  const [JoiningStudy, dispatch] = useReducer(
    JoiningStudyReducer,
    initialState
  );

  const StudyOverviewProps = useMemo(() => {
    return {
      _id: JoiningStudy._id,
      type: JoiningStudy.type,
      categories: JoiningStudy.categories,
      imgSrc: JoiningStudy.imgSrc,
      period: JoiningStudy.period,
      title: JoiningStudy.title,
    };
  }, [
    JoiningStudy._id,
    JoiningStudy.type,
    JoiningStudy.categories,
    JoiningStudy.imgSrc,
    JoiningStudy.period,
    JoiningStudy.title,
  ]);

  const handleUpdateCheckLists = useCallback(
    (myUserEmail: string, checkLists: TCheckListItem[]) => {
      dispatch({
        type: "UPDATE_CHECKLISTS",
        payload: { myUserEmail, checkLists },
      });
    },
    [dispatch]
  );

  const handleToggleAttendance = useCallback(
    (myUserEmail: string, attendance: boolean) => {
      dispatch({
        type: "TOGGLE_ATTENDANCE",
        payload: { myUserEmail, attendance },
      });
    },
    [dispatch]
  );

  const handleSetJoiningSTudy = (joiningStudy: TJoiningStudy_Server) => {
    dispatch({ type: "SET_JOININGSTUDY", payload: joiningStudy });
  };

  const handleUpdateSchedules = useCallback((schedules: TSchedule[]) => {
    dispatch({ type: "UPDATE_SCHEDULE", payload: schedules });
  }, []);

  console.log(JoiningStudy);

  const steps: Record<TParticipationOptions, React.ReactNode> = {
    team: (
      <Team
        key={"Team"}
        teamMembers={JoiningStudy.currentMembers}
        memberCheckLists={JoiningStudy.memberCheckLists}
        memberAttendances={JoiningStudy.memberAttendances}
        studyId={params.sid}
        onAttendanceChange={handleToggleAttendance}
      />
    ),
    private: (
      <Private
        key={"Private"}
        memberCheckLists={JoiningStudy.memberCheckLists}
        studyId={params.sid}
        onUpdateCheckList={handleUpdateCheckLists}
      />
    ),
    schedule: (
      <Schedule
        key={"Schedule"}
        studyId={params.sid}
        schedules={JoiningStudy.schedules}
        handleUpdateSchedules={handleUpdateSchedules}
      />
    ),
    feedback: <Feedback key={"Feedback"} />,
  };

  useEffect(() => {
    async function fetchStudy() {
      const data = await fetch(
        //sid에 해당하는 study도큐먼트 하나를 가져옴
        `/joiningStudy/${params.sid}/api`
      ).then((res) => res.json());
      // 서버에서 받은 data로 studyDetail 상태 업데이트
      handleSetJoiningSTudy(data);
    }

    fetchStudy();
  }, []); // params.sid가 변경될 때마다 다시 fetchStudy() 실행

  if (!JoiningStudy) return <Loading />;

  const onClickBtn = useCallback(
    (selectedOptionIdx: number) => {
      setSelectedIdx(selectedOptionIdx);
    },
    [selectedIdx]
  );

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
      <StudyOverview props={StudyOverviewProps} />
      {/* 얘네를 React.memo로 감싸야겠음. StudyOverview가 받는 props는 나눠서 전달해주고.. */}
      <TabButtonGroup
        onClick={onClickBtn}
        selectedOptionIdx={selectedIdx}
        buttonGroupData={buttonGroupDatas}
      />
      {steps[buttonGroupDatas[selectedIdx]]}
    </div>
  );
}

export default JoiningStudyPage;
