import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
  FEED_FETCH_REQUEST,
  FEED_FETCH_SUCCESS,
  FEED_FETCH_FAILURE,
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

export const getFeed = () => async (dispatch) => {
  try {
    dispatch({
      type: FEED_FETCH_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/post/feed`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: FEED_FETCH_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: FEED_FETCH_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
