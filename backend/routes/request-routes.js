import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  getMyFriends,
  cancelFriendRequest,
} from "../controllers/request-controller.js";

const router = express.Router();

router.use(middleware);

router.route("/send").post(sendFriendRequest);
router.route("/get").get(getFriendRequests);
router.route("/accept").put(acceptFriendRequest);
router.route("/cancel").delete(cancelFriendRequest);
router.route("/friends").get(getMyFriends);
export default router;
