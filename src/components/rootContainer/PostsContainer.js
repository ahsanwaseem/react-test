import React from "react";
import "./PostsContainer.css";
import "font-awesome/css/font-awesome.min.css";
import * as firebase from "firebase";
import { firebaseConfig } from "../../config/config";
import Post from "../post/Post";
import NewPost from "../newPost/NewPost";

export default class PostsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      newPostVisibility: false
    };
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = this.app
      .database()
      .ref()
      .child("posts");
  }

  componentDidMount() {
    this.props.fetchFirebaseDB();
  }

  handleSaveDataToDatabase = value => {
    this.db.push().set({ post: value });
    this.setState({ newPostVisibility: false });
  };

  handleRemovePost = postId => {
    const { posts: { posts } } = this.props;
    this.props.removePostDB(posts);
    this.db.child(postId).remove();
  };

  handleCommentSaveToDatabase = (value, id) => {
    const { posts: { posts } } = this.props;
    this.props.addCommentPostDB(posts, value, id);
  };

  removeCommentFromDb = (key, postId) => {
    this.props.removePostComment(this.props.posts, key, postId);
  };

  render() {
    const { posts: { posts } } = this.props;
    const { newPostVisibility } = this.state;
    return (
      <div id="container">
        <header className="posts-header-container">
          <div className="posts-header-wrapper">
            <h1>Posts</h1>
          </div>
          <div className="posts-newpost-wrapper">
            <button
              onClick={() =>
                this.setState({
                  newPostVisibility: true
                })
              }
            >
              <i className="fa fa-envelope margin" />
              <span>New Post</span>
            </button>
          </div>
          <div className="newPost-absolute-container">
            {newPostVisibility === true ? (
              <NewPost
                onSave={this.handleSaveDataToDatabase}
                onCancel={() => this.setState({ newPostVisibility: false })}
              />
            ) : null}
          </div>
        </header>
        {posts &&
          posts.map((post, key) => {
            const { id } = post;
            const { headline, text, comments } = post.post;
            const { day, month } = post.post.date;
            return (
              <Post
                key={key}
                index={key}
                day={day}
                month={month}
                headline={headline}
                text={text}
                removePost={() => this.handleRemovePost(id)}
                id={id}
                commentSave={this.handleCommentSaveToDatabase}
                comment={comments}
                removeKey={key => this.removeCommentFromDb(key, id)}
              />
            );
          })}
      </div>
    );
  }
}
