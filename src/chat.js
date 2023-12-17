import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function ChatApp(props) {

 const [messages, changeMsg] =
 useState([["Hi","guy1"],["Yo","guy2"]]);
const [damsg, setdamsg] = useState("")

useEffect(() => {
 props.socket.on("message", (data) => {
  changeMsg((a) => [...a, [data["text"], data["author"]]]);
 })
}, [messages])

const sendMsg = () => {
if (damsg != "") {
props.socket.emit("sendMessage", {text: damsg})
setdamsg("")
 }
}

 const msgArr = messages.map((
 m) => 
  <
  div id = "msg" > < p id =
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
