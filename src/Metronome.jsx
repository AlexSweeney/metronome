/*    
    flash with bpm click

    press space to play / stop

    Settings:
        change metronome sound
        change time signature
        change accent

    tap tempo

    add tempo names bar
*/


import React, {useEffect, useState, useReducer} from 'react';
import './styles/metronomeStyle.css';

import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';
import SliderInput from './SliderInput.jsx'; 
import Timer from "./Timer.jsx";

import Wood from './audio/wood.mp3';
import Util from './Util.jsx';

const Metronome = () => { 
    // Util
        let {flashColor} = Util;

    // BPM
        let minBPM = 0;
        let maxBPM = 200;  
        let initalBPMState = { BPM: '40'};
        const [BPMState, dispatch] = useReducer(BPMReducer, initalBPMState);
        let BPMProps = {property: 'BPM', state: BPMState, dispatch, settings: {displayLeadingZero: false, max: maxBPM}};

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
    
    // PLAY
        let [playMode, setPlayMode] = useState('stop'); 
        let BPM = BPMState.BPM; 
        let clickTime = getClickTime(BPM);   

        useEffect(() => {   
            if(playMode === 'play') { 
                const metronome = setInterval(() => {    
                    document.getElementById('woodAudio').play(); 
                    flashColor('BPMinput', '#64baff', 200);
                }, getClickTime(BPM));

                return () => clearInterval(metronome);
            } 
        }, [playMode, BPM]);
     
        function getClickTime(BPM) {
            return 60000 / BPM;
        }

        function play() {
            setPlayMode('play');
        }

        function stop() {
            setPlayMode('stop');
        } 

    // Volume
        let [volume, setVolume] = useState(0.5);

        useEffect(() => { 
            updateVolume(volume);
        }, [volume]);

        function updateVolume(newVolume) { 
            document.getElementById('woodAudio').volume = newVolume;
        }  

    return (
        <div className="metronomeContainer" id="metronomeContainer">  
            <audio src={Wood} id="woodAudio"/>

            <div className="BPMContainer"> 
                <InputWithIncrementButtons {...BPMProps}/>
            </div>
            
            <div className="buttonContainer">
                <button onClick={play} id="playButton" className="BPMButton">Play</button>
                <button onClick={stop} id="stopButton" className="BPMButton">Stop</button> 
            </div>
            
            <div className="volumeContainer">
                <SliderInput value={volume} setValue={setVolume} minValue={0} maxValue={1}/>
                {/*Volume: {Math.floor(volume * 100)}*/}
                <br/>
            </div>

            <div className="timerComponentContainer">
                <Timer/>
            </div>
		</div>
    )
}
 
export default Metronome;