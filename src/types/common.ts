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

export type TRole =
  | "team_leader"
  | "deputy_manager"
  | "project_leader"
  | "notification_leader"
  | "attendance_checker"
  | "record_leader"
  | "environment_leader"
  | "schedule_leader";

export type TLocation = Record<string, string[]>;

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