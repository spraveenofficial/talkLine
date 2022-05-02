import { generateAuthToken } from "../utils/token.js";
import User from "../models/User.js";
import hashServices from "../services/hash-services.js";
import otpServices from "../services/otp-services.js";
import userService from "../services/user-services.js";
import Email from "../services/email-services.js";
import imageServices from "../services/image-services.js";
import FriendRequest from "../models/Friend-request.js";

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
    const checkIFUserExists = await User.findOne({ email });
    if (checkIFUserExists && !checkIFUserExists.isActivated) {
      const sendEmailWithOtp = await Email.sendSignupOtp(email, otp);
      return res.status(200).json({
        success: true,
        message: "User created successfully",
        hash: `${hash}.${expires}`,
        otp: otp,
      });
    } else {
      const sendEmailWithOtp = await Email.sendSignupOtp(email, otp);
      await user.save();
      res.status(200).json({
        success: true,
        message: "User created successfully",
        hash: `${hash}.${expires}`,
        otp: otp,
      });
    }
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
  const { id } = req.data;
  const { avatar } = req.body;
  // Image Base64
  const buffer = Buffer.from(
    avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
    "base64"
  );
  const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const uploadAvatar = await imageServices.upload(buffer, imagePath);
  if (!uploadAvatar) {
    return res
      .status(500)
      .json({ message: "Could not process the image", success: false });
  }
  const user = await userService.findUser({ _id: id });
  user.avatar = uploadAvatar;
  user.save();
  res.json({ message: "Avatar uploaded successfully", success: true });
};

// @desc    User Verify
// @route   POST /api/v1/auth/verify
// @access  Private

const verifyUser = async (req, res) => {
  const { id } = req.data;
  try {
    const user = await User.findOne({ _id: id }).select(
      "id name email avatar bio cover"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const checkIfInFriendSchema = await FriendRequest.find({
      $or: [
        { senderId: id, receiverId: { $ne: id } },
        { senderId: { $ne: id }, receiverId: id },
      ],
    })
      .select("senderId receiverId")
      .lean();
    const users = await User.find({
      _id: {
        $nin: [
          id,
          ...checkIfInFriendSchema.map((user) => user.receiverId),
          ...checkIfInFriendSchema.map((user) => user.senderId),
        ],
      },
      isActivated: true,
    })
      .select("id name bio avatar")
      .limit(2);
    const acceptedFriends = await FriendRequest.find({
      $or: [
        { senderId: id, status: "accepted" },
        { receiverId: id, status: "accepted" },
      ],
    }).select();
    const friends = acceptedFriends.map((friend) => {
      if (friend.senderId.toString() === id) {
        return friend.receiverId;
      } else {
        return friend.senderId;
      }
    });
    const friendsList = await User.find({ _id: { $in: friends } })
      .select("id name avatar bio")
      .sort({ updatedAt: -1 });
    res.json({
      message: "User verified successfully",
      success: true,
      user,
      friends: friendsList,
      suggestedUsers: users.map((user) => {
        return {
          ...user._doc,
          isRequested: false,
        };
      }),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// @desc    Login User with Email and Password and the user is activated
// @route   POST /api/v1/auth/login
// @access  Public

const loginUsingOtp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    if (user && user.isActivated && (await user.matchPassword(password))) {
      const otp = await otpServices.generateOtp();
      const ttl = 1000 * 60 * 2; // 2 min
      const expires = Date.now() + ttl;
      const data = `${email}.${otp}.${expires}`;
      const hash = hashServices.hashOtp(data);

      //Sending Otp Via Email
      const sendEmailWithOtp = await Email.sendSignupOtp(email, otp);
      res.status(200).json({
        success: true,
        message: "Otp Sent Successfully",
        hash: `${hash}.${expires}`,
        otp: otp,
      });
    } else if (!user) {
      return res.status(400).json({
        message: "User Not Found, Signup Now",
        statusCode: 500,
        success: false,
      });
    } else {
      return res.status(501).json({
        message: "Invalid Password",
        statusCode: 500,
        success: false,
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

export { sendOtp, verifyOtp, uploadAvatar, verifyUser, loginUsingOtp };
