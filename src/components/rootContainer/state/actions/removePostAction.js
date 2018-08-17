import {
  REMOVE_DB_POST_REQUEST,
  REMOVE_DB_POST_SUCCESS
} from "../constants/constants";
import * as firebase from "firebase";

export function removePostDB(post) {
  return dispatch => {
    dispatch(removePostRequest());
    let db = firebase
      .database()
      .ref()
      .child("posts");
    db.on("child_removed", snap => {
      const prevPost = post;
      for (var i = 0; i < prevPost.length; i++) {
        if (prevPost[i].id === snap.key) {
          prevPost.splice(i, 1);
        }
      }
      dispatch(removePostSuccess(prevPost));
    });
  };
}

function removePostRequest() {
  return {
    type: REMOVE_DB_POST_REQUEST
  };
}

function removePostSuccess(prevPost) {
  return {
    type: REMOVE_DB_POST_SUCCESS,
    prevPost
  };
}
