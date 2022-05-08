import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    replies: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

// Populate replies before sending to the user
commentSchema.methods.populateReplies = function () {
  const { replies } = this;
  const populatedReplies = replies.map((reply) => {
    return {
      ...reply,
      userId: {
        ...reply.userId,
        name: reply.userId.name,
        avatar: reply.userId.avatar,
      },
    };
  });
  return populatedReplies;
};

const comments = mongoose.model("Comment", commentSchema);

export default comments;
