import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE,
  SEND_FRIEND_REQUEST,
  UNSEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  EXPLORE_PERSONS_REQUEST,
  EXPLORE_PERSONS_SUCCESS,
  EXPLORE_PERSONS_FAILURE,
  SEND_REQUEST_FROM_EXPLORE,
  SET_USER_POSTS,
  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,
  MY_PROFILE_FAILURE,
} from "../Constants/profile-constants";

export const profile = (
  state = {
    error: false,
    loading: false,
    success: false,
    user: {},
    message: "",
    posts: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_PROFILE_REQUEST:
      return { ...state, loading: true };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        user: {},
        message: action.payload,
        error: true,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        loading: false,
        success: false,
        user: {},
        message: "",
      };
    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        loading: false,
        success: true,
        user: {
          ...state.user,
          isRequested: { ...state.user.isRequested, haveSentRequest: true },
        },
      };
    case UNSEND_FRIEND_REQUEST:
      return {
        ...state,
        loading: false,
        success: true,
        user: {
          ...state.user,
          isRequested: { ...state.user.isRequested, haveSentRequest: false },
        },
      };
    case ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        loading: false,
        success: true,
        user: {
          ...state.user,
          isRequested: {
            ...state.user.isRequested,
            isFriend: true,
            haveToAccept: false,
          },
        },
      };
    case SET_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export const explore = (
  state = {
    error: false,
    loading: false,
    success: false,
    users: [],
    message: "",
  },
  action
) => {
  switch (action.type) {
    case EXPLORE_PERSONS_REQUEST:
      return { ...state, loading: true };
    case EXPLORE_PERSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.payload,
      };
    case EXPLORE_PERSONS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        users: [],
        message: action.payload,
        error: true,
      };
    case SEND_REQUEST_FROM_EXPLORE:
      return {
        ...state,
        loading: false,
        success: true,
        users: state.users.map((user) => {
          if (user._id === action.payload) {
            return {
              ...user,
              isRequested: true,
            };
          } else {
            return user;
          }
        }),
      };
    default:
      return state;
  }
};

export const myprofile = (
  state = { loading: true, success: false, user: [], message: "" },
  action
) => {
  switch (action.type) {
    case MY_PROFILE_REQUEST:
      return { ...state, loading: true };
    case MY_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        user: action.payload,
      };
    case MY_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        user: [],
        message: action.payload,
        error: true,
      };
    default:
      return state;
  }
};
