import { combineReducers } from "redux";
import { auth, signup, verifyOtp, uploadAvatar, login } from "./auth-reducers";
import { profile, explore } from "./profile-reducers";
import { newPost } from "./post-reducers";
import { notification } from "./notification-reducer";
export default combineReducers({
  auth,
  signup,
  verifyOtp,
  uploadAvatar,
  login,
  profile,
  newPost,
  notification,
  explore,
});
