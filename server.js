require('dotenv').config();

// Rest of your code stays the sameconst bcrypt = require("bcrypt");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/chatapp")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

const messageSchema = new mongoose.Schema({
  chatId: String,
  sender: String,
  receiver: String,
  text: String,
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Message = mongoose.model("Message", messageSchema);

const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const onlineUsers = {};

io.on("connection", (socket) => {

  // REGISTER
  socket.on("register", async ({ username, password }) => {
    if (!password || !passwordRegex.test(password)) {
      socket.emit("registerError", "Password does not meet requirements");
      return;
    }

    try {
      const hash = await bcrypt.hash(password, 10);
      await new User({ username, password: hash }).save();
      socket.emit("registerSuccess", "Account created successfully. Please login.");
    } catch {
      socket.emit("registerError", "Username already exists");
    }
  });

  // LOGIN (username only — as you wanted)
  socket.on("login", async ({ username }) => {
    const user = await User.findOne({ username });
    if (!user) {
      socket.emit("loginError", "User not found");
      return;
    }

    socket.username = username;
    onlineUsers[username] = socket.id;

    socket.emit("loginSuccess", username);
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // 🔥 RESET PASSWORD (THIS WAS MISSING)
  socket.on("resetPassword", async ({ username, newPassword }) => {
    if (!newPassword || !passwordRegex.test(newPassword)) {
      socket.emit("resetError", "Password does not meet requirements");
      return;
    }

    const hash = await bcrypt.hash(newPassword, 10);
    const result = await User.findOneAndUpdate(
      { username },
      { password: hash }
    );

    if (!result) {
      socket.emit("resetError", "User not found");
    } else {
      socket.emit("resetSuccess", "Password reset successful. Please login.");
    }
  });

  // RESTORE SESSION
  socket.on("restoreSession", (username) => {
    socket.username = username;
    onlineUsers[username] = socket.id;
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  // LOAD CHAT
  socket.on("loadChat", async ({ otherUser }) => {
    const chatId = [socket.username, otherUser].sort().join("_");
    const msgs = await Message.find({ chatId }).sort({ timestamp: 1 });
    socket.emit("chatHistory", msgs);
  });

  // SEND MESSAGE
  socket.on("privateMessage", async ({ to, text }) => {
    const chatId = [socket.username, to].sort().join("_");
    const msg = { chatId, sender: socket.username, receiver: to, text };

    await new Message(msg).save();

    if (onlineUsers[to]) {
      io.to(onlineUsers[to]).emit("privateMessage", msg);
    }
    socket.emit("privateMessage", msg);
  });

  // DISCONNECT
  socket.on("disconnect", () => {
    if (socket.username) {
      delete onlineUsers[socket.username];
      io.emit("onlineUsers", Object.keys(onlineUsers));
    }
  });
});

server.listen(3000, () =>
  console.log("Server running on http://localhost:3000")
);

