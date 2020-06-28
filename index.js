const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("client/build"));

app.post("/sendRoomID", (req, res) => {
  const nsp = io.of(`/${req.body.stuff}`);
  nsp.on("connection", socket => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });

    socket.on("changeVideo", data => {
      const { video_id } = data;
      console.log(video_id);
      nsp.emit("changeVideoNowPls", video_id);
    });

    socket.on("onPlay", data => {
      let timeStamp = data.time;
      console.log("should i plaY?");
      nsp.emit("justPlay", timeStamp);
    });

    socket.on("onPause", data => {
      let timeStamp = data;
      nsp.emit("seekToTimeOnPause", timeStamp);
    });

    socket.on("sendingMessage", (msg) => {
      console.log("the message is: " + msg);
      nsp.emit("displayMessage", msg);
    });
  });

  res.send({ message: "success" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

http.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
