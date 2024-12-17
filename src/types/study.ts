import { TAtmosphere, TCategory, TLevel, TRoleText } from "./common";

export type TStudy = {
  _id: string;
  title: string;
  createdAt: string;
  period: {
    startDate: string;
    endDate: string;
  };
  creatorEmail: string;
  time: {
    startTime: string;
    endTime: string;
  };
  dayOfWeek: string;
  location: string;
  imgSrc: Blob | null | string;
  schedule: string[]; // 스케쥴 id 가담겨 있음
  type: "online" | "offline" | undefined;
  categories: TCategory[];
  status: string; // 진행중이거나 모집중이거나
  studyPlacePreference: string[]; // 모집하려는 팀원의 선호 장소 (오프라인의 경우)
  maxMembersNum: number;
  currentMembers: TStudyMember[];
  necessaryRoles: TRoleText[]; // 역할 목록 ex) 팀장, 부팀장
  preferentialAge: number[];
  preferentialLevel?: TLevel; // 모집하는 팀원의 희망 수준 ex) 비기너, 신입 등
  tasks: string[]; // 스터디에서 다룰 과제 목록
  rate: number; // 스터디 평가 점수
  atmospheres: TAtmosphere[]; // 스터디 분위기
  schedules: TSchedule[];
  noticeBoards: TBoard_Server[] | TBoard_Client[];
  studyBoards: TBoard_Server[] | TBoard_Client[];
  // board: TBoard[];
  viewCount: number; // 조회 수
  applyCount: number; // 지원 수
  score: number; // 스터디의 인기도 점수 (자동 계산될 값)
};

export type TBoard_Client = {
  boardClientId: string;
  studyId?: string;
  writerRole?: TRoleText;
  writerEmail: string;
  writerImg: string;
  writerName: string;
  createdAt?: Date;
  view?: number;
  title: string;
  text: string;
  imgSrces: Blob[] | string[];
  readingRequired: boolean;
  commentIds: string[];
  comments: Record<string, TComment>;
};

export type TBoard_Server = {
  boardClientId: string;
  studyId?: string;
  writerRole?: TRoleText;
  writerEmail: string;
  writerImg: string;
  writerName: string;
  createdAt?: Date;
  view?: number;
  title: string;
  text: string;
  imgSrces: Blob[] | string[];
  readingRequired: boolean;
  comments: TComment[];
};

export type TComment = {
  Id: string;
  writerEmail: string;
  writerName: string; // 작성자의 이름
  writerImg?: string; // 작성자의 이미지
  writerRole?: string; // 작성자의 역할
  createdAt?: Date; // 댓글 작성 시간
  text: string; // 댓글 내용
  updatedAt?: Date;
  replies?: TReply[]; // 댓글에 달린 답글 배열
};

export type TReply = Omit<TComment, "replies">;

export type TSchedule = {
  scheduleId: string;
  studyId: string;
  title: string;
  date: Date;
  location: string;
  startTime: string;
  endTime: string;
  detail: string;
};

export type TJoiningStudy_Server = Pick<
  TStudy,
  | "_id"
  | "type"
  | "categories"
  | "title"
  | "imgSrc"
  | "period"
  | "schedules"
  | "tasks"
  | "noticeBoards"
  | "studyBoards"
  | "currentMembers"
>;

export type TJoiningStudy_Client = Pick<
  TStudy,
  | "_id"
  | "type"
  | "categories"
  | "title"
  | "imgSrc"
  | "period"
  | "schedules"
  | "tasks"
  | "noticeBoards"
  | "studyBoards"
> & {
  currentMembers: Omit<TStudyMember, "attendance" | "checkList">[]; // Omit both attendance and checkList
  memberAttendances: {
    userName: string;
    userEmail: string;
    attendance: boolean;
  }[];
  memberCheckLists: Record<string, TCheckListItem[]>; // Adding memberCheckLists
};

export type TStudyOverview = Pick<
  TStudy,
  "_id" | "type" | "categories" | "title" | "imgSrc"
> & {
  period: {
    startDate: string;
    endDate: string;
  };
};

export type TStudyRecruitment = Pick<
  TStudy,
  | "creatorEmail"
  | "imgSrc"
  | "title"
  | "categories"
  | "type"
  | "location"
  | "dayOfWeek"
  | "time"
  | "maxMembersNum"
  | "preferentialAge"
  | "preferentialLevel"
  | "necessaryRoles"
  | "atmospheres"
> & {
  description: string;
  period: {
    startDate: Date | null;
    endDate: Date | null;
  };
};

export type TStudyDetail = Pick<
  TStudy,
  | "_id"
  | "type"
  | "categories"
  | "title"
  | "imgSrc"
  | "dayOfWeek"
  | "maxMembersNum"
  | "time"
  | "tasks"
  | "location"
  | "atmospheres"
  | "currentMembers"
  | "necessaryRoles"
  | "preferentialAge"
  | "preferentialLevel"
  | "rate"
> & {
  period: {
    startDate: string;
    endDate: string;
  };
};

export type TCheckListItem = {
  todoId: string;
  date: Date; // 체크리스트 항목의 날짜
  done: boolean; // 체크리스트 항목의 완료 여부
  content: string; // 체크리스트 항목의 내용
};

export type TStudyMember = {
  userEmail: string; // 사용자의 이메일
  userName: string;
  applicantImgSrc: string; // 사용자의 이미지 URL
  role: TRoleText; // 사용자의 역할
  attendance: boolean; // 당일 출석 여부
  checkList: TCheckListItem[]; // 체크리스트 항목들
};
// export type TStudyMember = {
//   name: string;
//   role: string;
//   applicantImgSrc: string;
// };

export type TStudyItem = Pick<
  TStudy,
  | "_id"
  | "title"
  | "createdAt"
  | "period"
  | "time"
  | "dayOfWeek"
  | "location"
  | "type"
  | "categories"
  | "currentMembers"
  | "maxMembersNum"
  | "viewCount"
  | "applyCount"
  | "score"
> & {
  imgSrc: string;
};

// type TTeamMemberProfile = {
//   userId: string;
//   userName: string; // 유저 이름
//   role: string; // 스터디에서 맡은 직책
//   profileImage: string; // 프로필 이미지 URL
// };

// type TDesiredMember = {
//   ageRange?: string;
//   studyLevel?: string;
//   roles?: string[];
// };
