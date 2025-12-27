import { model, Schema } from "mongoose";

const postsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  posts: {
    type: [{ type: Object, ref: "Post" }],
    default: [],
  },
});

export const Posts = model("Posts", postsSchema);
