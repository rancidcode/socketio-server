const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 5001;
const cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

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
