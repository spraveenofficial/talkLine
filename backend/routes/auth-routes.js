import express from "express";
import {
  sendOtp,
  verifyOtp,
  uploadAvatar,
} from "../controllers/auth-controller.js";
import middleware from "../middlewares/middleware.js";
const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/upload-avatar", middleware, uploadAvatar);

export default router;
