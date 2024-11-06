import mongoose from "mongoose";

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
    recentViewedStudies: [String],
    study_in_participants: [String],
    schedules: [String],
    watchList: [String],
    Accepted_applies: [String],
    applies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Apply" }],
  },
  { minimize: false, strict: false }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
