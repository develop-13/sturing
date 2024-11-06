import mongoose from "mongoose";

const ApplySchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  studyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  desiredRole: { type: [String] },
  status: { type: String, enum: ["rejected", "accepted", "pending", "done"] },
});

export default mongoose.models.Apply || mongoose.model("Apply", ApplySchema);
