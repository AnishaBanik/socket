const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.emit('message', 'Welcome to the the chat!')
  socket.broadcast.emit('message', 'A user has joined the chat')

  socket.on('sendMessage', (message, callback) => {
    io.emit('message', message)
    callback()
  })


  socket.on('disconnect', () => {
    io.emit('message', 'User has left the chat')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})