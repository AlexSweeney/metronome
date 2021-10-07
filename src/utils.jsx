export function addLeadingZero(number, addition) { 
	number = Number(number) + addition; 
	
	if(number < 0) {
		return '00';
	} else if(number < 10) {
		return '0' + number;
	} else {
		return number;
	} 
}

export function flashColor(target, color, holdTime) { 
	let el = document.getElementById(target); 
	let origColor = el.style.backgroundColor;

	el.style.backgroundColor = color;

	setTimeout(() => {
		el.style.backgroundColor = origColor;
	}, holdTime);
} 