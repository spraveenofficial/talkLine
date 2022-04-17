import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE,
  SEND_FRIEND_REQUEST,
  UNSEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
} from "../Constants/profile-constants";
export const profile = (
  state = {
    error: false,
    loading: false,
    success: false,
    user: {},
    message: "",
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
    default:
      return state;
  }
};
