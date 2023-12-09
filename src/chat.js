import React from "react";
import {
 useState
} from "react";

export default function ChatApp() {

 const [messages, changeMsg] =
 useState([
  ["Yo", "Joe mama"],
  ["Give this man a beer",
   "Joe Biden"
  ]
 ]);

 const [username, setName] =
 useState("");

 const addMsg = () => {
  changeMsg(messages + [document
   .getElementById("textBox"),
   username
  ]);
 }

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
  button > Send < /button> < /
 div >
}
