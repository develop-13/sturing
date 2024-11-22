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

const Role = model<IRole>("Role", RoleSchema);

export default Role;
