import React, {useState} from 'react';
import Util from './Util.jsx';

function InputWithIncrementButtons({property, state, dispatch, displayLeadingZero}) {
	let {addLeadingZero} = Util;
	// property = property to increment, state,function
	
	/*let [buttonIsHeld, setButtonIsHeld] = useState(false);
	let [buttonIsDown, setButtonIsDown] = useState(false);
	let [increment, setIncrement] = useState(null);*/

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

			// console.log('handleKeyDown');
			// console.log('increment', increment);
			// console.log('value', newValue);
			
			
			if(increment === 0) {  
				/*if(String(newValue).length > 1) {
					newValue = removeFirstDigit(newValue); 
					newValue += Number(e.key);
				}  */
			} else {
				if(displayLeadingZero) {
					newValue = addLeadingZero(newValue, increment); 
				} else {
					newValue = Number(newValue) + increment;
				}
			}
			  
			console.log('newValue', newValue);
			console.log('dispatch', dispatch);
			console.log('{target: property, newValue}', {target: property, newValue});
			
			dispatch({target: property, newValue}); 
		}  
 
	// button click 
		function handleMouseDown(increment) {  
			/*clickTimeIncrement(increment); 
			setButtonIsDown(true);

			setTimeout(() => {  
				setButtonIsHeld(true);   
				setIncrement(increment);
			}, 1000); */
		}

		function handleMouseUp() {   
			/*setButtonIsDown(false);
			setButtonIsHeld(false);
			setIncrement(null);*/
		}

		function clickTimeIncrement(increment) {  
			// let newValue = addLeadingZero(state[type], increment);   
			// dispatch({target: type, newValue});  
		}

	// button hold
		/*useEffect(() => {  
			if(buttonIsDown && buttonIsHeld) {  
				let holdInterval = setInterval(() => {
					clickTimeIncrement(increment);
				}, 100);

				return () => clearInterval(holdInterval);
			} else if(!buttonIsDown && buttonIsHeld) {
				setButtonIsHeld(false);
			}
		}, [buttonIsDown, buttonIsHeld, state, increment]); */

	return (
		<div className="timerInputButtonContainer">  
			<button type="button" 
					onMouseDown={() => handleMouseDown(1)}
					onMouseUp={handleMouseUp} 
					onMouseOut={handleMouseUp}
			> + </button>
			<input id={property+"input"}
				type="number" 
				min="0" 
				max="99" 
				value={state[property]} 
				onKeyDown={handleKeyDown}/>
			<button type="button"  
					onMouseDown={() => handleMouseDown(-1)} 
					onMouseUp={handleMouseUp}
					onMouseOut={handleMouseUp}
			> - </button>
		</div>
	)
}

export default InputWithIncrementButtons;