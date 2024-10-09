// models/Study.js
import mongoose from "mongoose";

const StudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  period: {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  creatorId: { type: String, required: true },
  time: {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  imgSrc: String,
  schedule: [String],
  type: { type: String, enum: ["online", "offline"] },
  categories: [String],
  status: String,
  studyPlacePreference: [String],
  currentMembers: [String],
  maxMembersNum: { type: Number, required: true },
  necessaryRoles: [String],
  preferentialAge: Number,
  preferentialLevel: String,
  tasks: [String],
  rate: Number,
  atmospheres: [String],
  schedules: [String],
  noticesBoard: [
    {
      reading_required: Boolean,
      view: Number,
      date: Date,
      title: String,
      content: String,
      imgSrc: String,
      writer: String,
      comments: [{ writer: String, text: String }],
    },
  ],
  studyBoards: [
    {
      title: String,
      content: String,
      imgSrc: String,
      writer: String,
      comments: [{ writer: String, text: String }],
    },
  ],
  board: [
    {
      userId: String,
      createdAt: Date,
      view: Number,
      title: String,
      text: String,
      imgSrc: String,
      comment: [{ userId: String, createdAt: Date, text: String }],
      type: { type: String, enum: ["notice", "free", "task"] },
    },
  ],

  // 추가된 필드들
  viewCount: { type: Number, default: 0 }, // 조회 수
  applyCount: { type: Number, default: 0 }, // 지원 수
  score: { type: Number, default: 0 }, // 스터디의 인기도 점수 (자동 계산될 값)
});

export default mongoose.models.Study || mongoose.model("Study", StudySchema);
