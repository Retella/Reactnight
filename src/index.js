import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import PlayerApp from "./components";

import ChatApp from "./chat";

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:5001');

class App extends React.Component {

 render() {
  return <div >
   <
   h1 > MINDNIGHT < /h1>  <
  PlayerApp pNum='5' maplace='2' socket={socket}/ >
   <
   ChatApp socket={socket}/ >
   <
   /
  div >
 }
}

ReactDOM.render( < App / > ,
 document.getElementById("root"))
