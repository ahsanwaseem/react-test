import {
  FETCH_DB_POST_REQUEST,
  FETCH_DB_POST_SUCCESS,
  REMOVE_DB_POST_SUCCESS,
  ADD_COMMENT_POST_SUCCESS,
  REMOVE_COMMENT_POST_SUCCESS
} from "../constants/constants";

const initialState = {
  posts: [],
  isFetching: false,
  error: false
};

export default function postsDatabaseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DB_POST_REQUEST:
      return {
        ...state,
        posts: [],
        isFetching: true
      };
    case FETCH_DB_POST_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.data],
        isFetching: false
      };
    case REMOVE_DB_POST_SUCCESS:
      return {
        ...state,
        posts: action.prevPost
      };
    case ADD_COMMENT_POST_SUCCESS:
      return {
        ...state,
        posts: action.posts
      };
    case REMOVE_COMMENT_POST_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
