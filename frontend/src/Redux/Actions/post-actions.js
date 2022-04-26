import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
  FEED_FETCH_REQUEST,
  FEED_FETCH_SUCCESS,
  FEED_FETCH_FAILURE,
  POST_FETCH_REQUEST,
  POST_FETCH_SUCCESS,
  POST_FETCH_FAILURE,
  ADD_POST_TO_FEED,
  LIKE_UPDATE_REQUEST,
  UNLIKE_UPDATE_REQUEST,
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
      payload: data.post,
    });
    dispatch({
      type: ADD_POST_TO_FEED,
      payload: data.post,
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

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: POST_FETCH_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/post/${id}`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const dataToSend = {
      post: data.post,
      likes: data.likeData,
    };
    dispatch({
      type: POST_FETCH_SUCCESS,
      payload: dataToSend,
    });
  } catch (error) {
    dispatch({
      type: POST_FETCH_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/like`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        postId: id,
      },
    });
    if (data.success) {
      return dispatch({
        type: LIKE_UPDATE_REQUEST,
      });
    }
    dispatch({
      type: UNLIKE_UPDATE_REQUEST,
    });
    return data.success ? true : false;
  } catch (error) {
    return false;
  }
};
