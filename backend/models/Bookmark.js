import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Bookmark = mongoose.model("Bookmark", BookmarkSchema);

export default Bookmark;
