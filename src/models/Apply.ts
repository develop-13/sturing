import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema({
  // 기존 필드
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  desiredRole: { type: [String] },
  status: { type: String, enum: ["rejected", "accepted", "pending", "done"] },

  // 새로 추가된 필드
  applicationDate: { type: Date, default: Date.now }, // 지원 날짜
  studyType: { type: String, enum: ["online", "offline"], required: true }, // 스터디 타입
  studyStartDate: { type: Date, required: true }, // 스터디 시작 날짜
  studyEndDate: { type: Date, required: true }, // 스터디 끝 날짜
  studyLocation: { type: String, required: true }, // 스터디 장소
  studyTitle: { type: String, required: true }, // 스터디 제목
  // 새롭게 추가된 요청된 필드
  applicantNickname: { type: String }, // 지원자 닉네임
  applicantImgSrc: { type: String }, // 지원자 닉네임
});

export default mongoose.models.Apply || mongoose.model("Apply", ApplySchema);
