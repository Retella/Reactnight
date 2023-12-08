import React from "react";
import {
 useState
} from "react";

export default function PlayerApp() {

 const [pCount, changeCount] =
 useState(0);

changeCount(1)

 const colors = ["red",
  "darkOrchid",
  "green", "blue", "orange",
  "pink", "gold", "peru",
  "skyblue", "palegreen"
 ]

 var arr = []

 for (let i = 0; i < pCount; i +=
  1) {
  arr.push( <
   div id = "player"
   style = {
    {
     backgroundColor: colors[i]
    }
   } > < p > <
   strong > TEST <
   /strong> < /p > < /
   div > );
 }
 return ( < div id =
  "playerPlace" > {
   arr
  } < /div >
 )
}
