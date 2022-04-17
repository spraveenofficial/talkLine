import express from "express";
import { getNotifications } from "../controllers/notification-controller.js";
import middleware from "../middlewares/middleware.js";
const router = express.Router();

router.use(middleware);

router.route("/").get(getNotifications);

export default router;
