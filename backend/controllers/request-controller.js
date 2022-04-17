import User from "../models/User.js";
import FriendRequest from "../models/Friend-request.js";
import Notification from "../models/Notification.js";

// @desc    Send friend request
// @route   POST /api/v1/friend/send
// @access  Private

const sendFriendRequest = async (req, res) => {
  const { id } = req.data;
  const { receiverId } = req.body;
  try {
    const sender = await User.findOne({ _id: id });
    const reciever = await User.findOne({ _id: receiverId });
    if (!sender) {
      return res
        .status(404)
        .json({ success: false, message: "Sender not found!" });
    }
    if (!reciever) {
      return res
        .status(404)
        .json({ success: false, message: "Reciever not found!" });
    }
    const checkIfExist = await FriendRequest.findOne({
      $or: [
        { senderId: id, receiverId: receiverId },
        { senderId: receiverId, receiverId: id },
      ],
    });
    if (checkIfExist) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request already sent!" });
    } else {
      const friendRequest = new FriendRequest({
        senderId: id,
        receiverId,
        status: "pending",
      });
      const savedFriendRequest = await friendRequest.save();
      Notification.create({
        from: sender,
        to: reciever,
        type: "friend_request",
        url: `/user/${id}`,
      });
      return res.status(200).json({
        success: true,
        message: "Friend request sent successfully",
        friendRequest: savedFriendRequest,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// @desc    Get friend request
// @route   GET /api/v1/friend
// @access  Private

const getFriendRequests = async (req, res) => {
  const { id } = req.data;
  try {
    const friendRequests = await FriendRequest.find({
      recieverId: id,
      status: "pending",
    }).select();
    if (!friendRequests) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request not found!" });
    }
    res.json({
      success: true,
      message: "Friend request fetched successfully",
      friendRequests,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// @desc    Accept friend request
// @route   GET /api/v1/friend
// @access  Private

const acceptFriendRequest = async (req, res) => {
  const { id } = req.data;
  const { friendRequestId } = req.body;
  try {
    const friendRequest = await FriendRequest.findOne({
      $or: [
        { senderId: id, receiverId: friendRequestId },
        { senderId: friendRequestId, receiverId: id },
      ],
    });
    if (!friendRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request not found!" });
    }
    friendRequest.status = "accepted";
    const savedFriendRequest = await friendRequest.save();
    res.status(200).json({
      success: true,
      message: "Friend request accepted successfully",
      friendRequest: savedFriendRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

const cancelFriendRequest = async (req, res) => {
  const { id } = req.data;
  const { friendRequestId } = req.body;
  try {
    const checkIfExist = await FriendRequest.findOneAndDelete({
      $or: [
        { senderId: id, receiverId: friendRequestId },
        { senderId: friendRequestId, receiverId: id },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Friend request cancelled successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

// @desc    Get User Friend List
// @route   GET /api/v1/friend
// @access  Private

const getMyFriends = async (req, res) => {
  const { id } = req.data;
  const acceptedFriends = await FriendRequest.find({
    $or: [
      { senderId: id, status: "accepted" },
      { receiverId: id, status: "accepted" },
    ],
  }).select();
  // Get exact friendName from acceptedFriends
  const friends = acceptedFriends.map((friend) => {
    if (friend.senderId.toString() === id) {
      return friend.receiverId;
    } else {
      return friend.senderId;
    }
  });
  try {
    const users = await User.find({ _id: { $in: friends } }).select(
      "id name avatar bio "
    );
    res.status(200).json({
      success: true,
      message: "Friends fetched successfully",
      users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

export {
  sendFriendRequest,
  getFriendRequests,
  acceptFriendRequest,
  getMyFriends,
  cancelFriendRequest,
};
