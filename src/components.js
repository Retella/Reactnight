import React from "react";
import {
 useState
} from "react";

export default function PlayerApp(props) {
 

const [daname, setName] = useState("Esperando...")
const [nSelected, select] = useState(false)

const colors = ["red",
  "darkOrchid",
  "green", "blue", "orange",
  "pink", "gold", "peru",
  "skyblue", "palegreen"
 ]

 var arr = []

 for (let i = 0; i < props.pNum; i +=
  1) {
 let elem = <
   div id = "player" class="p{i}"
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } > < p > <
   strong > Esperando... <
   /strong> < /p > < /
   div >
  if (i == props.maplace - 1) {

 let unMenu = <div><input placeholder="Introduce tu nombre"
onChange={(e) => setName(e.target.value)}/><button
onClick={() => select(true)}>Seleccionar</button></div>
 if (nSelected) {
 unMenu = <div style={{display:"none"}}></div>
}
 elem = <
   div id = "player" class="p{i}"
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } > {unMenu} < p > <
   strong > {daname} <
   /strong> < /p > < /
   div >
}
  arr.push(elem);
 }
 return ( < div id =
  "playerPlace" > {
   arr
  } < /div >
 )
}
