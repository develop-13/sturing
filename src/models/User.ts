import Apply from "./Apply";

import mongoose, { Schema, Document, model, models } from "mongoose";

// Define the User interface based on the schema
export interface IUser extends Document {
  name: string;
  email: string;
  imgSrc?: string;
  matchingInfo?: {
    interests: string[];
    fieldLevels: Record<string, string>; // Replace `string` with specific type for TLevel if defined
    studyTypePreference: "online" | "offline" | "not_decided" | "both";
    studyPlacePreference: Record<string, boolean>;
    studyAtmospherePreference: Record<string, boolean>;
  };
  recentQueries: string[];
  recentViewedStudies: mongoose.Types.ObjectId[];
  study_in_participants: mongoose.Types.ObjectId[];
  schedules: {
    scheduleId: string;
    title: string;
    date: Date;
    location: string;
    startTime: string;
    endTime: string;
    detail: string;
  }[];
  watchList: mongoose.Types.ObjectId[];
  accepted_applies: mongoose.Types.ObjectId[];
  applies: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // 이메일을 unique로 설정
    imgSrc: { type: String },

    matchingInfo: {
      type: {
        interests: {
          type: [String], // 관심 분야 목록 (TCategory[]),
          required: true, // Required if matchingInfo exists
        },
        fieldLevels: {
          type: mongoose.Schema.Types.Mixed, // Record<TCategory, TLevel | "">
          required: true, // Required if matchingInfo exists
          default: {},
        },
        studyTypePreference: {
          type: String,
          enum: ["online", "offline", "not_decided", "both"],
          required: true, // Required if matchingInfo exists
        },
        studyPlacePreference: {
          type: mongoose.Schema.Types.Mixed, // Record<string, boolean>
          required: true, // Required if matchingInfo exists
          default: {},
        },
        studyAtmospherePreference: {
          type: mongoose.Schema.Types.Mixed, // Record<TAtmosphere, boolean>
          required: true, // Required if matchingInfo exists
          default: {},
        },
      },
      required: false, // matchingInfo itself is optional
    },
    recentQueries: [String],
    recentViewedStudies: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Study" },
    ],
    study_in_participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Study" },
    ],
    schedules: [
      {
        userEmail: { type: String },
        scheduleId: { type: String, required: true },
        title: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        detail: { type: String, required: true },
      },
    ],
    watchList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Study" }],
    accepted_applies: [
      { type: mongoose.Schema.Types.ObjectId, ref: Apply.modelName },
    ],
    applies: [{ type: mongoose.Schema.Types.ObjectId, ref: Apply.modelName }],
  },
  { minimize: false, strict: false }
);

export default mongoose.models.User || model<IUser>("User", UserSchema);
