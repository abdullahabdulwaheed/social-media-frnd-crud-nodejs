import { Friends } from "../Model/Friend/friendsModel.js";

export const addFriend = async (req, res) => {
  try {
    const user_id = new ObjectId(req.user.user_id);
    const friend_id = new ObjectId(req.params.id);
    const friend = await Friends.findOne({
      user: user_id,
      "friends.friend_id": friend_id,
    });
    if (friend) {
      if (friend.friends[0].status === "pending") {
        return res.json({
          flag: 0,
          message: "Friend request sent already",
        });
      }
      if (friend.friends[0].status === "accepted") {
        return res.json({ flag: 0, message: "Already friends" });
      }
    }
    const data = {
      _id: new ObjectId(),
      friend_id: friend_id,
      status: "pending",
    };

    const addFriend = await Friends.updateOne(
      { user: user_id },
      { $push: { friends: data } }
    );
    if (!addFriend.acknowledged) {
      return res.json({ flag: 0, message: "Error adding friend." });
    }

    const data2 = {
      _id: new ObjectId(),
      friend_id: user_id,
      status: "pending",
    };
    const friend_user = await Friends.updateOne(
      { user: friend_id },
      { $push: { friends: data2 } }
    );
    if (!friend_user.acknowledged) {
      return res.json({ flag: 0, message: "Error adding friend." });
    }

    res.status(200).json({
      flag: 1,
      message: "Friend Request Sent Successfully.",
    });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const user_id = new ObjectId(req.user.user_id);
    const friend_id = new ObjectId(req.params.id);
    const friend = await Friends.findOne({
      user: user_id,
      "friends.friend_id": friend_id,
    });
    if (!friend) {
      return res.json({
        flag: 0,
        message: "No friend request found.",
      });
    }
    if (friend) {
      if (friend.friends[0].status === "accepted") {
        return res.json({ flag: 0, message: "Already friends" });
      }
    }

    const addFriend = await Friends.updateOne(
      { user: user_id, "friends.friend_id": friend_id },
      { $set: { "friends.$.status": "accepted" } }
    );
    if (!addFriend.acknowledged) {
      return res.json({ flag: 0, message: "Error adding friend." });
    }

    const friend_user = await Friends.updateOne(
      { user: friend_id, "friends.friend_id": user_id },
      { $set: { "friends.$.status": "accepted" } }
    );
    if (!friend_user.acknowledged) {
      return res.json({ flag: 0, message: "Error adding friend." });
    }
    res.status(200).json({
      flag: 1,
      message: "Friend Request Accepted Successfully.",
    });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const user_id = new ObjectId(req.user.user_id);
    const friend_id = new ObjectId(req.params.id);
    const friend = await Friends.findOne({
      user: user_id,
      "friends.friend_id": friend_id,
    });
    if (!friend) {
      return res.json({
        flag: 0,
        message: "No friend request found.",
      });
    }
    const deleteFriend = await Friends.updateOne(
      { user: user_id, "friends.friend_id": friend_id },
      { $pull: { friends: { friend_id: friend_id } } }
    );
    if (!deleteFriend.acknowledged) {
      return res.json({ flag: 0, message: "Error deleting friend." });
    }
    const deleteFriend2 = await Friends.updateOne(
      { user: friend_id, "friends.friend_id": user_id },
      { $pull: { friends: { friend_id: user_id } } }
    );
    if (!deleteFriend2.acknowledged) {
      return res.json({ flag: 0, message: "Error deleting friend." });
    }
    res.status(200).json({ flag: 1, message: "Friend Deleted Successfully." });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};
