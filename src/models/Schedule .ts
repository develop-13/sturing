import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  studyId: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  location: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  detail: String,
});

export default mongoose.models.Schedule ||
  mongoose.model("Schedule", ScheduleSchema);
