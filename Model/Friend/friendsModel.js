import { model, Schema } from "mongoose";

const friendsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  friends: {
    type: [{ type: Object, ref: "Friend" }],
    default: [],
  },
});

export const Friends = model("Friends", friendsSchema);
