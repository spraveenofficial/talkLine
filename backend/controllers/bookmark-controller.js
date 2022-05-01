import Bookmark from "../models/Bookmark.js";
import Like from "../models/Like.js";
const createBookmark = async (req, res) => {
  const { id } = req.data;
  const { postId } = req.body;
  const checkIfBookmarked = await Bookmark.findOne({
    userId: id,
    postId,
  });
  if (checkIfBookmarked) {
    await Bookmark.findOneAndDelete({
      userId: id,
      postId,
    });
    return res.status(200).json({
      success: false,
      message: "Bookmark deleted",
    });
  } else {
    const newBookmark = await Bookmark.create({
      userId: id,
      postId,
    });
    return res.status(200).json({
      success: true,
      message: "Bookmark created",
    });
  }
};

const getBookmarks = async (req, res) => {
  const { id } = req.data;
  const bookmarks = await Bookmark.find({ userId: id })
    .populate("postId userId")
    .sort({ createdAt: -1 });
  if (bookmarks.length === 0) {
    return res.status(400).json({
      success: true,
      message: "No bookmarks yet",
      bookmarks: [],
    });
  }
  const totalLikes = await Like.find({
    postId: { $in: bookmarks.map((bookmark) => bookmark.postId) },
  });
  return res.status(200).json({
    success: true,
    message: "Bookmarks fetched",
    bookmarks: bookmarks.map((bookmark) => {
      return {
        ...bookmark.postId._doc,
        userId: bookmark.userId._id,
        userName: bookmark.userId.name,
        userAvatar: bookmark.userId.avatar,
        likes: {
          count: totalLikes.length,
          isLiked: totalLikes.some((like) => like.userId.toString() === id)
            ? true
            : false,
        },
        isBookmarked: true,
      };
    }),
  });
};

export { createBookmark, getBookmarks };
