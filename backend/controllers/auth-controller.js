import { generateAuthToken } from "../utils/token.js";
import User from "../models/User.js";
import hashServices from "../services/hash-services.js";
import otpServices from "../services/otp-services.js";
import userService from "../services/user-services.js";
import Email from "../services/email-services.js";
import Jimp from "jimp";
import path from "path";
// @desc    Send OTP
// @route   POST /api/v1/auth/send-otp
// @access  Public
const sendOtp = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = await otpServices.generateOtp();
  const ttl = 1000 * 60 * 2; // 2 min
  const expires = Date.now() + ttl;
  const data = `${email}.${otp}.${expires}`;
  const hash = hashServices.hashOtp(data);
  const user = new User({ name, email, password });
  try {
    // const saveUser = await user.save();
    // const sendEmailWithOtp = await Email.sendSignupOtp(email, otp);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      hash: `${hash}.${expires}`,
      otp: otp,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// @desc    Verify OTP
// @route   POST /api/v1/auth/verify-otp
// @access  Public

const verifyOtp = async (req, res) => {
  const { otp, hash, email } = req.body;
  const [hashedOtp, expires] = hash.split(".");
  if (Date.now() > +expires) {
    return res.status(400).json({ success: false, message: "OTP expired!" });
  }
  const data = `${email}.${otp}.${expires}`;
  const isValid = otpServices.verifyOtp(hashedOtp, data);
  if (!isValid) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }
  try {
    let user = await userService.findUser({ email });
    user.isActivated = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "User activated successfully",
      token: generateAuthToken(user._id),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Db error" });
  }
};

// @desc    Upload Profile aka Avatar
// @route   POST /api/v1/auth/upload-avatar
// @access  Private

const uploadAvatar = async (req, res) => {
  // Activation logic
  const { avatar } = req.body;
  // Image Base64
  const __dirname = path.resolve();
  const buffer = Buffer.from(
    avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );
  const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
  try {
    var jimResp = await Jimp.read(buffer);
    jimResp.resize(200, Jimp.AUTO).write(`${__dirname}/storage/${imagePath}`);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not process the image" });
  }
  const { id } = req.data;
  try {
    const user = await userService.findUser({ _id: id });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
    }
    user.avatar = `/storage/${imagePath}`;
    user.save();
    res.json({ user: user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export { sendOtp, verifyOtp, uploadAvatar };
