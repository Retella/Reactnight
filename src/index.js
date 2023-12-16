import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import {useEffect} from "react";
import "./index.css";

import PlayerApp from "./components";

import ChatApp from "./chat";

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5001');

export default function App() {

 const [daplace, setPlace] = useState(0)

 useEffect(() => {
  socket.on("newGuy", (data) => {
   setPlace(data["place"])
 })
})

  return (<div >
   <
   h1 > MINDNIGHT < /h1>  <
  PlayerApp maplace={daplace} socket={socket}/ >
   <
   ChatApp socket={socket}/ >
   <
   /
  div >)
 }


ReactDOM.render( < App / > ,
 document.getElementById("root"))
