import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
