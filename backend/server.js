import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.use(express.json());
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(roomId)
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('send_message', (data) => {
    const room = data.chatroom_id;
    console.log(`Message to room ${room}:`, data);
    // Broadcast to everyone in that room
    io.to(room).emit('receive_message', data);
  });
 socket.on("leave_room", (roomId) => {
    socket.leave(roomId);
    console.log(`Socket ${socket.id} left room ${roomId}`);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});
app.post('/broadcast_message', (req, res) => {
  const { chatroom_id, sender_id, sender_name, msg, created_at } = req.body;

  io.to(chatroom_id).emit('receive_message', {
    chatroom_id,
    sender_id,
    sender_name,
    msg,
    created_at // ✅ directly from Laravel
  });

  return res.json({ success: true });
});

server.listen(3001, () => {
  console.log('Socket.IO server running on http://localhost:3001');
});
