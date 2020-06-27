import React, { Component } from "react";
import { Link } from "react-router-dom";

const crypto = require("crypto");

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hash: ""
    };
  }

  hashFunction(data) {
    const md5 = crypto.createHash("md5");
    const hash = md5.update(data).digest("hex");

    return hash;
  }

  generateRoute() {
    const date = new Date().toUTCString();

    return this.hashFunction(date);
  }

  assignHash() {
    const hash = this.generateRoute();

    this.setState({ hash });
  }

  render() {
    return (
      <div>
        <h1> Main Page </h1>

        <button onClick={() => this.assignHash()}>Create a Room</button>
        {this.state.hash ? (
          <Link to={`/room/${this.state.hash}`}>
            {" "}
            <button> Go To Room </button>{" "}
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
