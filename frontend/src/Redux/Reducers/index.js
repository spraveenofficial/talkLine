import { combineReducers } from "redux";
import { auth, signup, verifyOtp, uploadAvatar, login } from "./auth-reducers";
import { profile } from "./profile-reducers";
import { newPost } from "./post-reducers";
export default combineReducers({
  auth,
  signup,
  verifyOtp,
  uploadAvatar,
  login,
  profile,
  newPost,
});
