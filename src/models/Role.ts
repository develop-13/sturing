import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
  studyId: { type: String, required: true },
  userId: { type: String, required: true },
  role: { type: String, required: true },
});

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
