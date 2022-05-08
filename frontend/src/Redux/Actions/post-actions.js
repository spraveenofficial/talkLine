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
  BOOKMARK_FETCH_REQUEST,
  BOOKMARK_FETCH_SUCCESS,
  BOOKMARK_FETCH_FAILURE,
  FEED_SCROLL_DONE,
  ADD_COMMENT_TO_POST,
  ADD_REPLY_TO_COMMENT,
} from "../Constants/post-constants";
import { ADD_NEW_POST_PROFILE } from "../Constants/profile-constants";
export const createNewPost = (post) => async (dispatch) => {
  const { status } = post;
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
    if (status) {
      dispatch({
        type: ADD_POST_TO_FEED,
        payload: data.post,
      });
    } else {
      dispatch({
        type: ADD_NEW_POST_PROFILE,
        payload: data.post,
      });
    }
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

export const getFeed = (page) => async (dispatch) => {
  try {
    dispatch({
      type: FEED_FETCH_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/post/feed?page=${page}`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (page === 1) {
      return dispatch({
        type: FEED_FETCH_SUCCESS,
        payload: {
          posts: data.posts,
          scroll: data.scroll,
        },
      });
    }
    return dispatch({
      type: FEED_SCROLL_DONE,
      payload: {
        posts: data.posts,
        scroll: data.scroll,
      },
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
      comments: data.comments,
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

export const likePost = (id) => async () => {
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
    return data.success;
  } catch (error) {
    return false;
  }
};

export const bookmark = (id) => async () => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/bookmark`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        postId: id,
      },
    });
    return data.success;
  } catch (error) {
    return false;
  }
};

export const getBookmarks = () => async (dispatch) => {
  try {
    dispatch({
      type: BOOKMARK_FETCH_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/bookmark`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: BOOKMARK_FETCH_SUCCESS,
      payload: data.bookmarks,
    });
  } catch (error) {
    dispatch({
      type: BOOKMARK_FETCH_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addComment = (payload) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/post/comment`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: payload,
    });
    if (payload.commentId) {
      dispatch({
        type: ADD_REPLY_TO_COMMENT,
        payload: data.comment,
      });
    } else {
      dispatch({
        type: ADD_COMMENT_TO_POST,
        payload: data.comment,
      });
    }
    return data.success;
  } catch (error) {
    return false;
  }
};

export const deletePost = async (id) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${baseUrl}/post/delete`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: {
        postId: id,
      },
    });
    return data.success;
  } catch (error) {
    return false;
  }
};
