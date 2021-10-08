import React, {useState, useEffect} from 'react';
import ClickHoldButton from './ClickHoldButton.jsx';
import './../styles/TimerInput.css';

export default function TimerInput({value, setValue, min, max, children}) {
	// ============================= Event Handlers ============================= //
	function onClickMinus() {
		const newVal = value - 1;
		if(newVal >= min && newVal <= max) {
			setValue(newVal)
		} 
	}

	function onClickPlus() {
		const newVal = value + 1; 
		if(newVal >= min && newVal <= max) {
			setValue(newVal)
		}
	}

	function onChange(e) {
		const newVal = Number(e.target.value); 

		if((newVal >= min && newVal <= max) || newVal === '') {
			setValue(newVal)
		}
	}

	// ============================= Helper Fns ============================= //
	function addLeadingZero(number) {
		let string = String(number);

		if(number <= 0) string = '00';
		if(string.length < 2) string = '0' + string;

		return string;
	} 

	// ============================= Output ================================ //
	return (
		<div>
			<h4 className="timer-heading">{children}</h4>
			<div className="timer-input-container">
				
				<ClickHoldButton handleClickHold={onClickMinus} className="timer-button">-</ClickHoldButton>
					<input type="number" onChange={onChange} className="timer-input" value={addLeadingZero(value)}/>
				<ClickHoldButton handleClickHold={onClickPlus} className="timer-button">+</ClickHoldButton>
			</div>
		</div>
	)
}