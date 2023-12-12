import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import PlayerApp from "./components";

import ChatApp from "./chat";

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://serverreactnight.onrender.com');

class App extends React.Component {

 render() {
  return <div >
   <
   h1 > MINDNIGHT < /h1>  <
  PlayerApp / >
   <
   ChatApp / >
   <
   /
  div >
 }
}

ReactDOM.render( < App / > ,
 document.getElementById("root"))
