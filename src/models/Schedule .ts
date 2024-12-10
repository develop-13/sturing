import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  // userEmail: { type: String, required: true },
  studyId: {
    // 스터디와의 관계를 나타내는 필드
    type: mongoose.Schema.Types.ObjectId,
    ref: "Study",
    required: true,
  }, // 스터디 ID  date: { type: Date, required: true },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  detail: { type: String, required: true },
});

export default mongoose.models.Schedule ||
  mongoose.model("Schedule", ScheduleSchema);
