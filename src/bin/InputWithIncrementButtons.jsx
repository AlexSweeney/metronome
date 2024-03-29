import React, {useState, useEffect} from 'react';
import Util from './Util.jsx'; 

function InputWithIncrementButtons({property, state, dispatch, settings}) {   
	let max = (settings.hasOwnProperty('max') && settings.max || '99');
	let min = (settings.hasOwnProperty('min') && settings.min || '0');

	let {addLeadingZero} = Util;   
	let [buttonIsHeld, setButtonIsHeld] = useState(false);
	let [buttonIsDown, setButtonIsDown] = useState(false);
	let [increment, setIncrement] = useState(null);

	let [isNewFocus, setIsNewFocus] = useState(false);

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
 
			// If number
			if(increment === 0 && typeof(Number(e.key)) === 'number') {  
				if(isNewFocus) { 
					newValue = e.key;
				} else {   
					if(newValue.length >= 3) { 
						newValue = Number(newValue.substring(1,3)); 
						newValue = Number(String(newValue) + String(e.key)); 
					} else { 
						newValue += Number(e.key); 
					} 
				} 
			// If up arrow or down arrow
			} else { 
				if(settings.displayLeadingZero) {
					newValue = addLeadingZero(newValue, increment); 
				} else {
					newValue = Number(newValue) + increment;
				}
			}

			setIsNewFocus(false);    
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
					onMouseDown={() => handleMouseDown(-1)}
					onMouseUp={handleMouseUp}
					onMouseOut={handleMouseUp} 
					className={property+"Input"}
					id={property+"DecreaseButton"}
			> - </button>
			<input id={property+"input"}
				type="number" 
				min={min}
				max={max} 
				value={state[property]} 
				onKeyDown={handleKeyDown}
				onFocus={() => setIsNewFocus(true)} 
				onBlur={() => setIsNewFocus(false)}
				className={property+"Display"}
			/>
			<button type="button" 
					onMouseDown={() => handleMouseDown(1)}
					onMouseUp={handleMouseUp} 
					onMouseOut={handleMouseUp}  
					className={property+"Input"}
					id={property+"IncreaseButton"}
			> + </button>
		</div>
	)
} 

export default InputWithIncrementButtons;