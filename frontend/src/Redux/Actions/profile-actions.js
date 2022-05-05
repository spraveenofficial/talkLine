import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,
  SEND_FRIEND_REQUEST,
  UNSEND_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  EXPLORE_PERSONS_REQUEST,
  EXPLORE_PERSONS_SUCCESS,
  EXPLORE_PERSONS_FAILURE,
  MY_PROFILE_REQUEST,
  MY_PROFILE_SUCCESS,
  MY_PROFILE_FAILURE,
} from "../Constants/profile-constants";
import { UNFRIEND_FRIEND, UPDATE_USER_BIO, ADD_NEW_FRIEND_TO_CONTEXT } from "../Constants/auth-constants";
export const loadUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_PROFILE_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/profile/profile/${id}`,
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

export const updateBio = (bio) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_BIO,
    payload: bio,
  });
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/profile/bio`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { bio },
    });
    dispatch({
      type: FETCH_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    return false;
  }
};

export const sendFriendRequest = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/friend/send`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { receiverId: id },
    });
    dispatch({
      type: SEND_FRIEND_REQUEST,
    });
  } catch (error) {
    return false;
  }
};

export const cancelFriendRequest = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "DELETE",
      url: `${baseUrl}/friend/cancel`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { friendRequestId: id },
    });
    dispatch({
      type: UNSEND_FRIEND_REQUEST,
    });
  } catch (error) {
    return false;
  }
};

export const acceptFriendRequest = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/friend/accept`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { friendRequestId: id },
    });
    dispatch({
      type: ACCEPT_FRIEND_REQUEST,
      payload: data.data,
    });
    dispatch({
      type: ADD_NEW_FRIEND_TO_CONTEXT,
      payload: data.data,
    });
  } catch (error) {
    return false;
  }
};

export const explorePersons = () => async (dispatch) => {
  try {
    dispatch({
      type: EXPLORE_PERSONS_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/profile/explore`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: EXPLORE_PERSONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: EXPLORE_PERSONS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const loadMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: MY_PROFILE_REQUEST,
    });
    const { data } = await axios({
      method: "GET",
      url: `${baseUrl}/profile`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: MY_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: MY_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const unfriendUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "PUT",
      url: `${baseUrl}/profile/unfriend`,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      data: { friendId: id },
    });
    if (!data.success) return false;
    dispatch({
      type: UNFRIEND_FRIEND,
      payload: id,
    });
    return true;
  } catch (error) {
    return false;
  }
};
