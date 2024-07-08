const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Configure CORS for Express app
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "PUT"]
  }
});

// Socket.IO event handling
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`User ${socket.id} joined room: ${data.room}`);
  });

  // Handle sending a message
  socket.on("send_message", (data) => {
    console.log("Received message:", data);
    io.to(data.room).emit("receive_message", data.message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 1000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
