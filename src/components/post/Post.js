import React from "react";
import "./Post.css";
import "font-awesome/css/font-awesome.min.css";
import NewComment from "../newComment/NewComment";

class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      newCommentVisiblity: false
    };
    this.handleRemovePost = this.handleRemovePost.bind(this);
  }

  handleRemovePost = () => {
    this.props.removePost();
  };
  //
  componentWillReceiveProps(props) {
    this.setState({
      newCommentVisiblity: false
    });
  }

  render() {
    const {
      day,
      month,
      headline,
      text,
      index,
      comment,
      commentSave,
      id
    } = this.props;
    const { newCommentVisiblity } = this.state;
    return (
      <section>
        <div className="post-container">
          <div className="post-date-wrapper">
            <div
              className={index % 2 === 0 ? "post-date red" : "post-date green"}
            >
              <p>
                <span>{`${day}.`}</span>
                <span>{month.toUpperCase().substring(0, 3)}</span>
              </p>
            </div>
          </div>
          <div
            className={
              index % 2 === 0
                ? "post-content-wrapper red"
                : "post-content-wrapper green"
            }
          >
            <div>
              <h1>{headline}</h1>
            </div>
            <div>
              <p>{text}</p>
            </div>
          </div>
          <div className="button-wrapper-container">
            <button onClick={this.handleRemovePost}>
              <i className="fa fa-times size" />
            </button>
            <button
              onClick={() =>
                newCommentVisiblity
                  ? this.setState({ newCommentVisiblity: false })
                  : this.setState({ newCommentVisiblity: true })
              }
            >
              <i className="fa fa-commenting size" />
            </button>
          </div>
        </div>
        <div>
          {comment &&
            comment.map((comment, key) => {
              return (
                <div className="comment-text-box-container" key={key}>
                  <p
                    className={
                      index % 2 === 0
                        ? "comment-text-box-container paragraph red"
                        : "comment-text-box-container paragraph green"
                    }
                  >
                    {comment}
                    <span className="comment-exit-button-container">
                      <button
                        className="comment-exit-button"
                        onClick={() => this.props.removeKey(key)}
                      >
                        <p>x</p>
                      </button>
                    </span>
                  </p>
                </div>
              );
            })}
        </div>
        <div className="newComment-absolute-container">
          {newCommentVisiblity === true ? (
            <NewComment
              onSaveComment={commentSave}
              exitCommentBox={() =>
                this.setState({ newCommentVisiblity: false })
              }
              id={id}
            />
          ) : null}
        </div>
      </section>
    );
  }
}

export default Post;
