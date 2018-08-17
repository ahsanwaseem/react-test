import React from "react";
import "./NewComment.css";

class NewComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ""
    };
  }

  onSaveComment = event => {
    event.preventDefault();
    if (this.state.comment === "") {
      alert("Error: Input field can't be blank!");
    }
    this.props.onSaveComment(this.state.comment, this.props.id);
  };

  exitCommentBoxDialog = event => {
    event.preventDefault();
    this.props.exitCommentBox();
  };

  render() {
    return (
      <form className="newcomment-container" onSubmit={this.onSaveComment}>
        <header className="newcomment-header">
          <h2>New Comment</h2>
        </header>
        <div className="newcomment-input-wrapper">
          <input
            type="text"
            placeholder="Text"
            onChange={e => this.setState({ comment: e.target.value })}
          />
        </div>
        <div className="button-wrapper">
          <div className="button-sub-wrapper">
            <button onClick={e => this.onSaveComment}>Save</button>
          </div>
          <div className="button-sub-wrapper">
            <button onClick={e => this.exitCommentBoxDialog(e)}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewComment;
