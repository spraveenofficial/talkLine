import express from "express";
import middleware from "../middlewares/middleware.js";
const router = express.Router();
import { createPost, getPosts } from "../controllers/post-controller.js";
router.use(middleware);

router.route("/").post(createPost);
router.route("/").get(getPosts);

export default router;
