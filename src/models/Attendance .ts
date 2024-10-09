// models/Attendance.js
import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  studyId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["late", "absent", "present"] },
});

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);
