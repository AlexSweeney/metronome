/*
	input numbers 
		focus on box, type number

		highlight numbers, then type (replace)
		
		play, stop, pause
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
		let increment = getNumberFromKey(e.key);
		let newValue = addLeadingZero(e.target.value, increment); 
		dispatch({target: e.target.id, newValue}); 
	}  

	function handleChange(e) {   
		let newValue = e.target.value;

		if(String(newValue).length > 1) {
			newValue = removeFirstDigit(newValue); 
		}  

		dispatch({target: e.target.id, newValue});
	}

	return ( 
		<>
			<input id="hourInput" type="number" min="0" max="99" value={timeState.hours} onKeyDown={handleKeyDown} onChange={handleChange}/>
			<input id="minuteInput" type="number" min="0" max="60" value={timeState.minutes} onKeyDown={handleKeyDown} onChange={handleChange}/>
			<input id="secondInput" type="number" min="0" max="60" value={timeState.seconds} onKeyDown={handleKeyDown} onChange={handleChange}/>
		</>
	)
}

export default Timer;