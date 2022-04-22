import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import "./database/db.js";
import AuthRoutes from "./routes/auth-routes.js";
import PostRoutes from "./routes/post-routes.js";
import ProfileRoutes from "./routes/profile-routes.js";
import RequestRoutes from "./routes/request-routes.js";
import NotificationRoutes from "./routes/notification-routes.js";
import MessageRoutes from "./routes/message-routes.js";
import { Server } from "socket.io";
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser({ limit: "50mb" }));
// Registering morgan for development
app.use(morgan("dev"));

// Registering Cors
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const PORT = process.env.PORT || 3505;

// Registering Routes
app.use("/v1/api/auth/", AuthRoutes);
app.use("/v1/api/post/", PostRoutes);
app.use("/v1/api/profile/", ProfileRoutes);
app.use("/v1/api/friend/", RequestRoutes);
app.use("/v1/api/notification/", NotificationRoutes);
app.use("/v1/api/message/", MessageRoutes);

// Server initialize
const serverRunning = app.listen(PORT, () =>
  console.log(`App started running on ${PORT}`)
);

// Socket.io
const io = new Server(serverRunning, {
  cors: {
    origin: ["http://localhost:3000", "https://talk-line.vercel.app"],
    credentials: true,
  },
});
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
io.on("connection", (socket) => {
  socket.on("new-user", (id) => {
    console.log("new user connected");
    addUser(id, socket.id);
    socket.join(id);
    io.emit("connectedUsers", users);
  }),
    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.emit("connectedUsers", users);
    });

  socket.on("send-message", (data) => {
    socket.in(data.receiver).emit("receiveMessage", data);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
});
