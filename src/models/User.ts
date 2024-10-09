import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: { type: String, required: true },
  MatchingInfo: {
    fieldLevel: {
      marketing: { level: String, major: Boolean },
      interest: { level: String, major: Boolean },
    },
    studyType: { type: String, enum: ["online", "offline"] },
    locations: [String],
    Atmosphere: [String],
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
