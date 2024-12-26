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
  TBoard_Client,
  TCheckListItem,
  TJoiningStudy_Server,
  TSchedule,
} from "@/types/study";
import { useParams, useRouter } from "next/navigation";
import { TabButtonGroup } from "../organisms/ButtonGroup";
import Team from "../templates/studyDetailParticipate/Team";
import Private from "../templates/studyDetailParticipate/Private";
import Schedule from "../templates/studyDetailParticipate/Schedule";
import Feedback from "../templates/studyDetailParticipate/Feedback";
import Loading from "../templates/common/Loading";
import {
  UserStatusContext,
  UserStatusContextProps,
} from "../../providers/UserStatusProvider";
import {
  JoiningStudyReducer,
  initialState,
} from "@/reducers/JoiningStudyReducer";
import Button from "../molecules/Button";
import Text from "../atoms/Text";

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

  const params = useParams<{ sid: string }>();
  // 만약 전역 상태관리 라이브러리를 사용한다고 했을 때?
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [JoiningStudy, dispatch] = useReducer(
    JoiningStudyReducer,
    initialState
  );

  useEffect(() => {
    if (session === null && status === "unauthenticated") {
      alert("로그인이 필요한 페이지 입니다");
      router.push("/");
      return;
    }
  }, [session?.user, status, router]);

  // 자신이 리더라면 스터디 시작버튼이 존재.
  const isLeader = useMemo(
    () =>
      JoiningStudy.currentMembers.some(
        (member) =>
          member.userEmail === session?.user.email &&
          member.role === "team_leader"
      ),
    [JoiningStudy, session]
  );

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
  }, [params.sid]); // params.sid가 변경될 때마다 다시 fetchStudy() 실행

  console.log(JoiningStudy);

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

  const handleUpdateBoards = useCallback(
    (boardType: "studyBoards" | "noticeBoards", boards: TBoard_Client[]) => {
      dispatch({ type: "UPDATE_BOARD", payload: { boards, boardType } });
    },
    []
  );

  const startStudy = async () => {
    try {
      const res = await fetch(`joiningStudy/api`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studyId: JoiningStudy._id, status: "ongoing" }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onClickStatusBtn = () => {
    dispatch({ type: "STATUS" });
    startStudy();
  };

  const onClickTab = useCallback(
    (selectedOptionIdx: number) => {
      setSelectedIdx(selectedOptionIdx);
    },
    [selectedIdx]
  );

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
    feedback: (
      <Feedback
        key={"Feedback"}
        studyId={params.sid}
        noticeBoards={JoiningStudy.noticeBoards}
        studyBoards={JoiningStudy.studyBoards}
        handleUpdateBoards={handleUpdateBoards}
        teamMembers={JoiningStudy.currentMembers}
      />
    ),
  };

  if (!JoiningStudy._id) return <Loading />;

  return (
    <div className="bg-gray-100 ">
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
      />
      <StudyOverview props={StudyOverviewProps} />
      {/* 얘네를 React.memo로 감싸야겠음. StudyOverview가 받는 props는 나눠서 전달해주고.. */}
      <TabButtonGroup
        onClick={onClickTab}
        selectedOptionIdx={selectedIdx}
        buttonGroupData={buttonGroupDatas}
      />
      {steps[buttonGroupDatas[selectedIdx]]}
      <div className="px-4 pb-4">
        {isLeader && JoiningStudy.status === "recruiting" ? (
          <Button
            theme="primary"
            shape="full"
            extraCss="p-2"
            onClick={onClickStatusBtn}
          >
            <Text weight="bold">스터디 시작하기</Text>
          </Button>
        ) : JoiningStudy.status === "recruiting" ? (
          <Button theme="secondary" shape="full" extraCss="p-2">
            <Text weight="bold">진행 예정인 스터디입니다.</Text>
          </Button>
        ) : JoiningStudy.status === "ongoing" ? (
          <Button theme="ordinary" shape="full" extraCss="p-2">
            <Text weight="bold">진행중인 스터디입니다.</Text>
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default JoiningStudyPage;
