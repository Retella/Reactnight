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
let nodes = []

let selectIdx = 0
let selectedList = []
let selectNum = -1

function logger() {
 console.log(`${"-".repeat(50)}`)
 console.log(`Players: ${JSON.stringify(idList)}`)
 console.log(`ReadyList: ${JSON.stringify(readyList)}`)
 console.log(`HackerList: ${JSON.stringify(rolesObj)}`)
 console.log(`SelectedList: ${selectedList}`)
 console.log(`Nodes: ${nodes}`)
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

     io.emit("gameStart", {roles:rolesObj, names:idList})

     io.emit("selectTime", {idx:selectIdx})
    })

    socket.on("sendSelected", (data) =>{
     const cNum = data["classNum"][1]

     if (Object.keys(rolesObj).length == 3) {
      selectNum = 2
     }
     else if (nodes.length % 2 == 0) {
      selectNum = Math.floor(Object.keys(rolesObj).length/2)
     }
     else {
      selectNum = Math.floor(Object.keys(rolesObj).length/2 + 1)
     }

     if (!selectedList.includes(cNum)) {
      selectedList.push(cNum)
     }
     else {
      selectedList.splice(selectedList.indexOf(cNum), 1)
     }

     if (selectedList.length > selectNum) {
      selectedList.splice(0, 1)
     }

     io.emit("selectedResponse", {idxs:selectedList})
     logger()
    })

    socket.on("sendChosenPlayers", () => {
      if (selectedList.length == selectNum) {
       votes = {}
       io.emit("askVoting", null)
      }
    })

    socket.on("sendDecisionVote", (data) => {
      votes[socket.id] = data["dec"]

      if (Object.keys(votes).length == Object.keys(rolesObj).length) {
       const voters = [0, 0]

       const allies = []
       const opposed = []
       for (const [guy, vote] of Object.entries(votes)) {
        if (vote) {
         voters[1] += 1
         allies.push(idList[guy])
        }
        else {
         voters[0] += 1
         opposed.push(idList[guy])
        }
       }
       if (voters[1] > voters[0]) {
        io.emit("message", {
text:`Se ha aprobado la votación ||| Aprobado por: ${allies} ||| Denegado por: ${opposed}`,
author: "Sistema",
id: "-1"
})
        chooses = 0
        isHacked = false
        io.emit("askChoosing", null)
       }
       else {
        io.emit("message", {
text:`Se ha denegado la votación ||| Aprobado por: ${allies} ||| Denegado por: ${opposed}`,
author:"Sistema",
id:-1
})
        if (selectIdx == Object.keys(idList).length - 1) {
         selectIdx = 0
        }
        else {
         selectIdx += 1
        }
        selectedList = []
        io.emit("selectedResponse", {idxs:selectedList})
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
        const names =
selectedList.map((a) => Object.values(idList)[a])
        nodes.push([Object.values(idList)[selectIdx],
 names, isHacked])
        io.emit("responseNodes", {noders:nodes})

        const points = [0, 0]
        for (const i of nodes) {
         if (i[2]) {points[0] += 1}
         if (!i[2]) {points[1] += 1}
        }
        if (points[0] == 3) {
         io.emit("matchWon", {dec:false})
         return
        }
        if (points[1] == 3) {
         io.emit("matchWon", {dec:true})
         return
        }

        if (selectIdx == Object.keys(idList).length - 1) {
         selectIdx = 0
        }
        else {
         selectIdx += 1
        }
        selectedList = []
        io.emit("selectedResponse", {idxs:selectedList})
        io.emit("selectTime", {idx:selectIdx})
       }
       logger()
     })

    socket.on('disconnect', () => {
      console.log('user disconnected');
      delete readyList[socket.id]
      delete idList[socket.id]
      delete rolesObj[socket.id]

      io.emit("newUserResponse",
{usernames:Object.values(idList),ids:Object.keys(idList)})

      if (Object.keys(idList).length <= 1) {
       nodes = []
       selectIdx = 0
       selectNum = -1
      }
});
  });

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
