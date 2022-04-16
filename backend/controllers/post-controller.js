import Post from "../models/Post.js";
import imageService from "../services/image-services.js";
// @desc    Create Post
// @route   POST /api/v1/post/create-post
// @access  Private

const createPost = async (req, res) => {
  const { id } = req.data;
  const { caption, isPhoto, photoUrl } = req.body;
  if (!isPhoto) {
    const post = new Post({
      userId: id,
      caption,
      isPhoto: isPhoto ? true : false,
      photoUrl,
    });
    try {
      const savedPost = await post.save();
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        post: savedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    const buffer = Buffer.from(
      photoUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
      "base64"
    );
    const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const uploadAvatar = await imageService.upload(buffer, imagePath);
    const post = new Post({
      userId: id,
      caption,
      isPhoto: isPhoto ? true : false,
      photoUrl: uploadAvatar,
    });
    try {
      const savedPost = await post.save();
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        post: savedPost,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// @desc    Get Post of a user
// @route   POST /api/v1/post
// @access  Private

const getPostsOfEachUser = async (req, res) => {
  const { id } = req.data;
  try {
    const posts = await Post.find({ userId: id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export { createPost, getPostsOfEachUser };
