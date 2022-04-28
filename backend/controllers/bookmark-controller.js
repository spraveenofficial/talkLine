import Bookmark from "../models/Bookmark.js";

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

export { createBookmark };
