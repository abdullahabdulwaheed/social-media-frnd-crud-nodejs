import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: "",
    },
    post_liked: {
      type: [
        {
          post_id: Schema.Types.ObjectId,
          liked_time: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    post_disliked: {
      type: [
        {
          post_id: Schema.Types.ObjectId,
          disliked_time: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
