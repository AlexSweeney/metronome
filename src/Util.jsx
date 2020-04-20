function addLeadingZero(number, addition) { 
	number = Number(number) + addition; 
	
	if(number < 0) {
		return '00';
	} else if(number < 10) {
		return '0' + number;
	} else {
		return number;
	} 
}


const Util = {addLeadingZero};
export default Util;