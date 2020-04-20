import React, {useState, useEffect, useReducer} from 'react';
import Util from './Util.jsx';
import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';

function Timer() {  
	let {addLeadingZero} = Util;
	let initialTimeState = {hours: '00', minutes: '00', seconds: '00'};
	const [timeState, dispatch] = useReducer(timeReducer, initialTimeState);

	let [playMode, setPlayMode] = useState('stop');

	const inputButtonProps = {timeState, dispatch};

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
				// minus one minute
				if(Number(minutes) > 0) seconds = '60';
				minutes = addLeadingZero(minutes, -1); 
			}
			
			// if minutes === 0
			if(minutes === '00') {
				if(Number(hours) > 0) minutes = '60';
				hours = addLeadingZero(hours, -1); 
			} 

			// if all === 0
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
				<InputWithIncrementButtons property="hours" {...inputButtonProps}/>
				<InputWithIncrementButtons property="minutes" {...inputButtonProps}/>
				<InputWithIncrementButtons property="seconds" {...inputButtonProps}/> 
			</div>
			<div id="buttonContainer">
				<button type="button" onClick={play}>Play</button>
				<button type="button" onClick={pause}>Pause</button>
				<button type="button" onClick={stop}>Stop</button>
			</div>
		</>
	)
}



export default Timer;