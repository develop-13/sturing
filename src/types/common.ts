import { TLevelItem } from "@/db/levels";
import { TRoleItem } from "@/db/roles";

export type TAtmosphere =
  | "FRIENDLY"
  | "PROFESSIONAL"
  | "SERIOUS"
  | "SYSTEMATIC"
  | "ENTHUSIASTIC"
  | "RESPONSIBLE"
  | "LEARNING"
  | "COOPERATIVE"
  | "SELFDIRECTED"
  | "FREE";

export type TCategory =
  | "DESIGN"
  | "TECH"
  | "BUSINESS"
  | "MARKETING"
  | "ECONOMY"
  | "LANGUAGE"
  | "CERTIFICATION"
  | "SELFDEVELOP";

export type TLevel = "beginner" | "newcomer" | "junior" | "senior";

export type TRoleText =
  | "team_leader"
  | "deputy_manager"
  | "project_leader"
  | "notification_leader"
  | "attendance_checker"
  | "record_leader"
  | "environment_leader"
  | "schedule_leader";

export type TLocation = Record<string, string[]>;

// export type TSchedule = {
//   studyId: string;
//   date: Date;
//   title: string;
//   location: string;
//   startTime: string;
//   endTime: string;
//   detail: string; // (추가함) 어떤 스터디에 대한 상세한 설명
// };

export type applyInfos = {
  applyInfoId: string;
  userId: string;
  studyId: string;
  title: string;
  content: string;
  desiredRole: TRoleText;
  status: "rejected" | "accepted" | "pending" | "done";
}[];

export type TFilterDatas = {
  categories: TCategory[];
  locations: TLocation;
  membernum: number;
  duration: {
    from: Date;
    to: Date;
  };
  levels: TLevelItem[];
  roles: TRoleItem[];
};
