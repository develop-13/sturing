import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // 이메일을 unique로 설정
  // birthDate: { type: Date, required: true },
  // gender: { type: String, required: true },
  matchingInfo: {
    interests: {
      type: [String], // 관심 분야 목록 (TCategory[])
      required: true,
    },
    fieldLevels: {
      type: Object, // Map 대신 일반 객체로 설정 (Record<TCategory, TLevel | "">)
      required: true,
    },
    studyTypePreference: {
      type: String,
      enum: ["online", "offline", "not_decided", "both"], // 온라인/오프라인 선호도
      required: true,
    },
    studyPlacePreference: {
      type: Object, // 장소 선호 (Record<string, boolean>)
      required: true,
    },
    studyAtmospherePreference: {
      type: Object, // 스터디 분위기 선호 (Record<TAtmosphere, boolean>)
      required: true,
    },
  },
  recentQueries: [String],
  recentViewedStudies: [String],
  study_in_participants: [String],
  schedules: [String],
  watchList: [String],
  Accepted_applies: [String],
  applies: [String],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
