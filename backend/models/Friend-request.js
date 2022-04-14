import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FriendRequestSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
