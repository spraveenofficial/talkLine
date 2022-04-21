import mongoose from "mongoose";
const schema = mongoose.Schema;

const messageSchema = new schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
      ref: "User",
    },
    receiver: {
      type: String,
      required: true,
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
