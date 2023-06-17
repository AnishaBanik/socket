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

const generateMessage = (text) => {
  return{
    text,
    sentAt: new Date().getTime()
  }
}

io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  socket.emit('message', generateMessage('Welcome to the the chat!'))
  socket.broadcast.emit('message', generateMessage('A user has joined the chat'))

  socket.on('sendMessage', (message, callback) => {
    io.emit('message', generateMessage(message))
    callback()
  })


  socket.on('disconnect', () => {
    io.emit('message', generateMessage('User has left the chat'))
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
})