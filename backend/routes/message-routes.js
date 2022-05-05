import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  accessChats,
  sendMessage,
  getUserChats,
} from "../controllers/message-controller.js";

const router = express.Router();

router.use(middleware);

router.route("/chats").post(accessChats);
router.route("/send-message").post(sendMessage);
router.route("/messages").get(getUserChats);
export default router;
