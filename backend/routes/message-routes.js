import express from "express";
import middleware from "../middlewares/middleware.js";
import { accessChats, sendMessage } from "../controllers/message-controller.js";

const router = express.Router();

router.use(middleware);

router.route("/chats").post(accessChats);
router.route("/send-message").post(sendMessage);
export default router;
