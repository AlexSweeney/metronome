import React, {useState, useEffect} from 'react';
import ClickHoldButton from './ClickHoldButton.jsx';
import {playSound, addToEndOfInputNumber} from './utils.js';
import './../styles/TimerInput.css';

export default function TimerInput({value, setValue, isDisabled, min, max, buttonSound, children}) {
	const i = Date.parse(new Date());
	const timerInputId = `timer-input-${i}`;

	// ============================= Event Handlers ============================= //
	function onClickMinus() {
		const newVal = value - 1;
		if(newVal >= min && newVal <= max) {
			setValue(newVal)
			playSound(buttonSound)
		} 
	}

	function onClickPlus() {
		const newVal = value + 1; 
		if(newVal >= min && newVal <= max) {
			setValue(newVal)
			playSound(buttonSound)
		}
	}

	function onChange(e) {  
		addToEndOfInputNumber(e, 2, min, max, value, setValue)
	} 


	// ============================= Helper Fns ============================= //
	function addLeadingZero(number) {
		let string = String(number);

		if(number <= 0) string = '00';
		if(string.length < 2) string = '0' + string;

		return string;
	} 

	function addToEndOfInputNumber(e, maxLength, min, max, value, setValue) {
	  let newVal = String(e.target.value);    

	  if(newVal.length > maxLength) newVal = newVal.slice(1);
	  newVal = Number(newVal);

	  if((newVal >= min && newVal <= max) || newVal === '') {
	    setValue(newVal)
	  }
	}

	// ============================= Output ================================ //
	return (
		<div>
			<h4 className="timer-heading">{children}</h4>
			<div className="timer-input-container"> 
				<ClickHoldButton 
					handleClickHold={onClickMinus} 
					isDisabled={isDisabled} 
					className="timer-button">-</ClickHoldButton>
					<input id={timerInputId}
						type="number" 
						onChange={onChange} 
						className="timer-input" 
						value={addLeadingZero(value)}/>
				<ClickHoldButton 
					handleClickHold={onClickPlus} 
					isDisabled={isDisabled} 
					className="timer-button">+</ClickHoldButton>
			</div>
		</div>
	)
}