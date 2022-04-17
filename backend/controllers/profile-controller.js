import User from "../models/User.js";
import FriendRequest from "../models/Friend-request.js";
// @desc    Get User Profile
// @route   GET /api/v1/friend
// @access  Private

const getProfile = async (req, res) => {
  const { id } = req.data;
  try {
    const user = await User.findOne({ _id: id }).select("id name email avatar");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    } else {
      return res.json({
        message: "User fetched successfully",
        success: true,
        data: { ...user._doc, isMyProfile: true },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// @desc    Get Each User Profile
// @route   GET /api/v1/friend
// @access  Private

const getEachProfile = async (req, res) => {
  const { id } = req.params;
  const requestUserId = req.data.id;
  if (id === requestUserId) {
    return res
      .status(400)
      .json({ success: false, message: "You can't see your own profile!" });
  }
  try {
    const checkIfAlreadyFriend = await FriendRequest.findOne({
      $or: [
        { senderId: requestUserId, receiverId: id },
        { senderId: id, receiverId: requestUserId },
      ],
      status: "accepted",
    });
    const checkIfExist = await FriendRequest.findOne({
      $or: [
        { senderId: id, receiverId: requestUserId },
        { senderId: requestUserId, receiverId: id },
      ],
    });
    const checkIfUserHaveSentFriendRequest = await FriendRequest.findOne({
      senderId: requestUserId,
      receiverId: id,
    });
    const user = await User.findOne({ _id: id }).select(
      "id name avatar bio cover createdAt"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found in our Database!" });
    }
    return res.status(200).json({
      message: "User fetched successfully",
      success: true,
      data: {
        ...user._doc,
        isRequested: {
          isFriend: checkIfAlreadyFriend ? true : false,
          haveSentRequest: checkIfUserHaveSentFriendRequest ? true : false,
          haveToAccept:
            !checkIfUserHaveSentFriendRequest && checkIfExist ? true : false,
        },
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "User Not Found in our Database!" });
  }
};

// @desc    Search Users
// @route   GET /api/v1/friend
// @access  Private

const seachUser = async (req, res) => {
  const { name } = req.body;
  try {
    const users = await User.find({
      name: { $regex: name, $options: "i" },
    }).select("id name email avatar");
    if (users.length === 0) {
      res.status(404).json({ success: false, message: "User not found!" });
    }
    res.json({ message: "User fetched successfully", success: true, users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// @desc    Update User Bio
// @route   GET /api/v1/friend
// @access  Private

const updateBio = async (req, res) => {
  const { id } = req.data;
  const { bio } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: { bio } },
      { new: true }
    ).select("id name email avatar bio");
    return res.json({
      message: "Bio updated successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export { getProfile, getEachProfile, seachUser, updateBio };
