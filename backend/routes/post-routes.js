import express from "express";
import middleware from "../middlewares/middleware.js";
const router = express.Router();
import {
  createPost,
  getPosts,
  getEachPost,
} from "../controllers/post-controller.js";
router.use(middleware);

router.route("/").post(createPost);
router.route("/feed/").get(getPosts);
router.route("/:postId").get(getEachPost);
export default router;
