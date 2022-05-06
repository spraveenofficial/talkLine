import Message from "../models/Message.js";
import FriendRequest from "../models/Friend-request.js";
import User from "../models/User.js";
// @desc    Access Chats
// @route   POST /api/v1/message/chats
// @access  Private

const accessChats = async (req, res) => {
  const { id } = req.data;
  const { userId } = req.body;
  try {
    let chats = await Message.find({
      $or: [
        { sender: userId, receiver: id },
        { sender: id, receiver: userId },
      ],
    })
      .select("-receiver")
      .populate("sender", "name avatar");
    if (chats.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No chats found",
        chats: [],
      });
    }
    await Message.updateMany(
      {
        $or: [
          { sender: userId, receiver: id },
          { sender: id, receiver: userId },
        ],
      },
      { seen: true }
    );
    return res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      chats,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Send Message to a user
// @route   POST /api/v1/chats/send
// @access  Private

const sendMessage = async (req, res) => {
  const { id } = req.data;
  const { message, receiverId } = req.body;
  var newMessage = {
    sender: id,
    receiver: receiverId,
    message: message,
  };
  try {
    let message = await Message.create(newMessage);
    message = await message.populate("sender", "name avatar");
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get Messages
// @route   POST /api/v1/chats/messages
// @access  Private

const getUserChats = async (req, res) => {
  const { id } = req.data;
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

  //  Get all the unseen received messages
  const unseenMessages = await Message.find({
    receiver: id,
    seen: false,
  }).select("sender message seen");

  // Get all the user recent messages with timestamp
  const recentMessages = await Message.find({
    $or: [
      { sender: id, receiver: { $in: friends } },
      { sender: { $in: friends }, receiver: id },
    ],
  }).sort({ updatedAt: -1 });
  const unseenMessagesList = unseenMessages.map((message) => {
    return {
      sender: message.sender,
      message: message.message,
      seen: message.seen,
    };
  });

  res.json({
    success: true,
    message: "Chats fetched successfully",
    data: friendsList
      .map((friend) => {
        return {
          id: friend._id,
          name: friend.name,
          avatar: friend.avatar,
          bio: friend.bio,
          unseenMessages: unseenMessagesList.filter(
            (message) => message.sender.toString() === friend._id.toString()
          )
            ? unseenMessagesList.filter(
                (message) => message.sender.toString() === friend._id.toString()
              ).length
            : 0,
          recentMessage: recentMessages.filter(
            (message) =>
              message.sender.toString() === friend._id.toString() ||
              message.receiver.toString() === friend._id.toString()
          )[0]
            ? recentMessages.filter(
                (message) =>
                  message.sender.toString() === friend._id.toString() ||
                  message.receiver.toString() === friend._id.toString()
              )[0].updatedAt
            : null,
        };
      })
      .sort((a, b) => {
        if (a.recentMessage > b.recentMessage) {
          return -1;
        } else {
          return 1;
        }
      }),
  });
};

export { accessChats, sendMessage, getUserChats };
