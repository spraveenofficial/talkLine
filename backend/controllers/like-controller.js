import Like from "../models/Like.js";

const createLike = async (req, res) => {
  const { id } = req.data;
  const { postId } = req.body;
  const like = await Like.findOne({ userId: id, postId });
  if (like) {
    return res.status(400).json({
      message: "You already liked this post",
    });
  }
  const newLike = new Like({
    userId: id,
    postId,
  });
  await newLike.save();
  return res.status(200).json({
    message: "Post liked",
  });
};

export { createLike };
