import { Router } from "express";
import { fetchUser } from "../Middleware/fetchUser.js";
import {
  acceptRequest,
  addFriend,
  deleteFriend,
} from "../Controller/friendController.js";

const router = Router();

router.post("/add-friend/:id", fetchUser, addFriend);
router.put("/accept-request/:id", fetchUser, acceptRequest);
router.delete("/delete-friend/:id", fetchUser, deleteFriend);

export default router;
