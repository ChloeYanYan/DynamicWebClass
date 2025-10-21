import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

let posters = [];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.emit("welcome", { userId: socket.id });
  socket.emit("initPosters", posters);

  // 接收新海报
  socket.on("newPoster", (poster) => {
    posters.push(poster);
    io.emit("newPoster", poster);
  });

  socket.on("createPoster", (poster) => {
    posters.push(poster);
    io.emit("posterCreated", poster);
  });

  socket.on("updatePoster", (updated) => {
    posters = posters.map((p) => (p.id === updated.id ? updated : p));
    io.emit("posterUpdated", updated);
  });

  socket.on("deletePoster", ({ id }) => {
    posters = posters.filter((p) => p.id !== id);
    io.emit("posterDeleted", { id });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000");
});
