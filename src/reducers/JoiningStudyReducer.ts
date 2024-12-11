import {
  TBoard,
  TCheckListItem,
  TJoiningStudy_Client,
  TJoiningStudy_Server,
  TSchedule,
  TStudyMember,
} from "@/types/study"; // TJoiningStudy 타입 import

// 액션 타입 정의
export type TJoiningStudyAction =
  | {
      type: "UPDATE_CHECKLISTS";
      payload: { myUserEmail: string; checkLists: TCheckListItem[] };
    }
  | {
      type: "TOGGLE_ATTENDANCE";
      payload: { myUserEmail: string; attendance: boolean };
    }
  | { type: "SET_JOININGSTUDY"; payload: TJoiningStudy_Server } // currentMembers에 추가
  | { type: "UPDATE_SCHEDULE"; payload: TSchedule[] } // currentMembers에 추가
  | { type: "UPDATE_MEMBERS"; payload: TStudyMember[] } // currentMembers에 추가
  | { type: "UPDATE_TASKS"; payload: string[] } // tasks 수정
  | {
      type: "UPDATE_BOARD";
      payload: { boardType: "noticeBoards" | "studyBoards"; boards: TBoard[] };
    }; // board 수정

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
  memberCheckLists: {},
  schedules: [],
  tasks: [],
  noticeBoards: [],
  studyBoards: [],
};

const refineJoiningStudy = (
  fetchedValue: TJoiningStudy_Server
): TJoiningStudy_Client => {
  const { currentMembers } = fetchedValue;
  const memberAttendanceArr: TJoiningStudy_Client["memberAttendances"] = [];
  const memberCheckLists: TJoiningStudy_Client["memberCheckLists"] = {};

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

    // Creating the memberCheckLists entry with the email as the key
    memberCheckLists[userEmail] = checkList.map((checkItem) => ({
      todoId: checkItem.todoId,
      date: checkItem.date,
      content: checkItem.content, // Assuming 'text' is the content of the checklist item
      done: checkItem.done, // Assuming 'done' indicates whether the task is completed
    }));

    return {
      userName,
      userEmail,
      applicantImgSrc,
      role,
    }; // Omitting attendance and checkList
  });

  const refinedState = {
    ...fetchedValue,
    currentMembers: refinedMembers,
    memberAttendances: memberAttendanceArr,
    memberCheckLists, // Adding memberCheckLists to the refined state
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

    case "UPDATE_CHECKLISTS": {
      const { myUserEmail, checkLists } = action.payload;

      const updatedMemberCheckList = {
        ...state["memberCheckLists"],
      };
      updatedMemberCheckList[myUserEmail] = checkLists;
      return { ...state, memberCheckLists: updatedMemberCheckList };
    }

    case "UPDATE_SCHEDULE":
      return { ...state, schedules: action.payload };

    case "UPDATE_BOARD":
      return { ...state, [action.payload.boardType]: action.payload.boards };
    case "UPDATE_MEMBERS":
      return {
        ...state,
        currentMembers: action.payload,
      };

    case "UPDATE_TASKS":
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
}
