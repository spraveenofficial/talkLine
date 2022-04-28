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
  UPDATE_LIKE_FEED,
  UPDATE_UNLIKE_FEED,
  BOOKMARK_UPDATE_REQUEST,
  UPDATE_BOOKMARK_FEED,
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

export const feed = (
  state = { loading: false, success: false, posts: [], error: null },
  action
) => {
  switch (action.type) {
    case FEED_FETCH_REQUEST:
      return { ...state, loading: true };
    case FEED_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        posts: action.payload,
      };
    case FEED_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_POST_TO_FEED:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case UPDATE_LIKE_FEED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload) {
            return {
              ...post,
              likes: {
                count: post.likes.count + 1,
                isLiked: true,
              },
            };
          }
          return post;
        }),
      };
    case UPDATE_UNLIKE_FEED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload) {
            return {
              ...post,
              likes: {
                count: post.likes.count - 1,
                isLiked: false,
              },
            };
          }
          return post;
        }),
      };
    case UPDATE_BOOKMARK_FEED:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload.id) {
            return {
              ...post,
              isBookmarked: action.payload.status,
            };
          }
          return post;
        }),
      };
    default:
      return state;
  }
};

export const post = (
  state = { loading: true, success: false, data: [], error: null },
  action
) => {
  switch (action.type) {
    case POST_FETCH_REQUEST:
      return { ...state, loading: true };
    case POST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: action.payload,
      };
    case POST_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case LIKE_UPDATE_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          likes: {
            likes: state.data.likes.likes + 1,
            isLiked: true,
          },
        },
      };
    case UNLIKE_UPDATE_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          likes: {
            likes: state.data.likes.likes - 1,
            isLiked: false,
          },
        },
      };
    case BOOKMARK_UPDATE_REQUEST:
      return {
        ...state,
        data: {
          ...state.data,
          post: {
            ...state.data.post,
            isBookmarked: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
