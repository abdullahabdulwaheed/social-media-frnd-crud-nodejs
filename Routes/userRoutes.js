import { Router } from "express";
import { getUser, login, register } from "../Controller/userController.js";
import { fetchUser } from "../Middleware/fetchUser.js";

const router = Router();

router.get("/get-user", fetchUser, getUser);
router.post("/login", login);
router.post("/register", register);

export default router;
