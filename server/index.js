const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
app.use(cors());
const port =  3001;
const portIO =  3000;

const server = http.createServer(app);
const _dirname = path.resolve();

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${portIO}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "/client/build/index.html"))
);

server.listen(port, () => console.log(` 🔥Server started on port ${port}` ));