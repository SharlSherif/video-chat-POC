const express = require("express");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static("uploads")); // for serving the HTML file

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chunk", (chunk) => {
    // console.log(chunk)
    socket.broadcast.emit("c", chunk);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
