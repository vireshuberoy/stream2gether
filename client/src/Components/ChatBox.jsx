import React, { Component } from "react";
import io from "socket.io-client";

export default class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.socket = io(`/${this.props.roomID}`);

    this.state = {
      roomID: this.props.roomID,
      msgData: "",
      messages: []
    };
  }
  
  //TODO:
  // Work out why sockets being called so many times

  componentDidMount() {
    this.socket.on("displayMessage", msg => {
      this.setState({ messages: [...this.state.messages, msg] });
    });
  }

  sendMessage(msg) {
    this.socket.emit("sendingMessage", msg);
  }

  changeStateFormData(evt) {
    let dataSome = evt.target.value;

    this.setState({ msgData: dataSome });
  }

  _onSubmit(evt) {
    this.sendMessage(this.state.msgData);
  }

  render() {
    console.log(this.state.messages);
    return (
      <div>
        <h1>Chat Box</h1>
        <div className="mainWindow">
          <div className="msgDisplayWindow">
            {this.state.messages.map(ele => (
              <div>{ele}</div>
            ))}
          </div>
          <textarea
            id="msgContent"
            onChange={evt => this.changeStateFormData(evt)}
          ></textarea>
          <button id="submit" onClick={evt => this._onSubmit(evt)}>
            Send
          </button>
        </div>
      </div>
    );
  }
}
