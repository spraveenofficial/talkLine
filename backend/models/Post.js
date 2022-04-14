import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newPostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isPhoto: {
      type: Boolean,
      default: false,
    },
    photoUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Post = mongoose.model("Post", newPostSchema);

export default Post;
