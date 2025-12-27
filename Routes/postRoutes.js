import { Router } from "express";
import { createPost, updatePost } from "../Controller/postController.js";
import { fetchUser } from "../Middleware/fetchUser.js";

const router = Router();

router.post("/create", fetchUser, createPost);
router.put("/update/:id", fetchUser, updatePost);

export default router;
