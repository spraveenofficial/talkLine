import User from "../models/User.js";
import FriendRequest from "../models/Friend-request.js";

const sendFriendRequest = async (req, res) => {
  const { id } = req.data;
  const { recieverId } = req.body;
  try {
    const sender = await User.findOne({ _id: id });
    const reciever = await User.findOne({ _id: recieverId });
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
    const friendRequest = new FriendRequest({
      senderId: id,
      recieverId,
      status: "pending",
    });
    const savedFriendRequest = await friendRequest.save();
    res.status(200).json({
      success: true,
      message: "Friend request sent successfully",
      friendRequest: savedFriendRequest,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong!" });
  }
};

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

const acceptFriendRequest = async (req, res) => {
  const { id } = req.data;
  const { friendRequestId } = req.body;
  try {
    const friendRequest = await FriendRequest.findOne({ _id: friendRequestId });
    if (!friendRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request not found!" });
    }
    if (friendRequest.recieverId.toString() !== id) {
      return res
        .status(404)
        .json({ success: false, message: "Friend request not found!" });
    }
    if (friendRequest.status !== "pending") {
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

export { sendFriendRequest, getFriendRequests, acceptFriendRequest };