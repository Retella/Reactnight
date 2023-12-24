import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import {useEffect} from "react";
import "./index.css";

import PlayerApp from "./components";
import ChatApp from "./chat";
import ChooseApp from "./decision";

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5001');

export default function App() {

const [users, setUsers] = useState([])
const [queque, setQueque] = useState(0)
const [selected, setSelected] = useState([])

useEffect(() => {
  socket.on("newUserResponse", (data) => {
   setUsers(data["usernames"])
   setQueque(data["ids"].indexOf(socket.id))
 })
  socket.on("selectedResponse", (data) => {
    setSelected(data["idxs"])
  })
})

  return (
   <div >
   <h1 > MINDNIGHT < /h1>
   < ChatApp socket={socket} / >
   < PlayerApp socket={socket} users={users} queque={queque} selected={selected} / >
   < ChooseApp socket={socket} queque={queque} selected={selected}/ >
   </div >)
 }


ReactDOM.render( < App / > ,
 document.getElementById("root"))
