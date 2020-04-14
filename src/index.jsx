import React from "react";
import ReactDOM from "react-dom";
import Metronome from "./Metronome.jsx";
import Timer from "./Timer.jsx";

var root = document.querySelector("#root");

ReactDOM.render(
	<>
		<Metronome/> 
		<Timer/>
	</>,
	root
);