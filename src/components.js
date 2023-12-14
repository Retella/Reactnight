import React from "react";
import {
 useState
} from "react";

export default function PlayerApp(props) {
 

const [daname, setName] = useState("Esperando...")

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
 elem = <
   div id = "player" class="p{i}"
   style = {
    {
     backgroundColor: colors[i],
     width: 100/props.pNum + "%"
    }
   } > <input  placeholder="Introduce tu nombre" 
onChange={(e) => setName(e.target.value)}/>< p > <
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
