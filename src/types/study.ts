export type TStudy = {
  id: string;
  src: string;
  type: "온라인" | "오프라인";
  dayOfWeek: string;
  category: string;
  // dayOfWeek: string[];
  startTime: string;
  endTime: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  rate: number;
  currentParticipants: TTeamMemberProfile[];
  atmosphere: string[];
  desiredMember: TDesiredMember;
  creatorId: string;
};

type TTeamMemberProfile = {
  userId: string;
  userName: string; // 유저 이름
  role: string; // 스터디에서 맡은 직책
  profileImage: string; // 프로필 이미지 URL
};

type TDesiredMember = {
  ageRange?: string;
  studyLevel?: string;
  roles?: string[];
};
