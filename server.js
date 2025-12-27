import express from "express";
import connectDB from "./lib/db.js";
import userRoutes from "./Routes/userRoutes.js";
import friendRoutes from "./Routes/friendRoutes.js";
import postRoutes from "./Routes/postRoutes.js";

const app = express();
const PORT = process.env.PORT || 6969;

app.use(express.json());
connectDB();

app.use("social-media/user", userRoutes);
app.use("social-media/friend", friendRoutes);
app.use("social-media/post", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
