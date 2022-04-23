import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Like = mongoose.model("Like", LikeSchema);

export default Like;
