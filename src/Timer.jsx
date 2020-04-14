/*
	input numbers
		focus press up or down 
			make work
			change to reducer
			give leading 0

		focus type
		increment buttons -> above and below



*/


import React, {useState, useEffect} from 'react';

function Timer() {
	let [hours, setHours] = useState('00');
	let [minutes, setMinutes] = useState('00');
	let [seconds, setSeconds] = useState('00');

	function addLeadingZero(number, addition) {
		console.log('addLeadingZero', arguments);
		console.log("Number(number)", Number(number));
		number = Number(number) + addition;
		console.log('number', number);
		
		if(number < 0) {
			return '00';
		}

		if(number < 10) {
			return '0' + number;
		} 
		
		return number;
	}

	function handleKeyDown(e) {
		if(e.key === 'ArrowUp') { 
			if(e.target.id === 'hourInput') {
				setHours(addLeadingZero(hours, 1));
			} else if (e.target.id === 'minuteInput') {
				setMinutes(addLeadingZero(minutes, 1));
			} else if (e.target.id === 'secondInput') {
				setSeconds(addLeadingZero(seconds, 1));
			}
		} else if (e.key === 'ArrowDown') { 
			if(e.target.id === 'hourInput') {
				setHours(addLeadingZero(hours, -1));
			} else if (e.target.id === 'minuteInput') {
				setMinutes(addLeadingZero(minutes, -1));
			} else if (e.target.id === 'secondInput') {
				setSeconds(addLeadingZero(seconds, -1));
			}
		}
	} 
	
	/*useEffect(() => {
		inputs.forEach((input) => {
		document.getElementById(input).addEventListener('keydown', (e) => {
				console.log('input keydown');
				console.log('e', e); 
				console.log('e.target.id', e.target.id);

				if(e.key === 'ArrowUp') { 
					if(e.target.id === 'secondInput') {
						console.log('seconds');
						setSeconds(Number(seconds) + 1);
					}
				} else if (e.key === 'ArrowDown') { 
					if(e.target.id === 'secondInput') {
						console.log('seconds');
						setSeconds(Number(seconds) - 1);
					}
				}
			});
		});
	}, []); */

	return (
		<>
			<input id="hourInput" type="number" min="0" max="99" value={hours} onKeyDown={handleKeyDown}/>
			<input id="minuteInput" type="number" min="0" max="60" value={minutes} onKeyDown={handleKeyDown}/>
			<input id="secondInput" type="number" min="0" max="60" value={seconds} onKeyDown={handleKeyDown}/>
		</>
	)
}

export default Timer;