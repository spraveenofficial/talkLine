import express from "express";
import middleware from "../middlewares/middleware.js";
const router = express.Router();
import { createLike } from "../controllers/like-controller.js";

router.use(middleware);

router.route("/").post(createLike);

export default router;
