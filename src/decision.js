import React from "react";
import {useState} from "react";
import {useEffect} from "react";


export default function ChooseApp(props) {

const [isHacker, setHacker] = useState(false)
const [choosing, setChoosing] = useState(true)
const [started, setStarted] = useState(false)
const [ready, setReady] = useState(false)

useEffect(() => {
 props.socket.on("gameStart", (data) => {
  setStarted(true)
  setHacker(data["roles"][props.socket.id])
 })
})

let hackcss = {opacity:0.2}
let agentcss = {opacity:0.2}

if (choosing) {
 agentcss = {opacity: 1}
 if (isHacker) {
  hackcss = {opacity: 1}
 }
}

const hacker = <div id="hack" style={hackcss}><p><font size='20'><strong>
HACKEAR</strong></font></p></div>

const agent = <div id="secure" style={agentcss}><p><font size='20'><strong>
ASEGURAR</strong></font></p></div>

if (started) {
return (
<div id="chooseDiv">
{hacker}
{agent}
</div>
)
}

const text = (ready)? "Preparado":"No preparado"

const readyColor = (ready)? "Orange":"LightSalmon"

return (
 <div id="readyDiv" style={
{
 backgroundColor: readyColor,
}
} onClick={()=>{
props.socket.emit("sendReady", {bool:!ready})
setReady(!ready)
}}
><strong><font size='20'>{text}</font></strong></div>
)
}
