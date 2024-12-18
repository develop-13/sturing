import { TRoleText } from "./common";

export type TApply = {
  _id: string;
  studyId: string;
  userEmail: string;
  userName: string;
  title: string;
  content: string;
  desiredRole: TRoleText[];
  status: "rejected" | "accepted" | "pending" | "done";

  // 새로 추가된 필드
  // applicationDate?: Date; // 지원 날짜
  applicationDate: string; // 지원 날짜
  studyType: "online" | "offline"; // 스터디 타입
  studyStartDate: string; // 스터디 시작 날짜
  studyEndDate: string; // 스터디 끝 날짜
  studyLocation: string; // 스터디 장소
  studyTitle: string; // 스터디 제목

  // 새롭게 추가된 필드
  // applicantNickname?: string; // 지원자 닉네임
  applicantImgSrc?: string; // 지원자 이미지
};

export type TStatus = "notApplied" | "joined" | "hasApplied";
