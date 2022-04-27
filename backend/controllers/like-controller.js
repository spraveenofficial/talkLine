import Like from "../models/Like.js";

// @desc    Like and dislike a post
// @route   POST /api/v1/like
// @access  Private

const createLike = async (req, res) => {
  const { id } = req.data;
  const { postId } = req.body;
  const like = await Like.findOne({ userId: id, postId });
  if (like) {
    await Like.findByIdAndDelete(like._id);
    return res.status(200).json({
      success: false,
      message: "Unliked success",
    });
  }
  const newLike = new Like({
    userId: id,
    postId,
  });
  await newLike.save();
  return res.status(200).json({
    success: true,
    message: "Liked success",
  });
};

export { createLike };
