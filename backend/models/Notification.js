import mongoose from "mongoose";
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    to: { type: Schema.Types.ObjectId, ref: "User" },
    from: { type: Schema.Types.ObjectId, ref: "User" },
    seen: { type: Boolean, default: false },
    url: String,
    type: String,
    message: String,
  },
  { timestamps: true }
);

notificationSchema.pre("save", function () {
  console.log("pre save", this);
  if (this.isNew) {
    var from_name = this.from.name;
    switch (this.type) {
      case "like_post":
        this.message = `${from_name} liked your post`;
        break;
      case "like_comment":
        this.message = `${from_name} liked your comment`;
        break;
      case "friend_request":
        this.message = `${from_name} sent you a friend request`;
        break;
    }
  }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
