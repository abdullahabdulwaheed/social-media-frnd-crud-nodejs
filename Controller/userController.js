import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../Model/usersModel.js";
import { Post } from "../Model/Post/postModel.js";
import { Friends } from "../Model/Friend/friendsModel.js";

export const register = async (req, res) => {
  try {
    const { name, username, email, password, bio } = req.body;

    let emailExist = await User({ email: email });
    if (emailExist) {
      return res.json({ flag: 0, message: "E-Mail already exists." });
    }

    let usernameExists = await User.findOne({ username: username });
    if (usernameExists) {
      return res.json({ success: false, message: "Username already taken." });
    }

    const securedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name: name,
      username: username,
      email: email,
      password: securedPassword,
      bio: bio,
    });

    let friends = await Friends.create({
      user: user._id,
    });

    let posts = await Post.create({
      user: user._id,
    });

    res.status(200).json({ flag: 1, message: "Account created successfully." });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username_or_email, password } = req.body;
    let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    var loginUsing = "";
    var user = {};

    if (username_or_email.match(pattern)) {
      loginUsing = "email";
      user = await User.findOne({ email: username_or_email });
    } else {
      loginUsing = "username";
      user = await User.findOne({ username: username_or_email });
    }

    if (!user) {
      return res.json({ flag: 0, message: "User doesn't exist." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.json({ flag: 0, message: "Incorrect Password." });
    }

    const data = {
      user: {
        user_id: user._id,
      },
    };

    const authToken = jwt.sign(data, process.env.JWT_SECRET_KEY);
    res.json({ flag: 1, authToken: authToken });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.user_id }).select(
      "-password"
    );
    res.status(200).json({ flag: 1, user: user });
  } catch (error) {
    res.status(400).json({ flag: 0, error: error.message });
  }
};
