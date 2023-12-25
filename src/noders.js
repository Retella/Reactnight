import React from "react";
import {useState} from "react";
import {useEffect} from "react";

export default function NodesApp(props) {

const [nodes, setNodes] = useState([])

useEffect(() => {
 props.socket.on("responseNodes", (data) => {
   setNodes(data["noders"])
 })
})

const arr = []

for (const i of nodes) {
 const secondElem =
i[1].map((a) => <a>{a}{(i[1].indexOf(a) != i[1].length-1) && ", "}</a>)
 const elem =
<div id="nodeDiv" style={{backgroundColor:(i[2])? "red":"green"}}>
<p><strong>{i[0]}</strong></p>
<div>{secondElem}</div>
</div>
 arr.push(elem)
}

for (let i = arr.length;i < 5; i += 1) {
 const elem = <div id="blankNode">Nodo {i+1}</div>
 arr.push(elem)
}

return (<div id="nodePlace">{arr}</div>)
}
