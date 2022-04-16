import express from "express";
import middleware from "../middlewares/middleware.js";
const router = express.Router();
import { createPost } from "../controllers/post-controller.js";
router.use(middleware);

router.route("/create-post").post(createPost);

export default router;
