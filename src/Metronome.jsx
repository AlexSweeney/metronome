/*  
    refactor Metronome -  
    IncrementButton component
    tidy, seperate

    style

    Settings:
        change metronome sound
        change time signature
        change accent

    tap tempo

    add tempo names bar
*/


import React from 'react';
import './metronomeStyle.css';

import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';

import Wood from './audio/wood.mp3';

const Metronome = () => { 
    let [volume, setVolume] = React.useState(0.5);
   
    /*let [playMode, setPlayMode] = React.useState('stop');
    let [incrementHold, setIncrementHold] = React.useState(null);
    let [incrementPause, setIncrementPause] = React.useState(true);
    let incrementHoldTimer = null;*/

    // let clickTime = getClickTime(BPM);   

    // Play mode  
    /*    React.useEffect(() => {  
            if(playMode === 'play') { 
                const metronome = setInterval(() => {    
                    document.getElementById('woodAudio').play(); 
                }, getClickTime(BPM));

                return () => clearInterval(metronome);
            } 
        }, [playMode, BPM]);

    React.useEffect(() => {   
        if(incrementHold && !incrementPause) {  
            const holdBPM = setInterval(() => {
                if(incrementHold === 1) { 
                    setBPM(BPM + 1); 
                } else if (incrementHold === -1) { 
                    setBPM(BPM - 1);
                }
            }, 100);
            
            return () => clearInterval(holdBPM);
        } 
    }, [incrementHold, incrementPause, BPM]);

    function incrementBPM(increment) {   
        incrementHoldTimer = setTimeout(() => {
             setIncrementPause(false);
        }, 800);
        setBPM(BPM + increment)
        setIncrementHold(increment);
    }

    function stopIncrementBPM() {  
        clearTimeout(incrementHoldTimer);
        setIncrementPause(true); 
        setIncrementHold(null);
    }

    function handleBPMChange(event) { 
        let newBPM = event.target.value; 

        if(newBPM >= minBPM && newBPM <= maxBPM) {
            setBPM(event.target.value);
        } else if(newBPM < minBPM) {
            setBPM(minBPM);
        } else if (newBPM > maxBPM) {
            setBPM(maxBPM);
        }
    }
 */
    /*function getClickTime(BPM) {
        return 60000 / BPM;
    }

    function play() {
        setPlayMode('play');
    }

    function stop() {
        setPlayMode('stop');
    } */

    // Volume
        React.useEffect(() => {
            updateVolume(volume / 100);
        }, [volume]);

        function updateVolume(newVolume) {
            document.getElementById('woodAudio').volume = newVolume;
        } 


    // BPM
        let initalBPMState = { BPM: '40'};
        const [BPMState, dispatch] = React.useReducer(BPMReducer, initalBPMState);
        let BPMProps = {property: 'BPM', state: BPMState, dispatch, displayLeadingZero: false};

        function BPMReducer(state, action) {  
            let newBPM = action.newValue;
            let minBPM = 0;
            let maxBPM = 200;  

            if(newBPM >= minBPM && newBPM <= maxBPM) {
                return {BPM: newBPM};
            } else if(newBPM < minBPM) {
                return {BPM: minBPM};
            } else if (newBPM > maxBPM) {
                return {BPM: maxBPM};
            }
        } 

    return (
        <div className="metronomeContainer" id="metronomeContainer">  
            <audio src={Wood} id="woodAudio"/>
           {/* incrementPause: {incrementPause}*/}
            {/*<br/>
			<input type="number" value={BPM} min={minBPM} max={maxBPM} onChange={handleBPMChange} id="BPMInput"/>
			<br/>
*/}
            {/* <InputButton value={BPM} increment={} */}
			{/*<button onMouseDown={() => incrementBPM(-1)}
                    onMouseUp={stopIncrementBPM}>-</button>
			<button onMouseDown={() => incrementBPM(1)}
                    onMouseUp={stopIncrementBPM}>+</button>*/}
            BPM
            <InputWithIncrementButtons {...BPMProps}/>

			{/*<button onClick={play} id="playButton">Play</button>
			<button onClick={stop} id="stopButton">Stop</button> */}

            <SliderInput value={volume} setValue={setVolume} minValue={0} maxValue={1}/>
            Volume: {Math.floor(volume * 100)}
            <br/>
		</div>
    )
}

function SliderInput({value, setValue, minValue, maxValue}) {
    let [sliderValue, setSliderValue] = React.useState(50);
    let valueRatio = (maxValue - minValue) / 100;

    function handleSliderChange(e) {
        setSliderValue(e.target.value);
        updateValue(e.target.value);
    }

    function updateValue(value) {
        let newValue = convertSliderValue(value);
        setValue(newValue);
    }

    function convertSliderValue(value) { 
        return value * valueRatio;
    }
    
    return (
        <input type="range" min="0" max="100" 
            value={sliderValue} 
            onChange={handleSliderChange}/>
    )
}

export default Metronome;