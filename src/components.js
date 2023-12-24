import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function PlayerApp(props) {

const [daname, setName] = useState("Esperando...")
const [nSelected, select] = useState(false)
const [users, setUsers] = useState([])
const [queque, setQueque] = useState(0)
const [selecting, setSelecting] = useState(-1)
const [selected, setSelected] = useState([])

useEffect(() => {
 props.socket.emit("newUser", {user:"Esperando..."})
}, [])

useEffect(() => {
 props.socket.on("newUserResponse", (data) => {
   setUsers(data["usernames"])
   setQueque(data["ids"].indexOf(props.socket.id))
 })

 props.socket.on("selectTime", (data) => {
   setSelecting(data["idx"])
 })

 props.socket.on("selectedResponse", (data) => {
   setSelected(data["idxs"])
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

const selectUser = (classer) => {
 if (selecting == queque) {
  props.socket.emit("sendSelected",{classNum:classer})
 }
}

const isSelected = (idx) => {
 for (const i of selected) {
  if (i == idx) {
   return true
  }
 }
 return false
}

 var arr = []

 for (let i = 0; i < users.length; i +=
  1) {

 const className = "p" + i

 let yellowSq = <div style={{display:"none"}}></div>

if (i == selecting) {
  yellowSq = <div id="selectingDiv">Seleccionando...</div>
}
 if (isSelected(i)) {
  yellowSq = <div id="selectedDiv">________________</div>
}
 if (i == selecting && isSelected(i)) {
  yellowSq = <div><div id="selectedDiv">.</div>
<div id="selectingDiv">Seleccionando...</div></div>
}

 let elem = <
   div id = "player" class={className}
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } onClick={() => {selectUser(className)}} > {yellowSq} < p > <
   strong > {users[i]} <
   /strong> < /p > < /
   div >
  if (i == queque) {

 let  unMenu = <div><input placeholder="Introduce tu nombre"
onChange={(e) => setName(e.target.value)}/><button
onClick={sendUser}>Seleccionar</button></div>

 if (nSelected) {
 unMenu = <div style={{display:"none"}}></div>
}
 elem = <
   div id = "player" class={className}
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } onClick={() => {selectUser(className)}} > {yellowSq} {unMenu} < p > <
   strong > {daname} <
   /strong> < /p > < /
   div >
}
  arr.push(elem);
 }

 let selectButton = <div style={{display:"none"}}></div>
 if (selecting == queque) {
  selectButton = <button id="sendButton" onClick={() => {
 props.socket.emit("sendChosenPlayers", null)
}}>Seleccionar jugadores</button>
 }

 return (<div><div id ="playerPlace">{arr}</div>{selectButton}</div>)
}
