import React from "react";
import "./NewPost.css";

class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      text: ""
    };
  }

  handleValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  saveNewPost = e => {
    e.preventDefault();
    const { headline, text } = this.state;
    if (headline === "" || text === "") {
      alert("Error: Input fields can't be blank!");
    } else {
      let d = new Date();
      const monthName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let newPost = {
        headline: this.state.headline,
        text: this.state.text,
        date: { day: d.getDate(), month: monthName[d.getMonth()] }
      };
      this.props.onSave(newPost);
    }
  };

  cancelNewPost = () => {
    this.props.onCancel();
  };

  render() {
    return (
      <form className="newpost-container" onSubmit={this.saveNewPost}>
        <header className="newpost-header">
          <h2>New Post</h2>
        </header>
        <div className="input-wrapper">
          <input
            name="headline"
            className="input-wrapper headline border"
            type="text"
            placeholder="Headline"
            onChange={this.handleValueChange.bind(this)}
          />
        </div>
        <div className="input-wrapper flex-2">
          <input
            name="text"
            className="input-wrapper text border"
            type="text"
            placeholder="Text"
            onChange={this.handleValueChange.bind(this)}
          />
        </div>
        <div className="button-wrapper">
          <div className="button-sub-wrapper">
            <button onClick={e => this.saveNewPost(e)}>Save</button>
          </div>
          <div className="button-sub-wrapper">
            <button onClick={this.cancelNewPost}>Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewPost;
