import express from "express";
import {
  sendOtp,
  verifyOtp,
  uploadAvatar,
  verifyUser,
  loginUsingOtp,
} from "../controllers/auth-controller.js";
import middleware from "../middlewares/middleware.js";
const router = express.Router();

router.post("/login", loginUsingOtp);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/upload-avatar", middleware, uploadAvatar);
router.get("/verify", middleware, verifyUser);

export default router;
