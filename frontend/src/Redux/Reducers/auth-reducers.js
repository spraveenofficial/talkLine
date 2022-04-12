import {
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILURE,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
} from "../Constants/auth-constants";
export const auth = (
  state = { isAuthenticated: false, loading: true, user: null },
  action
) => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
      return { isAuthenticated: false, loading: true, user: null };
    case USER_LOAD_SUCCESS:
      return { isAuthenticated: true, loading: false, user: action.payload };
    case USER_LOAD_FAILURE:
      return { isAuthenticated: false, loading: false, user: null };
    case USER_LOGOUT:
      return { isAuthenticated: false, loading: false, user: null };
    default:
      return state;
  }
};

export const signup = (
  state = { loading: false, message: null, user: {}, success: false },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "OTP sent to your email",
        user: action.payload,
        success: true,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const verifyOtp = (
  state = { loading: false, success: false, message: "" },
  action
) => {
  switch (action.type) {
    case OTP_VERIFY_REQUEST:
      return { ...state, loading: true };
    case OTP_VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "OTP verified",
      };
    case OTP_VERIFY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
