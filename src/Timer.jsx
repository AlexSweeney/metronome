/*
	input numbers
		focus press up or down 
			change to reducer 

		focus type
		
		play, stop, pause
			seconds
			minutes
			hours

		increment buttons -> above and below
*/


import React, {useState, useEffect, useReducer} from 'react';

function Timer() { 
	/*let [hours, setHours] = useState('00');
	let [minutes, setMinutes] = useState('00');
	let [seconds, setSeconds] = useState('00');*/
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
				hours = (addLeadingZero(hours, action.number));
			 	break;
			case 'minuteInput': 
				minutes = (addLeadingZero(minutes, action.number));
				break;
			case 'secondInput':
				seconds = (addLeadingZero(seconds, action.number)); 
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

	function handleKeyDown(e) { 
		let number = getNumberFromKey(e.key);
		dispatch({number, target: e.target.id}); 
	}  

	return ( 
		<>
			 <input id="hourInput" type="number" min="0" max="99" value={timeState.hours} onKeyDown={handleKeyDown}/>
			<input id="minuteInput" type="number" min="0" max="60" value={timeState.minutes} onKeyDown={handleKeyDown}/>
			<input id="secondInput" type="number" min="0" max="60" value={timeState.seconds} onKeyDown={handleKeyDown}/>
		</>
	)
}

export default Timer;