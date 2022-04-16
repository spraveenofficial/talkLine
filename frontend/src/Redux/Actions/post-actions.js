import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
} from "../Constants/post-constants";
export const createNewPost = (post) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_POST_REQUEST,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/post`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: post,
    });
    dispatch({
      type: NEW_POST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: NEW_POST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};
