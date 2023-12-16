import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function PlayerApp(props) {

const [daname, setName] = useState("Esperando...")
const [nSelected, select] = useState(false)
const [users, setUsers] =
useState(Array.apply(null, Array(10)).map(_ => 'Esperando...'))

useEffect(() => {
 props.socket.on("newUserResponse", (data) => {
   setUsers(data["usernames"])
 })
})

const colors = ["red",
  "darkOrchid",
  "green", "blue", "orange",
  "pink", "gold", "peru",
  "skyblue", "palegreen"
 ]

const sendUser = () => {
 select(true)
 props.socket.emit("newUser", {user: daname})
}

 var arr = []

 for (let i = 0; i < users.length; i +=
  1) {

 const userIndex = (i < props.maplace - 1)? i:i+1

 let elem = <
   div id = "player" class="p{i}"
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } > < p > <
   strong > {users[userIndex]} <
   /strong> < /p > < /
   div >
  if (i == props.maplace - 1) {

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
