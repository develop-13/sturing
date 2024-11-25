const translator: { [key: string]: string } = {
  categories: "분야",
  membernum: "인원",
  locations: "지역",
  duration: "기간",
  levels: "수준",
  roles: "역할",
  team_leader: "팀장",
  deputy_manager: "부팀장",
  project_leader: "과제 팀장",
  notification_leader: "알림 팀장",
  attendance_checker: "출결 팀장",
  record_leader: "기록 팀장",
  environment_leader: "환경 팀장",
  schedule_leader: "일정 팀장",
};

function getTranslation(text?: string): string | undefined {
  if (text === undefined) return "값이 없습니다.";
  return translator[text.toLowerCase()] || undefined;
}

export default getTranslation;
