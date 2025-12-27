import { model, Schema } from "mongoose";

const friendSchema = new Schema({
  status: String,
  friend_id: Schema.Types.ObjectId,
});

export const Friend = model("Friend", friendSchema);
