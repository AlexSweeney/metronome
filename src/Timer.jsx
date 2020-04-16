/*
	stop

	play, pause
		seconds
		minutes
		hours

	increment buttons -> above and below
*/


import React, {useState, useEffect, useReducer} from 'react';

function Timer() {  
	let initialTimeState = {hours: '00', minutes: '00', seconds: '00'};
	const [timeState, dispatch] = useReducer(timeReducer, initialTimeState);

	function addLeadingZero(number, addition) { 
		number = Number(number) + addition; 
		
		if(number < 0) {
			return '00';
		} else if(number < 10) {
			return '0' + number;
		} else {
			return number;
		} 
	}

	function timeReducer(timeState, action) { 
		let {hours, minutes, seconds} = timeState; 

		switch(action.target) {
			case 'hourInput': 
				hours = action.newValue;
			 	break;
			case 'minuteInput': 
				minutes = action.newValue;
				break;
			case 'secondInput':
				seconds = action.newValue; 
				break;
			case 'stop':
				seconds = '00';
				minutes = '00';
				hours = '00';
				break;
		} 

		return {hours, minutes, seconds}; 
	}

	function getNumberFromKey(key) {
		if(key === 'ArrowUp') {
			return 1;
		} else if (key === 'ArrowDown') {
			return -1;
		} else {
			return 0;
		}
	}

	function removeFirstDigit(number) {
		return String(number).substring(1,); 
	}

	function handleKeyDown(e) {   
		console.log(e)
		let increment = getNumberFromKey(e.key);
		let newValue = e.target.value; 

		if(increment === 0) {  
			if(String(newValue).length > 1) {
				newValue = removeFirstDigit(newValue); 
				newValue += Number(e.key);
			}  
		} else {
			newValue = addLeadingZero(e.target.value, increment); 
		}

		
		dispatch({target: e.target.id, newValue}); 
	}  

	function stop() { 
		dispatch({target: 'stop'});
	}

	return ( 
		<>
			<div id="inputContainer">
				<input id="hourInput" type="number" min="0" max="99" value={timeState.hours} onKeyDown={handleKeyDown}/>
				<input id="minuteInput" type="number" min="0" max="60" value={timeState.minutes} onKeyDown={handleKeyDown}/>
				<input id="secondInput" type="number" min="0" max="60" value={timeState.seconds} onKeyDown={handleKeyDown}/>
			</div>
			<div id="buttonContainer">
				<button type="button">Play</button>
				<button type="button">Pause</button>
				<button type="button" onClick={stop}>Stop</button>
			</div>
		</>
	)
}

export default Timer;