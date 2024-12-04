import {
  TJoiningStudy_Client,
  TJoiningStudy_Server,
  TStudyMember,
} from "@/types/study"; // TJoiningStudy 타입 import

// 액션 타입 정의
export type TJoiningStudyAction =
  | {
      type: "TOGGLE_ATTENDANCE";
      payload: { myUserEmail: string; attendance: boolean };
    }
  | { type: "UPDATE_MEMBERS"; payload: TStudyMember[] } // currentMembers에 추가
  | { type: "SET_JOININGSTUDY"; payload: TJoiningStudy_Server } // currentMembers에 추가
  | { type: "ADD_SCHEDULE"; payload: string } // schedules에 추가
  | { type: "REMOVE_SCHEDULE"; payload: string } // schedules에서 삭제
  | { type: "UPDATE_TASKS"; payload: string[] } // tasks 수정
  | { type: "UPDATE_BOARD"; payload: any[] }; // board 수정

// 출석 -- 어떤 팀 멤버

// 초기 상태
export const initialState: TJoiningStudy_Client = {
  _id: "",
  type: "offline",
  categories: [],
  title: "",
  imgSrc: null,
  period: {
    startDate: "",
    endDate: "",
  },
  currentMembers: [],
  memberAttendances: [],
  schedules: [],
  tasks: [],
  board: [],
};

const refineJoiningStudy = (
  fetchedValue: TJoiningStudy_Server
): TJoiningStudy_Client => {
  // 서버에서 받은 데이터를 클라이언트에서 하위 컴포넌트로 뿌려주기 좋게 가공
  const { currentMembers } = fetchedValue;
  const memberAttendanceArr: TJoiningStudy_Client["memberAttendances"] = [];

  const refinedMembers = currentMembers.map((member) => {
    const {
      userName,
      userEmail,
      attendance,
      applicantImgSrc,
      checkList,
      role,
    } = member;
    memberAttendanceArr.push({ userName, userEmail, attendance });
    return {
      userName,
      userEmail,
      attendance,
      applicantImgSrc,
      checkList,
      role,
    }; // attendance를 제외한 나머지 필드로 새로운 객체 생성
  });

  const refinedState = {
    ...fetchedValue,
    currentMembers: refinedMembers,
    memberAttendances: memberAttendanceArr,
  };

  return refinedState;
};

// 리듀서 구현
export function JoiningStudyReducer(
  state: TJoiningStudy_Client = initialState,
  action: TJoiningStudyAction
): TJoiningStudy_Client {
  switch (action.type) {
    case "SET_JOININGSTUDY":
      return refineJoiningStudy(action.payload);

    case "TOGGLE_ATTENDANCE": {
      const { myUserEmail, attendance } = action.payload;

      const updatedMemberAttendances = state.memberAttendances.map((member) => {
        if (member.userEmail === myUserEmail) {
          member.attendance = attendance;
        }
        return member;
      });

      return { ...state, memberAttendances: updatedMemberAttendances };
    }

    case "UPDATE_MEMBERS":
      return {
        ...state,
        currentMembers: action.payload,
      };

    case "ADD_SCHEDULE":
      return { ...state, schedules: [...state.schedules, action.payload] };
    case "REMOVE_SCHEDULE":
      return {
        ...state,
        schedules: state.schedules.filter(
          (schedule) => schedule !== action.payload
        ),
      };
    case "UPDATE_TASKS":
      return { ...state, tasks: action.payload };
    case "UPDATE_BOARD":
      return { ...state, board: action.payload };
    default:
      return state;
  }
}
