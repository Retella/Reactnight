import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import {useEffect} from "react";
import "./index.css";

import PlayerApp from "./components";
import ChatApp from "./chat";
import ChooseApp from "./decision";
import NodesApp from "./noders";

import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://serverreactnight.onrender.com');

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
   < NodesApp socket={socket} users={users}/>
   < ChatApp socket={socket} / >
   < PlayerApp socket={socket} users={users} queque={queque} selected={selected} / >
   < ChooseApp socket={socket} users={users} queque={queque} selected={selected}/ >
   </div >)
 }


ReactDOM.render( < App / > ,
 document.getElementById("root"))
