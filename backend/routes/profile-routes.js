import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  getProfile,
  getEachProfile,
  seachUser,
  updateBio,
} from "../controllers/profile-controller.js";
const router = express.Router();

router.use(middleware);

router.route("/").get(getProfile);
router.route("/:id").get(getEachProfile);
router.route("/search").post(seachUser);
router.route("/bio").put(updateBio);
export default router;
