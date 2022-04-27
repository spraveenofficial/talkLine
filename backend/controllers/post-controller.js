import Post from "../models/Post.js";
import imageService from "../services/image-services.js";
import Like from "../models/Like.js";
import FriendRequest from "../models/Friend-request.js";

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
      const populatedPost = await Post.findById(savedPost._id).populate(
        "userId",
        "name avatar"
      );
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        post: {
          ...savedPost._doc,
          userId: populatedPost.userId._id,
          userName: populatedPost.userId.name,
          userAvatar: populatedPost.userId.avatar,
          isLiked: false,
        },
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
      const populatedPost = await Post.findById(savedPost._id).populate(
        "userId",
        "name avatar"
      );
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        post: {
          ...savedPost._doc,
          userId: populatedPost.userId._id,
          userName: populatedPost.userId.name,
          userAvatar: populatedPost.userId.avatar,
          isLiked: false,
        },
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
// @route   GET /api/v1/post
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

// @desc    Get Posts for Home Page of friends and me
// @route   GET /api/v1/post/feed
// @access  Private

const getPosts = async (req, res) => {
  // Get Posts of my and my friends who's status is accepted
  const { id } = req.data;
  const acceptedFriends = await FriendRequest.find({
    $or: [
      { senderId: id, status: "accepted" },
      { receiverId: id, status: "accepted" },
    ],
  }).select();
  const friends = acceptedFriends.map((friend) => {
    if (friend.senderId.toString() === id) {
      return friend.receiverId.toString();
    } else {
      return friend.senderId.toString();
    }
  });
  const posts = await Post.find({
    $or: [{ userId: id }, { userId: { $in: friends } }],
  })
    .sort({ createdAt: -1 })
    .populate("userId", "name avatar");
  if (posts.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No posts found",
      posts,
    });
  }
  const likes = await Like.find({
    postId: { $in: posts.map((post) => post._id.toString()) },
  });
  res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    posts: posts.map((post) => {
      return {
        ...post._doc,
        userId: post.userId._id,
        userName: post.userId.name,
        userAvatar: post.userId.avatar,
        likes: {
          count: likes.filter(
            (like) => like.postId.toString() === post._id.toString()
          ).length,
          isLiked: likes.some((like) => {
            return (
              like.postId.toString() === post._id.toString() &&
              like.userId.toString() === id
            );
          })
            ? true
            : false,
        },
      };
    }),
  });
};

// @desc    Get each post
// @route   GET /api/v1/post/:postId
// @access  Private

const getEachPost = async (req, res) => {
  const { id } = req.data;
  const { postId } = req.params;
  const post = await Post.findById(postId).populate("userId", "name avatar");
  const likes = await Like.find({ postId: postId });
  const isLiked = likes.some((like) => like.userId.toString() === id);
  if (!post) {
    return res.status(400).json({
      success: false,
      message: "Post not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Post fetched successfully",
    post: {
      ...post._doc,
      userId: post.userId._id,
      userName: post.userId.name,
      userAvatar: post.userId.avatar,
    },
    likeData: {
      likes: likes.length,
      isLiked,
    },
  });
};

// Export all the functions
export { createPost, getPostsOfEachUser, getPosts, getEachPost };
