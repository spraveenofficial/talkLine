import express from "express";
import middleware from "../middlewares/middleware.js";
import {
  getProfile,
  getEachProfile,
  seachUser,
  updateBio,
  explorePersons,
  unfriendProfile,
} from "../controllers/profile-controller.js";
const router = express.Router();

router.use(middleware);

router.route("/").get(getProfile);
router.route("/profile/:id").get(getEachProfile);
router.route("/search").post(seachUser);
router.route("/bio").put(updateBio);
router.route("/explore").get(explorePersons);
router.route("/unfriend").put(unfriendProfile);
export default router;
