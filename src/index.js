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

  return (
   <div >
   <h1 > MINDNIGHT < /h1>
   < ChatApp socket={socket} / >
   < PlayerApp socket={socket} / >
   < ChooseApp socket={socket} / >
   </div >)
 }


ReactDOM.render( < App / > ,
 document.getElementById("root"))
