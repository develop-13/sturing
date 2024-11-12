import { TAtmosphere, TCategory, TLevel, TRoleText } from "./common";

export type TStudy = {
  _id: any;
  title: string;
  createdAt: string;
  period: {
    startDate: Date;
    endDate: Date;
  };
  creatorEmail: string;
  time: {
    startTime: string;
    endTime: string;
  };
  dayOfWeek: string;
  location: string;
  imgSrc: Blob | null;
  schedule: string[]; // 스케쥴 id 가담겨 있음
  type: "online" | "offline" | "";
  categories: TCategory[];
  status: string; // 진행중이거나 모집중이거나
  studyPlacePreference: string[]; // 모집하려는 팀원의 선호 장소 (오프라인의 경우)
  maxMembersNum: number;
  currentMembers: string[]; // email이 담김
  necessaryRoles: TRoleText[]; // 역할 목록 ex) 팀장, 부팀장
  preferentialAge: number[];
  preferentialLevel?: TLevel; // 모집하는 팀원의 희망 수준 ex) 비기너, 신입 등
  tasks: string[]; // 스터디에서 다룰 과제 목록
  rate: number; // 스터디 평가 점수
  atmospheres: TAtmosphere[]; // 스터디 분위기
  schedules: string[];
  noticesBoard: Array<{
    reading_requried: boolean;
    view: number;
    date: string;
    title: string;
    content: string;
    imgSrc: string;
    writer: string; // userId
    comments: Array<{
      writer: string;
      text: string;
    }>;
  }>;
  studyBoards: Array<{
    title: string;
    content: string;
    imgSrc: string;
    writer: string; // userId
    comments: Array<{
      writer: string;
      text: string;
    }>;
  }>;
  board: Array<{
    userId: string;
    createdAt: string;
    view: number;
    title: string;
    text: string;
    imgSrc: string;
    comment: Array<{
      userId: string;
      createdAt: string;
      text: string;
    }>;
    type: "notice" | "free" | "task";
  }>;
  viewCount: number; // 조회 수
  applyCount: number; // 지원 수
  score: number; // 스터디의 인기도 점수 (자동 계산될 값)
};

export type TStudyOverview = Pick<
  TStudy,
  "type" | "categories" | "title" | "imgSrc"
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
  | "period"
  | "dayOfWeek"
  | "time"
  | "maxMembersNum"
  | "preferentialAge"
  | "preferentialLevel"
  | "necessaryRoles"
  | "atmospheres"
> & {
  description: string;
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

export type TStudyDetail_participating = {};

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
