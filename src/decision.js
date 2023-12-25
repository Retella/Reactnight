import React from "react";
import {useState} from "react";
import {useEffect} from "react";


export default function ChooseApp(props) {

const [isHacker, setHacker] = useState(false)
const [choosing, setChoosing] = useState(false)
const [voting, setVoting] = useState(false)
const [started, setStarted] = useState(false)
const [ready, setReady] = useState(false)
const [won, setWon] = useState(false)
const [winner, setWinner] = useState(false)

useEffect(() => {
 props.socket.on("gameStart", (data) => {
  setStarted(true)
  setHacker(data["roles"][props.socket.id])
 })

 props.socket.on("askVoting", () => {
   setVoting(true)
 })

 props.socket.on("askChoosing", (data) => {
   setChoosing(false)
   for (const i of props.selected) {
    if (i == props.queque) {
     setChoosing(true)
    }
   }
 })

 props.socket.on("matchWon", (data) => {
  setWon(true)
  setWinner(data["dec"])
 })
})

if (won) {
const wText = (winner)? "Agentes ganan":"Hackers ganan"
 return <div id="wonDiv" style={{
backgroundColor: (winner)? "green":"red",
}}><font size="20">{wText}</font></div>
}

let hackcss = {opacity:0.2}
let agentcss = {opacity:0.2}

if (choosing) {
 agentcss = {opacity: 1}
 if (isHacker) {
  hackcss = {opacity: 1}
 }
}

let nText = "HACKEAR"
let yText = "ASEGURAR"

if (voting) {
 nText = "DENEGAR"
 yText = "ACEPTAR"

 agentcss = {opacity: 1}
 hackcss = {opacity: 1}
}

function decide(bool) {
 if (choosing) {
  props.socket.emit("sendDecisionChoose", {dec:bool})
  setChoosing(false)
 }
 if (voting) {
  props.socket.emit("sendDecisionVote", {dec:bool})
  setVoting(false)
 }
}

const hacker = <div id="hack" style={hackcss} onClick={
() => decide(false)}><p><font size='20'><strong>
{nText}</strong></font></p></div>

const agent = <div id="secure" style={agentcss} onClick={
() => decide(true)}><p><font size='20'><strong>
{yText}</strong></font></p></div>

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

let readyOpacity = 1
if (props.users[props.queque] == "Esperando...") {
 readyOpacity = 0.4
}

return (
 <div id="readyDiv" style={
{
 backgroundColor: readyColor,
 opacity: readyOpacity
}
} onClick={()=>{
if (props.users[props.queque] != "Esperando...") {
 props.socket.emit("sendReady", {bool:!ready})
 setReady(!ready)
}
}}
><strong><font size='20'>{text}</font></strong></div>
)
}
