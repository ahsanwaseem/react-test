import {
  REMOVE_COMMENT_POST_REQUEST,
  REMOVE_COMMENT_POST_SUCCESS
} from "../constants/constants";
import * as firebase from "firebase";

export function removePostComment(posts, key, postId) {
  return dispatch => {
    dispatch(removeCommentRequest());
    const db = firebase
      .database()
      .ref()
      .child("posts")
      .child(postId)
      .child("post");
    db.once("value", snap => {
      let newPost = posts.posts;
      for (var i = 0; i < newPost.length; i++) {
        if (newPost[i].id === postId) {
          if (typeof newPost[i].post.comments === "string") {
            newPost[i].post.comments = JSON.parse(newPost[i].post.comments);
          }
          newPost[i].post.comments.splice(key, 1);
          db.set({
            ...snap.val(),
            comments: JSON.stringify(newPost[i].post.comments)
          });
        }
      }
      dispatch(removeCommentSuccess());
    });
  };
}

function removeCommentRequest() {
  return {
    type: REMOVE_COMMENT_POST_REQUEST
  };
}

function removeCommentSuccess() {
  return {
    type: REMOVE_COMMENT_POST_SUCCESS
  };
}
