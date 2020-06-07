import React, { Component } from "react";

export default class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roomID: this.props.roomID
    };
  }

  render() {
    return (
      <div>
        <h1> Comments </h1>
        <p> The roomID is {`${this.state.roomID}`} </p>
      </div>
    );
  }
}
