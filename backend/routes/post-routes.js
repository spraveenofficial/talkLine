import express from "express";
import middleware from "../middlewares/middleware.js";
const router = express.Router();
import {
  createPost,
  getPosts,
  getEachPost,
  createComment,
  deletePost
} from "../controllers/post-controller.js";
router.use(middleware);

router.route("/").post(createPost);
router.route("/feed/").get(getPosts);
router.route("/:postId").get(getEachPost);
router.route("/comment").post(createComment);
router.route("/delete").delete(deletePost);

export default router;
