import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  studyId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  todos: [
    {
      name: String,
      done: Boolean,
    },
  ],
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
