import React, { Component } from "react";
import YouTube from "react-youtube";
import io from "socket.io-client";
import "./style.scss";

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.socket = io(`/${props.match.params.id}`);

    const stuff = props.match.params.id;

    this.options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ stuff })
    };

    fetch("/sendRoomID", this.options)
      .then(res => res.json())
      .then(data => console.log(data));

    console.log(props.match.params.id);

    this.state = {
      opts: {},
      videoID: "9-X67l4vuVY"
    };
  }

  componentDidMount() {
    fetch("/api/hello")
      .then(res => res.json())
      .then(data => console.log(data));

    this.setOpts({
      height: "390",
      width: "640",
      playerVars: {
        autoplay: 1
      }
    });

    this.socket.on("changeVideoNowPls", data => {
      console.log(data);

      // if (evt.target.getVideoData.video_id !== video_id) {
      this.setState({ videoID: data });
      // }
    });
  }

  setOpts(opts) {
    this.setState({ opts });
  }

  // _onReady(event) {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // }

  returnVideoID(url) {
    var video_id = url.split("v=")[1];
    var ampersandPosition = video_id.indexOf("&");
    if (ampersandPosition !== -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id;
  }

  playNextVideo(url) {
    const video_id = this.returnVideoID(url);
    this.socket.emit("changeVideo", { video_id });
    this.setState({ videoID: video_id });
  }

  _onPlay(evt) {
    // console.log(evt);
    console.log("played");

    this.socket.emit("onPlay", { time: evt.target.getCurrentTime() });
  }

  _onReady(evt) {
    evt.target.pauseVideo();
    console.log(evt.target);
  }

  _onPause(evt) {
    // console.log(evt);
    const currentTime = evt.target.getCurrentTime();
    console.log("paused");
    this.socket.emit("onPause", { message: currentTime });
  }

  _onSubmit() {
    let url = document.getElementById("vid-link").value;
    this.playNextVideo(url);
  }

  _onStateChange(evt) {
    console.log("state changed");
    this.socket.on("changeVideoNowPls", data => {
      console.log(data);

      // if (evt.target.getVideoData.video_id !== video_id) {
      this.setState({ videoID: data });
      // }
    });

    this.socket.on("seekToTimeOnPause", data => {
      let timeStamp = data.message;

      evt.target.seekTo(timeStamp);
      evt.target.pauseVideo();
    });

    this.socket.on("justPlay", data => {
      evt.target.playVideo();
    });
  }

  render() {
    return (
      <div>
        <div className="collection">
          <div className="coll-of-label-and-input">
            <label for="vid-link">Enter video link: </label>
            <input type="text" id="vid-link" />
            <button onClick={evt => this._onSubmit(evt)}>Search</button>
          </div>
          <h1> Video Player </h1>
          <YouTube
            videoId={this.state.videoID}
            opts={this.state.opts}
            onPause={evt => this._onPause(evt)}
            onPlay={evt => this._onPlay(evt)}
            onReady={this._onReady}
            onStateChange={evt => this._onStateChange(evt)}
          />
        </div>
      </div>
    );
  }
}
