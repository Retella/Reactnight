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
const readyList = {}
const rolesObj = {}

let votes = {}
let chooses = 0
let isHacked = false
const nodes = []

let selectIdx = 0
const selectedList = []

function logger() {
 console.log(`${"-".repeat(50)}`)
 console.log(`Players: ${JSON.stringify(idList)}`)
 console.log(`ReadyList: ${JSON.stringify(readyList)}`)
 console.log(`HackerList: ${JSON.stringify(rolesObj)}`)
 console.log(`SelectedList: ${selectedList}`)
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

io.on('connection', (socket) => {
    socket.on("newUser", (data) => {
        idList[socket.id] = data["user"]
        readyList[socket.id] = false
        logger()

        io.emit("newUserResponse",
{usernames:Object.values(idList),ids:Object.keys(idList)})
    });

    socket.on('sendMessage', (message) => {
        io.emit('message',
{text:message["text"], author:idList[socket.id], index:Object.keys(idList).indexOf(socket.id)});
    });

    socket.on("sendReady", (data) => {
     readyList[socket.id] = data["bool"]

     for (let i in Object.values(readyList)) {
      if (!Object.values(readyList)[i] || Object.keys(readyList).length < 3) {
       return
      }
     }

     for (const i in Object.keys(idList)) {
      rolesObj[Object.keys(idList)[i]] = false
     }

     const hackerNum = Math.round(Object.keys(rolesObj).length/2 - 1)
     let hackIt = 0
     while (hackIt < hackerNum) {
      const daIdx = getRndInteger(0, Object.keys(rolesObj).length)
      if (!rolesObj[Object.keys(idList)[daIdx]]) {
       rolesObj[Object.keys(idList)[daIdx]] = true
       hackIt += 1
      }
     }

     logger()

     io.emit("gameStart", {roles:rolesObj})

     io.emit("selectTime", {idx:selectIdx})
    })

    socket.on("sendSelected", (data) =>{
     const cNum = data["classNum"][1]

     if (!selectedList.includes(cNum)) {
      selectedList.push(cNum)
     }
     else {
      selectedList.splice(selectedList.indexOf(cNum), 1)
     }

     io.emit("selectedResponse", {idxs:selectedList})
    })

    socket.on("sendChosenPlayers", () => {
      votes = {}
      io.emit("askVoting", null)
    })

    socket.on("sendDecisionVote", (data) => {
      votes[socket.id] = data["dec"]

      if (Object.keys(votes).length == Object.keys(rolesObj).length) {
       const voters = [0, 0]
       for (const i of Object.values(votes)) {
        if (i) {voters[1] += 1}
        else {voters[0] += 1}
       }
       if (voters[1] > voters[0]) {
        chooses = 0
        isHacked = false
        io.emit("askChoosing", {idxs:selectedList})
       }
       else {
        if (selectIdx >= Object.keys(idList).length) {
         selectIdx = 0
        }
        else {
         selectIdx += 1
        }
        io.emit("selectTime", {idx:selectIdx})
       }
      }
     })

     socket.on("sendDecisionChoose", (data) => {
       chooses += 1
       if (!data["dec"]) {
        isHacked = true
       }
       if (chooses == selectedList.length) {
        nodes.push([Object.values(idList)[selectIdx],
 selectedList, isHacked])
        io.emit("responseNodes", {noders:nodes})

        if (selectIdx >= Object.keys(idList).length) {
         selectIdx = 0
        }
        else {
         selectIdx += 1
        }
        io.emit("selectTime", {idx:selectIdx})
       }
     })

    socket.on('disconnect', () => {
      console.log('user disconnected');
      delete readyList[socket.id]
      delete idList[socket.id]
      delete rolesObj[socket.id]

      io.emit("newUserResponse",
{usernames:Object.values(idList),ids:Object.keys(idList)})
    });
  });

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
