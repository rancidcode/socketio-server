const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || 5001;
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => res.send("ws server"));

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", (ms) => {
    io.emit("message", ms);
  });
});

server.listen(PORT, () => {
  console.log("server is running...");
});
