import { combineReducers } from "redux";
import { auth, signup, verifyOtp, uploadAvatar, login } from "./auth-reducers";
import { profile, explore, myprofile } from "./profile-reducers";
import { newPost, feed, post, bookmark } from "./post-reducers";
import { notification } from "./notification-reducer";
import { message } from "./message-reducer";
export default combineReducers({
  auth,
  signup,
  verifyOtp,
  uploadAvatar,
  login,
  profile,
  myprofile,
  newPost,
  notification,
  explore,
  message,
  feed,
  post,
  bookmark,
});
