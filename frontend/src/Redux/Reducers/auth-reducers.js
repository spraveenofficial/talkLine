import {
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAILURE,
  UPDATE_USER_BIO,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAIL,
  USER_AVATAR_UPLOAD_REQUEST,
  USER_AVATAR_UPLOAD_SUCCESS,
  USER_AVATAR_UPLOAD_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  UNFRIEND_FRIEND,
  SENT_REQUEST_FROM_SUGGESTION,
  ADD_NEW_FRIEND_TO_CONTEXT,
} from "../Constants/auth-constants";

const initialState = {
  isAuthenticated: false,
  loading: localStorage.getItem("token") ? true : false,
  user: {},
  post: null,
};
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOAD_REQUEST:
      return { isAuthenticated: false, loading: true, user: null };
    case USER_LOAD_SUCCESS:
      return { isAuthenticated: true, loading: false, user: action.payload };
    case USER_LOAD_FAILURE:
      return { isAuthenticated: false, loading: false, user: null };
    case USER_LOGOUT:
      return { isAuthenticated: false, loading: false, user: null };
    case UPDATE_USER_BIO:
      return { ...state, user: { ...state.user, bio: action.payload } };
    case UNFRIEND_FRIEND:
      return {
        ...state,
        user: {
          ...state.user,
          friends: state.user.friends.filter(
            (friend) => friend.id !== action.payload
          ),
        },
      };
    case SENT_REQUEST_FROM_SUGGESTION:
      return {
        ...state,
        user: {
          ...state.user,
          suggestions: state.user.suggestions.map((eachSuggestion) => {
            if (eachSuggestion._id === action.payload) {
              return { ...eachSuggestion, isRequested: true };
            }
            return eachSuggestion;
          }),
        },
      };
    case ADD_NEW_FRIEND_TO_CONTEXT:
      return {
        ...state,
        user: {
          ...state.user,
          friends: [action.payload, ...state.user.friends],
        },
      };
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

export const uploadAvatar = (
  state = { loading: false, message: "", success: false },
  action
) => {
  switch (action.type) {
    case USER_AVATAR_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case USER_AVATAR_UPLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: "Avatar uploaded",
      };
    case USER_AVATAR_UPLOAD_FAILURE:
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

export const login = (
  state = { loading: false, success: false, message: "" },
  action
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_LOGIN_FAILURE:
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
