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

  // 새롭게 추가된 필드
  applicantNickname: { type: String }, // 지원자 닉네임
  applicantImgSrc: { type: String }, // 지원자 이미지

  // 스터디와의 관계를 나타내는 필드
  studyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Study",
    required: true,
  }, // 스터디 ID
});

// 미들웨어: Apply 문서가 삭제되었을 때 처리: Apply 도큐먼트 하나만 삭제해도 이를 참조하는 필드에서 해당 도큐먼트를 삭제시키기
ApplySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const { _id, userEmail } = doc;

    // 지원자의 applies 배열에서 해당 지원 삭제
    await mongoose
      .model("User")
      .updateOne({ email: userEmail }, { $pull: { applies: _id } });

    // 모든 개설자의 accepted_applies 배열에서 해당 지원 삭제
    await mongoose
      .model("User")
      .updateMany(
        { accepted_applies: _id },
        { $pull: { accepted_applies: _id } }
      );
  }
});

export default mongoose.models.Apply || mongoose.model("Apply", ApplySchema);
