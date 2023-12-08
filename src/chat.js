import React from "react";
import {
 useState
} from "react";

export default function ChatApp() {

 const demoMsg = [
  ["Hi", "Obama"],
  ["Bonjorno", "Francis"]
 ]

 const [messages, changeMsg] =
 useState(demoMsg);
 const [username, setName] =
 useState("");

 const addMsg = () => {
  changeMsg(messages + [document
   .getElementById("textBox"),
   username
  ]);
 }

setName("guester")

 const msgArr = messages.map((
   m) =>
  <
  div id = "msg" > < p id =
  "msgText" > {
   m[0]
  } <
  /p> <p id="msgName"><strong>{m[1]}</strong >
  <
  /p>< /div > );

 return <div id = "chat" > <
  div id = "messages" > {
   msgArr
  } < /div > <
 input id = "textBox" /
  >
  <
  button onClick = {
   addMsg
  } > Send < /button> < /
 div >
}
