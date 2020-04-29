import React, {useState, useEffect, useReducer} from 'react';
import Util from './Util.jsx';
import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';
import './styles/timerStyle.css';

function Timer({timeState, dispatch, timeReducer, timerPlayMode, setTimerPlayMode}) {  
	let {addLeadingZero} = Util;

	// Set time 
		const inputButtonProps = {state: timeState, dispatch, settings: { displayLeadingZero: true, max: 60}};

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
				// play end sound
				document.getElementById('bellTingAudio').play();
				setTimerPlayMode('stop');
			}

			return {hours, minutes, seconds};
		}
 
	// Play Pause Stop
		useEffect(() => {
			if(timerPlayMode === 'play') {
				const timer = setInterval(() => {
					let newTime = decreaseTime(timeState); 
					dispatch({target: 'play', newTime});
				}, 1000);

				return () => clearInterval(timer);
			}
		}, [timerPlayMode, timeState])

		function stop() { 
			setTimerPlayMode('stop');
			dispatch({target: 'stop'});
		}

		function play() { 
			setTimerPlayMode('play'); 
		}

		function pause() {
			if(timerPlayMode === 'pause') {
				setTimerPlayMode('play');
			} else {
				setTimerPlayMode('pause');
			} 
		} 

	return ( 
		<div className="timerContainer">
			<div className="timerInputContainer">
				<InputWithIncrementButtons className="timerInput" property="hours" {...inputButtonProps}/>
				<InputWithIncrementButtons className="timerInput" property="minutes" {...inputButtonProps}/>
				<InputWithIncrementButtons className="timerInput" property="seconds" {...inputButtonProps}/> 
			</div>
			<div className="timerButtonContainer">
				<button type="button" onClick={play}>Play</button>
				<button type="button" onClick={pause}>Pause</button>
				<button type="button" onClick={stop}>Stop</button>
			</div>
		</div>
	)
}

export default Timer;