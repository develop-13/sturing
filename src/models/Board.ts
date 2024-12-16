import mongoose, { Schema, models } from "mongoose";

// Board 스키마
const BoardSchema: Schema = new Schema(
  {
    // boardId는 필요 없다면 제거
    boardClientId: { type: String, required: true },
    studyId: { type: String, required: true },
    writerImg: { type: String, required: true },
    writerName: { type: String, required: true },
    writerEmail: { type: String },
    writerRole: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    view: { type: Number, default: 0 },
    title: { type: String, required: true },
    text: { type: String, required: true },
    imgSrces: [{ type: String }],
    readingRequired: { type: Boolean },
    comments: [
      {
        commentId: { type: String, required: true },
        writerEmail: { type: String, required: true },
        writerName: { type: String, required: true },
        writerImg: { type: String, required: true },
        writerRole: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        text: { type: String, required: true },
        updatedAt: { type: Date },
        replies: [
          {
            replyId: { type: String, required: true },
            commentId: { type: String, required: true },
            writerEmail: { type: String, required: true },
            writerName: { type: String, required: true },
            writerImg: { type: String, required: true },
            writerRole: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
            text: { type: String, required: true },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Board || mongoose.model("Board", BoardSchema);
