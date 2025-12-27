import { model, Schema } from "mongoose";

const postSchema = new Schema({
  title: String,
  description: String,
  created_time: {
    type: Date,
    default: Date.now,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          unique: true,
        },
        liked_time: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  dislikes: {
    type: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          unique: true,
        },
        disliked_time: { type: Date, default: Date.now },
      },
    ],
    default: [],
  },
  comments: {
    type: [{ comment: String, user_id: Schema.Types.ObjectId }],
    default: [],
  },
});

export const Post = model("Post", postSchema);
