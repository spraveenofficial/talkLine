import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  FETCH_NOTIFICATIONS_REQUEST,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
} from "../Constants/notification-contants";

export const fetchNotification = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_NOTIFICATIONS_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/notification`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: FETCH_NOTIFICATIONS_SUCCESS,
      payload: data.notifications,
    });
    return true;
  } catch (error) {
    dispatch({
      type: FETCH_NOTIFICATIONS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};
