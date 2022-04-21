import Message from "../models/Message.js";
import User from "../models/User.js";

// @desc    Access Chats
// @route   POST /api/v1/message/chats
// @access  Private

const accessChats = async (req, res) => {
  const { id } = req.data;
  const { userId } = req.body;
  try {
    // Find chats between two users and populate sender and receiver
    let chats = await Message.find({
      $or: [
        { sender: userId, receiver: id },
        { sender: id, receiver: userId },
      ],
    })
      .select("-receiver")
      .populate("sender", "name");
    //   .sort({ createdAt: -1 });
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
    message = await message.populate("sender", "name");
    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      message,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { accessChats, sendMessage };
