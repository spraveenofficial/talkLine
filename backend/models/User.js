import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/monkey-avatar.jpg",
      get: (avatar) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }
        return avatar;
      },
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    cover: {
      type: String,
    },
    bio: {
      type: String,
      default: "Hi,There i am using TalkLine.",
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);
// UserSchema.index({ name: "text" });

// UserSchema.virtual("subscribers", {
//   ref: "Subscription",
//   localField: "_id",
//   foreignField: "channelId",
//   justOne: false,
//   count: true,
//   // match: {  },
// });

// UserSchema.virtual("videos", {
//   ref: "Video",
//   localField: "_id",
//   foreignField: "userId",
//   justOne: false,
//   count: true,
// });

// Ecrypt Password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", UserSchema);

export default User;
