import React, {useState, useReducer, useEffect} from 'react';
import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';

function BPMinput({BPM}) {
	// BPM
        let minBPM = 0;
        let maxBPM = 200;  
        let initalBPMState = { BPM };
        const [BPMState, dispatch] = useReducer(BPMReducer, initalBPMState);
        let props = {property: 'BPM', state: BPMState, dispatch, settings: {displayLeadingZero: false, max: maxBPM}};
        let [rightKeyDown, setRightKeyDown] = useState(false);
        let [leftKeyDown, setLeftKeyDown] = useState(false);

        function BPMReducer(state, action) {   
            let newBPM = action.newValue;  

            if(newBPM >= minBPM && newBPM <= maxBPM) { 
                return {BPM: newBPM};
            } else if(newBPM < minBPM) {
                return {BPM: minBPM};
            } else if (newBPM > maxBPM) {
                return {BPM: maxBPM};
            }
        } 

        useEffect(() => { 
            if(rightKeyDown) { 
                let ev = new Event('mousedown', {bubbles: true});  
                document.getElementById('BPMIncreaseButton').dispatchEvent(ev); 
            } else if (!rightKeyDown) {
                let ev = new Event('mouseup', {bubbles: true});  
                document.getElementById('BPMIncreaseButton').dispatchEvent(ev);
            }
        }, [rightKeyDown])

        useEffect(() => {
            if(leftKeyDown) {
                let ev = new Event('mousedown', {bubbles: true});  
                document.getElementById('BPMDecreaseButton').dispatchEvent(ev); 
            } else if(!leftKeyDown) {
                let ev = new Event('mouseup', {bubbles: true});  
                document.getElementById('BPMDecreaseButton').dispatchEvent(ev);
            }
        }, [leftKeyDown])
 
        document.addEventListener('keydown', (e) => {
			if(e.key === 'ArrowRight' && !rightKeyDown) { 
                setRightKeyDown(true);  
			} else if(e.key === 'ArrowLeft' && !leftKeyDown) { 
				setLeftKeyDown(true);
			}
        });

        document.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowRight') {   
                setRightKeyDown(false); 
            } else if(e.key === 'ArrowLeft') { 
                setLeftKeyDown(false);
            }
        }) 

	return ( 
		<InputWithIncrementButtons {...props}/>
	);
};

export default BPMinput;

