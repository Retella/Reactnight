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
const placeList = []

io.on('connection', (socket) => {
    placeList.push(socket.id) 
    socket.emit("newGuy", {place: placeList.indexOf(socket.id) + 1})
    console.log(placeList)

    socket.on("newUser", (data) => {
        idList[socket.id] = data["user"]
        console.log(idList)

        io.emit("newUserResponse",
{usernames:Object.values(idList)})
    });

    socket.on('sendMessage', (message) => {
        io.emit('message', message); // Broadcast the message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
      delete idList[socket.id]
      placeList.splice(placeList.indexOf(socket.id, 1))

      io.emit("newUserResponse",
{usernames:Object.values(idList)})
    });
  });

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
