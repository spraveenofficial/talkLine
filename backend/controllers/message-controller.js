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
  // Get all the friends of the user and there total unseen messages by the users
  const acceptedFriends = await FriendRequest.find({
    $or: [{ senderId: id }, { receiverId: id }],
    status: "accepted",
  })
    .select()
    .populate("senderId", "name avatar")
    .populate("receiverId", "name avatar");
  console.log(acceptedFriends);
  const friends = acceptedFriends.map((friend) => {
    if (friend.senderId._id.toString() === id) {
      return friend.receiverId._id.toString();
    } else {
      return friend.senderId._id.toString();
    }
  });

  const messages = await Message.find({
    $in: [{ sender: { $in: friends }, receiver: id }],
    seen: false,
  })
    .select("-receiver")
    .populate("sender", "name avatar");
  if (messages.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No messages found",
      messages: [],
    });
  }
  return res.status(200).json({
    success: true,
    message: "Messages fetched successfully",
    // Send all the friends of the user and there total unseen messages by the users
    messages: acceptedFriends.map((friend) => {
      const friendId =
        friend.senderId._id.toString() === id
          ? friend.receiverId
          : friend.senderId;
      const friendMessages = messages.filter(
        (message) => message.sender.toString() === friendId.toString()
      );
      return {
        friend,
        friendId: friendId.toString(),
        friendName: friend.senderId.name,
        friendAvatar: friend.senderId.avatar,
        friendMessages: friendMessages,
      };
    }),
  });
};

export { accessChats, sendMessage, getUserChats };
