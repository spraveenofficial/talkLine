import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
} from "../controllers/request-controller.js";

const router = express.Router();

router.use(middleware);

router.route("/send").post(sendFriendRequest);
router.route("/get").get(getFriendRequests);
router.route("/accept").post(acceptFriendRequest);

export default router;
