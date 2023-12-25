import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function ChatApp(props) {

 const [messages, changeMsg] = useState([])
 const [damsg, setdamsg] = useState("")

useEffect(() => {
 props.socket.on("message", (data) => {
  changeMsg((a) => [...a, [data["text"], data["author"],
data["index"]]]);
 })
 return () => props.socket.off("message")
}, [messages])

useEffect(() => {
 props.socket.on("gameStart", (data) => {
  const hList = []
  for (const i of Object.keys(data["roles"])) {
   if (data["roles"][i] && i != props.socket.id) {
    hList.push(data["names"][i])
   }
  }
  if (data["roles"][props.socket.id]) {
   changeMsg((a) => [...a, [`Eres un hacker. Tus compañeros son: ${hList}`, "Sistema", -1]])
  }
  else {
   changeMsg((a) => [...a, ["Eres un agente", "Sistema", -1]])
  }
 })
}, [messages])

const colors = ["LightCoral","Plum","MediumSpringGreen",
"MediumTurquoise","Moccasin","Pink","Khaki","Tan",
"PowderBlue","Aquamarine"]

const sendMsg = () => {
if (damsg != "") {
props.socket.emit("sendMessage", {text: damsg})
setdamsg("")
 }
}

 const msgArr = messages.map((
 m) =>
  <
  div id = "msg" style={
{
backgroundColor: colors[m[2]]
}
} > < p id =
  "msgText" > {
   m[0]
  } <
  /p> <p id="msgName"><strong>{m[1]}</strong >
  </p>< /div > )

 return <div id = "chat" > <
  div id = "messages" > {
   msgArr
  } < /div > <
 input id = "textBox"
onChange={(e) => setdamsg(e.target.value)}
value={damsg}/>
  <
  button onClick={sendMsg} > Enviar < /button> < /
 div >
}
