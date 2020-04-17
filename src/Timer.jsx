/*	
	fix - click button and it acts as if hold
	play
*/

import React, {useState, useEffect, useReducer} from 'react';

function Timer() {  
	let initialTimeState = {hours: '00', minutes: '00', seconds: '00'};
	const [timeState, dispatch] = useReducer(timeReducer, initialTimeState);

	let [playMode, setPlayMode] = useState('stop');

	const inputButtonProps = {addLeadingZero, timeState, dispatch};

	// Util
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

	// Set time
		function timeReducer(timeState, action) { 
			let {hours, minutes, seconds} = timeState; 

			switch(action.target) {
				case 'hours': 
					hours = action.newValue;
				 	break;
				case 'minutes': 
					minutes = action.newValue;
					break;
				case 'seconds':
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

	// Run timer
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
				setPlayMode('stop');
			}

			return {hours, minutes, seconds};
		}
 
	// Play Pause Stop
		useEffect(() => {
			if(playMode === 'play') {
				const timer = setInterval(() => {
					let newTime = decreaseTime(timeState); 
					dispatch({target: 'play', newTime});
				}, 1000);

				return () => clearInterval(timer);
			}
		}, [playMode, timeState])

		function stop() { 
			setPlayMode('stop');
			dispatch({target: 'stop'});
		}

		function play() { 
			setPlayMode('play'); 
		}

		function pause() {
			if(playMode === 'pause') {
				setPlayMode('play');
			} else {
				setPlayMode('pause');
			} 
		} 

	return ( 
		<>
			<div id="inputContainer">
				<TimerInputButton type="hours" {...inputButtonProps}/>
				<TimerInputButton type="minutes" {...inputButtonProps}/>
				<TimerInputButton type="seconds" {...inputButtonProps}/> 
			</div>
			<div id="buttonContainer">
				<button type="button" onClick={play}>Play</button>
				<button type="button" onClick={pause}>Pause</button>
				<button type="button" onClick={stop}>Stop</button>
			</div>
		</>
	)
}

function TimerInputButton({type, addLeadingZero, timeState, dispatch}) {
	let [hold, setHold] = useState(false);
	let buttonIsDown = false;
	let [increment, setIncrement] = useState(null);

	// Util
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

	// Key down
		function handleKeyDown(e) {     
			let increment = getNumberFromKey(e.key);
			let newValue = e.target.value;   
			
			if(increment === 0) {  
				if(String(newValue).length > 1) {
					newValue = removeFirstDigit(newValue); 
					newValue += Number(e.key);
				}  
			} else {
				newValue = addLeadingZero(newValue, increment); 
			}
			   
			dispatch({target: type, newValue}); 
		}  
 
	// button click 
		function handleMouseDown(increment) {
			// increment timeState
			clickTimeIncrement(increment); 

			// !! fix set hold timer
			buttonIsDown = true;
			console.log('buttonIsDown', buttonIsDown);

			setTimeout(() => {
				console.log('timeout', buttonIsDown);
				if(buttonIsDown) {
					setIncrement(increment);
					setHold(true);  
				}
				 
			}, 1000); 
		}

		function handleMouseUp() { 
			setIncrement(null);
			buttonIsDown = false;
			setHold(false);
		}

		function clickTimeIncrement(increment) {  
			let newValue = addLeadingZero(timeState[type], increment);   
			dispatch({target: type, newValue});  
		}

	// button hold
		useEffect(() => { 
			if(hold) { 
				let holdInterval = setInterval(() => {
					clickTimeIncrement(increment);
				}, 100);

				return () => clearInterval(holdInterval);
			}
		}, [hold, timeState, increment]); 

	return (
		<div className="timerInputButtonContainer"> 
			<button type="button" 
					onMouseDown={() => handleMouseDown(1)}
					onMouseUp={handleMouseUp} 
					onMouseOut={handleMouseUp}
			> + </button>
			<input id="hourInput" 
				type="number" 
				min="0" 
				max="99" 
				value={timeState[type]} 
				onKeyDown={handleKeyDown}/>
			<button type="button"  
					onMouseDown={() => handleMouseDown(-1)} 
					onMouseUp={handleMouseUp}
					onMouseOut={handleMouseUp}
			> - </button>
		</div>
	)
}

export default Timer;