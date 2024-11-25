import mongoose, { Schema, model, Document, Types } from "mongoose";

interface IRole extends Document {
  studyId: Types.ObjectId; // Study의 ID
  userEmail: string; // 사용자 이메일
  role: string; // 사용자 역할
}

const RoleSchema = new Schema<IRole>(
  {
    studyId: {
      type: Schema.Types.ObjectId, // 수정: Schema.Types.ObjectId 사용
      ref: "Study",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Please use a valid email address."],
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // 생성일 및 수정일 자동 관리
  }
);

// 모델 정의 시 중복 방지
const Role = mongoose.models.Role || model<IRole>("Role", RoleSchema);
// mongoose.models.Role를 먼저 확인하여 이미 정의된 Role 모델이 있으면 이를 재사용합니다.
// 정의되지 않은 경우에만 새로 모델을 정의합니다.

export default Role;
