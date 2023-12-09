import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import PlayerApp from "./components";

import ChatApp from "./chat";

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
