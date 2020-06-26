const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ message: "hello world" });
});

io.on("connection", socket => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });

  socket.on("changeVideo", data => {
    const { video_id } = data;
    console.log(video_id);
    io.emit("changeVideoNowPls", video_id);
  });

  socket.on("onPlay", data => {
    let timeStamp = data.time;
    console.log("should i plaY?");
    io.emit("justPlay", timeStamp);
  });

  socket.on("onPause", data => {
    let timeStamp = data;
    io.emit("seekToTimeOnPause", timeStamp);
  });
});

http.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});