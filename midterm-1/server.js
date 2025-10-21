import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const posters = []; // store published posters

io.on("connection", (socket) => {
  console.log("A user connected");

  // send current posters to new user
  socket.emit("initPosters", posters);

  socket.on("newPoster", (data) => {
    posters.push(data);
    io.emit("newPoster", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("✅ Server running on port 4000");
});
