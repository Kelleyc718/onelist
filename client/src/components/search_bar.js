import React, { Component } from "react";
import "../../static/css/search_bar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { userInput: "" };
  }

  render() {
    return (
      <div>
        <input
          className="search-input"
          value={this.state.userInput}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }
  onInputChange(userInput) {
    this.setState({ userInput });
    this.props.onSearchChange(userInput);
  }
}
