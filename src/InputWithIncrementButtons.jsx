import React, {useState, useEffect} from 'react';
import Util from './Util.jsx';
import './styles/inputWithIncrementButtonsStyle.css';

function InputWithIncrementButtons({property, state, dispatch, displayLeadingZero}) {  
	let {addLeadingZero} = Util; 
	let [buttonIsHeld, setButtonIsHeld] = useState(false);
	let [buttonIsDown, setButtonIsDown] = useState(false);
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
				if(displayLeadingZero) {
					newValue = addLeadingZero(newValue, increment); 
				} else {
					newValue = Number(newValue) + increment;
				}
			}
			
			dispatch({target: property, newValue}); 
		}  
 
	// button click 
		function handleMouseDown(increment) {  
			clickIncrement(increment); 
			setButtonIsDown(true);

			setTimeout(() => {  
				setButtonIsHeld(true);   
				setIncrement(increment);
			}, 1000); 
		}

		function handleMouseUp() {   
			setButtonIsDown(false);
			setButtonIsHeld(false);
			setIncrement(null);
		}

		function clickIncrement(increment) {  
			let newValue = addLeadingZero(state[property], increment);   
			dispatch({target: property, newValue});  
		}

	// button hold
		useEffect(() => {  
			if(buttonIsDown && buttonIsHeld) {  
				let holdInterval = setInterval(() => {
					clickIncrement(increment);
				}, 100);

				return () => clearInterval(holdInterval);
			} else if(!buttonIsDown && buttonIsHeld) {
				setButtonIsHeld(false);
			}
		}, [buttonIsDown, buttonIsHeld, state, increment]); 

	return (
		<div className="timerInputButtonContainer">   
			<button type="button" 
					onMouseDown={() => handleMouseDown(1)}
					onMouseUp={handleMouseUp} 
					onMouseOut={handleMouseUp}
					className={property+"Input"}
			> + </button>
			<input id={property+"input"}
				type="number" 
				min="0" 
				max="99" 
				value={state[property]} 
				onKeyDown={handleKeyDown}
				className={property+"Display"}/>
			<button type="button"  
					onMouseDown={() => handleMouseDown(-1)} 
					onMouseUp={handleMouseUp}
					onMouseOut={handleMouseUp}
					className={property+"Input"}
			> - </button>
		</div>
	)
}

export default InputWithIncrementButtons;