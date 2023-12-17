import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function PlayerApp(props) {

const [daname, setName] = useState("Esperando...")
const [nSelected, select] = useState(false)
const [users, setUsers] = useState([])
const [queque, setQueque] = useState(0)

useEffect(() => {
 props.socket.emit("newUser", {user:"Esperando..."})
}, [])

useEffect(() => {
 props.socket.on("newUserResponse", (data) => {
   setUsers(data["usernames"])
   setQueque(data["ids"].indexOf(props.socket.id))
 })
})

const colors = ["red",
  "darkOrchid",
  "green", "blue", "orange",
  "HotPink", "gold", "peru",
  "skyblue", "palegreen"
 ]

const sendUser = () => {
 select(true)
 props.socket.emit("newUser", {user: daname})
}

 var arr = []

 for (let i = 0; i < users.length; i +=
  1) {

 let elem = <
   div id = "player" class="p{i}"
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } > < p > <
   strong > {users[i]} <
   /strong> < /p > < /
   div >
  if (i == queque) {

 let unMenu = <div><input placeholder="Introduce tu nombre"
onChange={(e) => setName(e.target.value)}/><button
onClick={sendUser}>Seleccionar</button></div>
 if (nSelected) {
 unMenu = <div style={{display:"none"}}></div>
}
 elem = <
   div id = "player" class="p{i}"
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } > {unMenu} < p > <
   strong > {daname} <
   /strong> < /p > < /
   div >
}
  arr.push(elem);
 }
 return ( < div id =
  "playerPlace" > {
   arr
  } < /div >
 )
}
