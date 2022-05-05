import Post from "../models/Post.js";
import imageService from "../services/image-services.js";
import Like from "../models/Like.js";
import FriendRequest from "../models/Friend-request.js";
import Bookmark from "../models/Bookmark.js";
import Comment from "../models/Comments.js";
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
          isBookmarked: false,
          likes: {
            count: 0,
            isLiked: false,
          },
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
          isBookmarked: false,
          likes: {
            count: 0,
            isLiked: false,
          },
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
  const postsPerPage = 6;
  const currentPage = Number(req.query.page) || 1;
  const skip = postsPerPage * (currentPage - 1);
  const limit = postsPerPage;
  const posts = await Post.find({
    $or: [{ userId: id }, { userId: { $in: friends } }],
  })
    .sort({ createdAt: -1 })
    .populate("userId", "name avatar")
    .skip(skip)
    .limit(limit);

  if (posts.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No posts found",
      posts,
    });
  }
  const totalPosts = await Post.find({
    $or: [{ userId: id }, { userId: { $in: friends } }],
  }).countDocuments();
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const likes = await Like.find({
    postId: { $in: posts.map((post) => post._id.toString()) },
  });
  const checkIfBookmarked = await Bookmark.find({
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
        isBookmarked: checkIfBookmarked.some(
          (bookmark) => bookmark.postId.toString() === post._id.toString()
        ),
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
    scroll: {
      count: totalPages,
      currentPage: currentPage,
    },
  });
};

// @desc    Get each post
// @route   GET /api/v1/post/:postId
// @access  Private

const getEachPost = async (req, res) => {
  const { id } = req.data;
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate("userId", "name avatar");
    const likes = await Like.find({ postId: postId });
    const isLiked = likes.some((like) => like.userId.toString() === id);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    const checkIfBookmarked = await Bookmark.find({
      postId,
      userId: id,
    });
    const getComments = await Comment.find({ postId: postId })
      .populate("userId", "name avatar")
      .sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      post: {
        ...post._doc,
        userId: post.userId._id,
        userName: post.userId.name,
        userAvatar: post.userId.avatar,
        isBookmarked: checkIfBookmarked.length > 0 ? true : false,
      },
      likeData: {
        likes: likes.length,
        isLiked,
      },
      comments: getComments.map((eachComment) => {
        return {
          ...eachComment._doc,
          userId: eachComment.userId._id,
          userName: eachComment.userId.name,
          userAvatar: eachComment.userId.avatar,
        };
      }),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Post not found",
    });
  }
};

// @desc    Comment on a post
// @route   POST /api/v1/post/comment
// @access  Private

const createComment = async (req, res) => {
  const { id } = req.data;
  const { postId, comment } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        success: false,
        message: "Post not found",
      });
    }
    // TODO: Check if user is friend or not of the post owner
    const newComment = new Comment({
      userId: id,
      postId,
      comment,
    });
    await newComment.save();
    const commented = await Comment.findById(newComment._id).populate(
      "userId",
      "name avatar"
    );
    return res.status(200).json({
      success: true,
      message: "Comment created successfully",
      comment: {
        ...commented._doc,
        userId: commented.userId._id,
        userName: commented.userId.name,
        userAvatar: commented.userId.avatar,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Export all the functions
export { createPost, getPostsOfEachUser, getPosts, getEachPost, createComment };
