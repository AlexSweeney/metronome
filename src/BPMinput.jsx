import React, {useReducer} from 'react';
import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';

function BPMinput({BPM}) {
	// BPM
        let minBPM = 0;
        let maxBPM = 200;  
        let initalBPMState = { BPM };
        const [BPMState, dispatch] = useReducer(BPMReducer, initalBPMState);
        let props = {property: 'BPM', state: BPMState, dispatch, settings: {displayLeadingZero: false, max: maxBPM}};

        function BPMReducer(state, action) {  
            console.log('================ reducer ====================');
            let newBPM = action.newValue; 
            console.log('newBPM', newBPM);

            if(newBPM >= minBPM && newBPM <= maxBPM) {
                console.log('return', newBPM);
                return {BPM: newBPM};
            } else if(newBPM < minBPM) {
                return {BPM: minBPM};
            } else if (newBPM > maxBPM) {
                return {BPM: maxBPM};
            }
        } 
/*
         if(keyIsDown) return;
            setKeyIsDown(true);

            setTimeout(() => { 
                setCurrentKey(e.key);
                setKeyIsHeld(true); 
            }, 500);

         useEffect(() => {  
            console.log('useEffect');
            let holdInterval = null;
            if(keyIsDown && keyIsHeld) { 
                console.log('pass effect');

                setTimeout(() => {
                    console.log('interval');
                    console.log('BPM', BPM);
                    BPM += 1;
                    console.log('Post BPM', BPM);
                    dispatch({newValue: BPM + 1});
                    // dispatch({newValue: Number(BPM) + 1});
                }, 100);
                // setTimeout(() => {
                //     console.log('timeout');  
                //     // 
                //     // handleArrowKeyDown(currentKey);
                // }, 100);
                
            } 

            // else if(!keyIsDown && keyIsHeld) {
            //     setKeyIsHeld(false);
            // }
            return () => clearInterval(holdInterval);
        }, [keyIsDown, keyIsHeld, BPM])

        document.addEventListener('keyup', (e) => {
            setKeyIsDown(false);
            setKeyIsHeld(false);
        });
		
		function handleArrowKeyDown(key) {
            if(key === 'ArrowRight') {     
                dispatch({newValue: Number(BPM) + 1});
            } else if (key === 'ArrowLeft') {
                dispatch({newValue: Number(BPM) - 1});
            }  
        }
        */

	return (
		<InputWithIncrementButtons {...props}/>
	);
};

export default BPMinput;

