import { TAtmosphere, TCategory, TLevel, TRoleText } from "@/types/common";
import { TSchedule, TStudyMember } from "@/types/study";
import { ObjectId } from "mongodb";
import mongoose, { Schema, Document, model, models } from "mongoose";

// TypeScript 인터페이스 정의 (Document 확장)
export interface IStudy extends Document {
  _id: ObjectId;
  title: string;
  createdAt: Date;
  period: {
    startDate: Date;
    endDate: Date;
  };
  creatorEmail: string;
  time: {
    startTime: string;
    endTime: string;
  };
  dayOfWeek: string;
  location: string;
  imgSrc: string;
  schedule: [{ type: mongoose.Schema.Types.ObjectId; ref: "Schedule" }];
  type: "online" | "offline";
  categories: TCategory[];
  status: string; // 진행중 또는 모집중
  studyPlacePreference: string[];
  currentMembers: TStudyMember[]; // userId 배열
  maxMembersNum: number;
  necessaryRoles: TRoleText[]; // 특정 역할
  preferentialAge: number[];
  preferentialLevel: TLevel;
  tasks: string[]; // 과제 목록
  rate: number; // 평가 점수
  atmospheres: TAtmosphere[];
  schedules: TSchedule[]; // 스케줄 id 배열
  noticesBoard: {
    reading_requried: boolean;
    view: number;
    date: Date;
    title: string;
    content: string;
    imgSrc: string;
    writer: string; // userId
    comments: {
      writer: string;
      text: string;
    }[];
  }[];
  studyBoards: {
    title: string;
    content: string;
    imgSrc: string;
    writer: string; // userId
    comments: {
      writer: string;
      text: string;
    }[];
  }[];
  board: {
    userId: string;
    createdAt: Date;
    view: number;
    title: string;
    text: string;
    imgSrc: string;
    comment: { userId: string; createdAt: Date; text: string }[];
    type: "notice" | "free" | "task";
  }[];
  viewCount: number;
  applyCount: number;
  score: number;
}

// Mongoose 스키마 정의
const StudySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    period: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    creatorEmail: { type: String, required: true },
    time: {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
    dayOfWeek: { type: String, required: true },
    location: { type: String, required: true },
    imgSrc: { type: String },
    // schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
    schedules: [
      {
        scheduleId: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        detail: { type: String, required: true },
      },
    ],
    type: { type: String, enum: ["online", "offline"], required: true },
    categories: [
      {
        type: String,
        enum: [
          "DESIGN",
          "TECH",
          "BUSINESS",
          "MARKETING",
          "ECONOMY",
          "LANGUAGE",
          "CERTIFICATION",
          "SELFDEVELOP",
        ],
      },
    ],
    status: { type: String, required: true },
    studyPlacePreference: [{ type: String }],

    currentMembers: [
      {
        userEmail: { type: String, required: true },
        userName: { type: String, required: true },
        applicantImgSrc: { type: String, required: true },
        role: { type: String, required: true },
        attendance: { type: Boolean, default: false }, // 당일 출석 여부
        checkList: [
          {
            date: { type: Date }, // 날짜
            todoId: { type: String },
            done: { type: Boolean, default: false }, // 완료 여부
            content: { type: String }, // 체크리스트 내용
          },
        ],
      },
    ],
    maxMembersNum: { type: Number, required: true },
    necessaryRoles: [
      {
        type: String,
        enum: [
          "team_leader",
          "deputy_manager",
          "project_leader",
          "notification_leader",
          "attendance_checker",
          "record_leader",
          "environment_leader",
          "schedule_leader",
        ],
      },
    ],
    preferentialAge: { type: Schema.Types.Mixed }, // number | string
    preferentialLevel: {
      type: String,
      enum: ["beginner", "newcomer", "junior", "senior"],
    },
    tasks: [{ type: String }],
    rate: { type: Number, default: 0 },
    atmospheres: [
      {
        type: String,
        enum: [
          "FRIENDLY",
          "PROFESSIONAL",
          "SERIOUS",
          "SYSTEMATIC",
          "ENTHUSIASTIC",
          "RESPONSIBLE",
          "LEARNING",
          "COOPERATIVE",
          "SELFDIRECTED",
          "FREE",
        ],
      },
    ],
    noticesBoard: [
      {
        reading_requried: { type: Boolean, default: false },
        view: { type: Number, default: 0 },
        date: { type: Date, default: Date.now },
        title: { type: String, required: true },
        content: { type: String, required: true },
        imgSrc: { type: String },
        writer: { type: String, required: true },
        comments: [
          {
            writer: { type: String, required: true },
            text: { type: String, required: true },
          },
        ],
      },
    ],
    studyBoards: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
        imgSrc: { type: String },
        writer: { type: String, required: true },
        comments: [
          {
            writer: { type: String, required: true },
            text: { type: String, required: true },
          },
        ],
      },
    ],
    board: [
      {
        userId: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        view: { type: Number, default: 0 },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgSrc: { type: String },
        comment: [
          {
            userId: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            text: { type: String, required: true },
          },
        ],
        type: {
          type: String,
          enum: ["notice", "free", "task"],
          required: true,
        },
      },
    ],
    viewCount: { type: Number, default: 0 },
    applyCount: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    _id: true, // 이 옵션이 기본값이나 명시적으로 설정할 수 있음
  } // 이 옵션으로 createdAt과 updatedAt이 자동 추가
);

// 모델 생성
export default models.Study || model<IStudy>("Study", StudySchema);
