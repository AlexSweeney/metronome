import React, {useState, useReducer, useEffect} from 'react';
import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';

function BPMinput({BPM, setBPM}) {
	// BPM
        let minBPM = 0;
        let maxBPM = 300;  
        let initalBPMState = { BPM };
        const [BPMState, dispatch] = useReducer(BPMReducer, initalBPMState);
        let props = {property: 'BPM', state: BPMState, dispatch, settings: {displayLeadingZero: false, max: maxBPM}};
        let [rightKeyDown, setRightKeyDown] = useState(false);
        let [leftKeyDown, setLeftKeyDown] = useState(false);

        function BPMReducer(state, action) {   
            let newBPM = action.newValue;  

            if(newBPM >= minBPM && newBPM <= maxBPM) { 
                setBPM(newBPM);
                return {BPM: newBPM};
            } else if(newBPM < minBPM) {
                setBPM(minBPM);
                return {BPM: minBPM};
            } else if (newBPM > maxBPM) {
                setBPM(maxBPM);
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

    // TEMPO
        let [tempo, setTempo] = useState(getTempo(BPMState.BPM));

        function getTempo(BPM) {
            if(BPM === 0) {
                return '';
            } else if(BPM >= 1 && BPM <= 20) {
                return 'Larghissimo';
            } else if (BPM >= 20 && BPM <= 40) {
                return 'Grave';
            } else if (BPM >= 40 && BPM <= 60) {
                return 'Lento / Largo';
            } else if (BPM >= 60 && BPM <= 66) {
                return 'Larghetto';
            } else if (BPM >= 67 && BPM <= 75) {
                return 'Adagio';
            } else if (BPM >= 76 && BPM <= 107) {
                return 'Andante';
            } else if (BPM >= 108 && BPM <= 119) {
                return 'Moderato';
            } else if (BPM >= 120 && BPM <= 167) {
                return 'Allegro';
            } else if (BPM >= 168 && BPM <= 200) {
                return 'Presto';
            } else if (BPM >= 201) {
                return 'Prestissimo';
            } 
        }

        useEffect(() => { 
            setTempo(getTempo(BPMState.BPM));
        }, [BPMState.BPM]);

	return ( 
        <div className="BPMComponent">
    		<InputWithIncrementButtons {...props}/>
            <div className="tempoContainer">
                {tempo}
            </div> 
        </div>
	);
};

export default BPMinput;

