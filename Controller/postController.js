import { User } from "../Model/usersModel.js";
import { Post } from "../Model/Post/postModel.js";
import { Posts } from "../Model/Post/postsModel.js";
import {} from "mongodb";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = await User.findOne({ _id: req.user.user_id });
    const post = Post({
      title: title,
      description: description,
    });
    const posts = await Posts.findOne({ user: req.user.user_id });
    const addPost = await Posts.updateOne(
      { user: user._id },
      { $push: { posts: post } }
    );
    if (!addPost.acknowledged) {
      return res.json({ flag: 0, message: "Cannot add post." });
    }
    return res
      .status(200)
      .json({ flag: 1, message: "Post added successfully." });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user_id = new ObjectId(req.user.user_id);
    const post_id = new ObjectId(req.params.id);
    const update = await Posts.updateOne(
      { user: user_id, "posts._id": post_id },
      {
        $set: { "posts.$.title": title, "posts.$.description": description },
      }
    );
    if (!update.acknowledged) {
      return res.json({ flag: 0, message: "Cannot update post" });
    }
    res.status(200).json({ flag: 1, message: "Post updated successfully." });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};
