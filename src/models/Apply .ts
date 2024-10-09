import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  studyId: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  desiredRole: String,
  status: { type: String, enum: ["rejected", "accepted", "pending", "done"] },
});

export default mongoose.models.Apply || mongoose.model("Apply", ApplySchema);
