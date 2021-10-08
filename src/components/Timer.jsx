import React, {useState, useEffect} from 'react'; 
import TimerInput from './TimerInput.jsx';
import './../styles/Timer.css';

function Timer() {  
	const [playMode, setPlayMode] = useState('stop');
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	
	function onClickPlay() {
		setPlayMode('play')
	}

	function onClickPause() {
		setPlayMode('pause')
	}

	function onClickStop() { 
		setPlayMode('stop')
		resetTime()
	}

	function decrementTime(seconds, minutes, hours) {
		if (seconds > 0) decrementSeconds(seconds)
		else if(seconds === 0 && minutes > 0) decrementMinutes(minutes)
		else if(seconds === 0 && minutes === 0 && hours > 0) decrementHours(hours)
		else if(seconds === 0 && minutes === 0 && hours === 0) finishTime()
	}

	function decrementSeconds(seconds) { 
		setSeconds(seconds - 1)
	}

	function decrementMinutes(minutes) {
		setMinutes(minutes - 1)
		setSeconds(59)
	}

	function decrementHours(hours) {
		setHours(hours - 1) 
		setMinutes(59)
		setSeconds(59)
	}

	function finishTime() { 
		resetTime()
	}

	function resetTime() { 
		setHours(0)
		setMinutes(0)
		setSeconds(0)
	}

	useEffect(() => { 
		if(playMode === 'play')
		if(playMode === 'pause') 
		if(playMode === 'stop') resetTime() 
	}, [playMode]) 

	useEffect(() => {
		let timeout;

		if(playMode === 'play') {
			timeout = setTimeout(() => {
				console.log('timeout', seconds)
				decrementTime(seconds, minutes, hours)
			}, 1000)
		}

		return () => { clearTimeout(timeout) }
	}, [playMode, seconds, minutes, hours])

	return ( 
		<div className="timer-container">
			<div className="timer-inputs-container">
				<TimerInput value={hours} setValue={setHours} min={0} max={99}>Hours</TimerInput>
				<TimerInput value={minutes} setValue={setMinutes} min={0} max={59}>Minutes</TimerInput>
				<TimerInput value={seconds} setValue={setSeconds} min={0} max={59}>Seconds</TimerInput>
			</div>
			<div className="timer-button-container">
				<button type="button" onClick={onClickPlay}>Play</button>
				<button type="button" onClick={onClickPause}>Pause</button>
				<button type="button" onClick={onClickStop}>Stop</button>
			</div>
		</div>
	)
}

export default Timer;