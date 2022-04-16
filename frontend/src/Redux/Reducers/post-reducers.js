import {
  NEW_POST_REQUEST,
  NEW_POST_SUCCESS,
  NEW_POST_FAILURE,
} from "../Constants/post-constants";

export const newPost = (
  state = {
    loading: false,
    success: false,
    message: "",
    error: "",
    post: null,
  },
  action
) => {
  switch (action.type) {
    case NEW_POST_REQUEST:
      return { ...state, loading: true };
    case NEW_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        post: action.payload,
        message: "Post created",
      };
    case NEW_POST_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        message: action.payload,
      };
    default:
      return state;
  }
};
