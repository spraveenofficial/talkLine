import { combineReducers } from "redux";
import { auth, signup, verifyOtp, uploadAvatar, login } from "./auth-reducers";
export default combineReducers({
  auth,
  signup,
  verifyOtp,
  uploadAvatar,
  login,
});
