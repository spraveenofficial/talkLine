import baseUrl from "../../Utils/baseurl";
import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  USER_AVATAR_UPLOAD_REQUEST,
  USER_AVATAR_UPLOAD_SUCCESS,
  USER_AVATAR_UPLOAD_FAILURE,
} from "../Constants/auth-constants";

export const signup = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/auth/send-otp`,
      data: payload,
    });
    if (!data.success) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: data.message,
      });
      return false;
    } else {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: {
          ...payload,
          hash: data.hash,
        },
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const verifyOtp = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: OTP_VERIFY_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/auth/verify-otp`,
      data: payload,
    });
    if (!data.success) {
      dispatch({
        type: OTP_VERIFY_FAIL,
        payload: data.message,
      });
      return false;
    } else {
      localStorage.setItem("token", data.token);
      dispatch({
        type: OTP_VERIFY_SUCCESS,
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: OTP_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const setProfile = (payload) => async (dispatch) => {
  console.log("fkwefoin");
  try {
    dispatch({
      type: USER_AVATAR_UPLOAD_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/auth/upload-avatar`,
      data: payload,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!data.success) {
      dispatch({
        type: USER_AVATAR_UPLOAD_FAILURE,
        payload: data.message,
      });
      return false;
    } else {
      dispatch({
        type: USER_AVATAR_UPLOAD_SUCCESS,
        payload: data.avatar,
      });
      return true;
    }
  } catch (error) {
    dispatch({
      type: USER_AVATAR_UPLOAD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};
