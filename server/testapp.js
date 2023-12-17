const http = require('http');
const socketIo = require('socket.io');
const cors= require('cors')
const express = require('express')

const app = express();

app.use(cors({
    origin: '*'
}));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
});

const idList = {}

io.on('connection', (socket) => {
    socket.on("newUser", (data) => {
        idList[socket.id] = data["user"]
        console.log(idList)

        io.emit("newUserResponse",
{usernames:Object.values(idList),ids:Object.keys(idList)})
    });

    socket.on('sendMessage', (message) => {
        io.emit('message', 
{text:message["text"], author:idList[socket.id]}); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
      delete idList[socket.id]

      io.emit("newUserResponse",
{usernames:Object.values(idList),ids:Object.keys(idList)})
    });
  });

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
