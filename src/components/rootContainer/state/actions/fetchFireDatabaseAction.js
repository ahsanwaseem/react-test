import {
  FETCH_DB_POST_REQUEST,
  FETCH_DB_POST_SUCCESS
} from "../constants/constants";
import * as firebase from "firebase";

export function fetchFirebaseDB() {
  return dispatch => {
    dispatch(fetchPostRequest());
    let db = firebase
      .database()
      .ref()
      .child("posts");
    db.on("child_added", snap => {
      let dbComments;
      typeof snap.val().post.comments === "undefined"
        ? (dbComments = [])
        : (dbComments = JSON.parse(snap.val().post.comments));
      let newObj = {
        id: snap.key,
        post: {
          ...snap.val().post,
          comments: dbComments
        }
      };
      dispatch(fetchPostSuccess(newObj));
    });
  };
}

function fetchPostRequest() {
  return {
    type: FETCH_DB_POST_REQUEST
  };
}

function fetchPostSuccess(data) {
  return {
    type: FETCH_DB_POST_SUCCESS,
    data
  };
}
