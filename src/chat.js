import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function ChatApp() {

 const [messages, changeMsg] =
 useState([["Hi","guy1"],["Yo","guy2"]]);

 const [username, setName] =
 useState("guester");

 const addMsg = () => {
  const elem = document.getElementById("textBox");
  if (elem.value) {
  changeMsg((a) => [...a, [elem.value, username]]);
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
 input id = "textBox" /
  >
  <
  button onClick={addMsg} > Send < /button> < /
 div >
}
