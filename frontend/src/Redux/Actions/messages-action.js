import axios from "axios";
import baseUrl from "../../Utils/baseurl";
import {
  MESSAGE_LOADING,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  UPDATE_SENT_MESSAGE,
} from "../Constants/message-constant";
export const fetchChat = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGE_LOADING,
    });
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/message/chats`,
      data: { userId: payload },
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: data.chats,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};

export const sendMessage = (payload) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "POST",
      url: `${baseUrl}/message/send-message`,
      data: payload,
      headers: {
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: UPDATE_SENT_MESSAGE, payload: data.message });
    return data.message;
  } catch (error) {
    console.log(error);
    return false;
  }
};
