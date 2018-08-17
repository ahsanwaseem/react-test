import { connect } from "react-redux";
import { fetchFirebaseDB } from "./state/actions/fetchFireDatabaseAction";
import { removePostDB } from "./state/actions/removePostAction";
import { removePostComment } from "./state/actions/removeCommentAction";
import { addCommentPostDB } from "./state/actions/saveCommentAction";
import PostsContainer from "./PostsContainer";

function mapStateToProps(state) {
  const { posts } = state;
  return {
    posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFirebaseDB: () => dispatch(fetchFirebaseDB()),
    removePostDB: data => dispatch(removePostDB(data)),
    addCommentPostDB: (posts, value, id) =>
      dispatch(addCommentPostDB(posts, value, id)),
    removePostComment: (posts, key, postId) =>
      dispatch(removePostComment(posts, key, postId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer);
