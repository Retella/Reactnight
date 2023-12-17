import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import {useEffect} from "react";
import "./index.css";

import PlayerApp from "./components";

import ChatApp from "./chat";

import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://serverreactnight.onrender.com/');

export default function App() {

  return (<div >
   <
   h1 > MINDNIGHT < /h1>  <
  PlayerApp socket={socket}/ >
   <
   ChatApp socket={socket}/ >
   <
   /
  div >)
 }


ReactDOM.render( < App / > ,
 document.getElementById("root"))
