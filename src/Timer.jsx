/*
	play, 

	refactor play

	pause

	fix, play then stop
		

	increment buttons -> above and below
*/


import React, {useState, useEffect, useReducer} from 'react';

function Timer() {  
	let initialTimeState = {hours: '00', minutes: '00', seconds: '00'};
	const [timeState, dispatch] = useReducer(timeReducer, initialTimeState);
	let [playMode, setPlayMode] = useState('stop');

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
			case 'play': 
				hours = action.newTime.hours;
				minutes = action.newTime.minutes;
				seconds = action.newTime.seconds;
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

	function decreaseTime(currentTime) {
		let {seconds, minutes, hours} = currentTime; 
		seconds = addLeadingZero(seconds, -1); 

		// if seconds === 0 
		if(seconds === '00') {
			minutes = addLeadingZero(minutes, -1); 
		}
		
		// if minutes === 0
		if(minutes === '00') {
			hours = addLeadingZero(hours, -1);
		}
		
		// if hours === 0
		if(hours === '00' && minutes === '00' && seconds === '00') {
			console.log('STOP');
			setPlayMode('stop');
		}

		return {hours, minutes, seconds};
	}

	function loopTimer(currentTime) {
		console.log('loopTimer', currentTime);
		if(playMode === 'play') { 
			let newTime = decreaseTime(currentTime); 
			dispatch({target: 'play', newTime});
			setTimeout(() => loopTimer(newTime), 1000);
		}
	}

	useEffect(() => {
		if(playMode === 'play') {
			loopTimer(timeState);
		}
	}, [playMode])

	function stop() { 
		dispatch({target: 'stop'});
	}

	function play() {
		console.log('click play');
		setPlayMode('play'); 
	}

	return ( 
		<>
			<div id="inputContainer">
				<input id="hourInput" type="number" min="0" max="99" value={timeState.hours} onKeyDown={handleKeyDown}/>
				<input id="minuteInput" type="number" min="0" max="60" value={timeState.minutes} onKeyDown={handleKeyDown}/>
				<input id="secondInput" type="number" min="0" max="60" value={timeState.seconds} onKeyDown={handleKeyDown}/>
			</div>
			<div id="buttonContainer">
				<button type="button" onClick={play}>Play</button>
				<button type="button">Pause</button>
				<button type="button" onClick={stop}>Stop</button>
			</div>
		</>
	)
}

export default Timer;