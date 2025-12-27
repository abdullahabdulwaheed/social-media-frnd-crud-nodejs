import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const fetchUser = async (req, res) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.json({
      success: false,
      message: "Authentication token is required.",
    });
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.json({
      flag: 0,
      message: "Authentication token is not valid.",
    });
  }
};
