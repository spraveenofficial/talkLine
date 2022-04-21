import {
  MESSAGE_LOADING,
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  MESSAGE_CLEAR,
  MESSAGE_SELECT,
} from "../Constants/message-constant";
const initialState = {
  selectedId: null,
  loading: false,
  message: [],
  error: null,
  success: null,
};
export const message = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case MESSAGE_CLEAR:
      return {
        ...state,
        loading: false,
        error: null,
        success: null,
      };
    case MESSAGE_SELECT:
      return {
        ...state,
        selectedId: action.payload,
      };
    default:
      return state;
  }
};
