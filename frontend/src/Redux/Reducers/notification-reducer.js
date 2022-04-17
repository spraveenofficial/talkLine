import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from "../Constants/notification-contants";

export const notification = (
  state = {
    error: false,
    loading: false,
    success: false,
    notifications: [],
    message: "",
  },
  action
) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        notifications: action.payload,
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        notifications: [],
        message: action.payload,
        error: true,
      };
    default:
      return state;
  }
};
