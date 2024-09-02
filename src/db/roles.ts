import { TRole } from "@/types/common";

export type TRoleItem = {
  role: TRole;
  title: string;
  text: string;
};
export const roleData: TRoleItem[] = [
  { role: "team_leader", title: "팀장", text: "팀의 리더" },
  { role: "deputy_manager", title: "부팀장", text: "리더 보조" },
  { role: "project_leader", title: "과제팀장", text: "과제 제출 확인" },
  { role: "notification_leader", title: "알림팀장", text: "과제 진행 알림" },
  { role: "attendance_checker", title: "출결 확인", text: "출결 확인" },
  { role: "record_leader", title: "기록팀장", text: "스터디 기록" },
  { role: "environment_leader", title: "환경팀장", text: "장소 조율" },
  { role: "schedule_leader", title: "일정팀장", text: "일정 조율" },
];
