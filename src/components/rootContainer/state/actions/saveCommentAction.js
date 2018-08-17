import {
  ADD_COMMENT_POST_REQUEST,
  ADD_COMMENT_POST_SUCCESS
} from "../constants/constants";
import * as firebase from "firebase";

export function addCommentPostDB(posts, value, id) {
  return dispatch => {
    dispatch(addCommentPostRequest());
    const newState = posts;
    let comments = [];
    let allComments;
    const db = firebase
      .database()
      .ref()
      .child("posts");
    db.once("value", snap => {
      for (var i = 0; i < newState.length; i++) {
        if (newState[i].id === id) {
          comments.push(value);
          allComments = [...newState[i].post.comments, ...comments];
          newState[i].post.comments = allComments;
          dispatch(addCommentPostSuccess(newState));
          db
            .child(newState[i].id)
            .child("post")
            .set({
              ...newState[i].post,
              comments: JSON.stringify(allComments)
            });
        }
      }
    });
  };
}

function addCommentPostRequest() {
  return {
    type: ADD_COMMENT_POST_REQUEST
  };
}

function addCommentPostSuccess(posts) {
  return {
    type: ADD_COMMENT_POST_SUCCESS,
    posts
  };
}
