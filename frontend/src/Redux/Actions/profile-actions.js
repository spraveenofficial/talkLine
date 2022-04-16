import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  CLEAR_PROFILE,
} from "../Constants/profile-constants";

export const loadUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PROFILE_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/profile/${id}`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};
