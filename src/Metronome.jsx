/*
    mute button

    fix: mutliple click play

    keep playing when input new time

    keep incrementing when hold down button

    volume control

    timer

    style

    Settings:
        change metronome sound
        change time signature
        change accent

    tap tempo
*/


import React from 'react';
import './metronomeStyle.css';

import Wood from './audio/wood.mp3';

const Metronome = () => {
    console.log('render');
    let [BPM, changeBPM] = React.useState(40);  
    let [playMode, changePlayMode] = React.useState('stop');
    let clickTime = getClickTime(BPM);    

    let woodAudio = document.createElement('audio');
    woodAudio.src = Wood; 

    function incrementBPM(increment) { 
       changeBPM(BPM + increment);
    }

    function handleBPMChange(event) { 
        changeBPM(event.target.value); 
    }
 
    function getClickTime(BPM) {
        return 60000 / BPM;
    }

    function getBPM() {
        return document.getElementById("BPM_input").value;
    }

    function isPlaying() { 
        return elementHasClass('playButton', 'selected'); 
    }

    function elementHasClass(elementId, className) {
        return Array.from(document.getElementById(elementId).classList).indexOf(className) !== -1;
    }

    function metronomeTick() {  
        if(isPlaying()) {
            if(!elementHasClass('muteButton', 'muted')) {
                woodAudio.play();
            }
            
            setTimeout(metronomeTick, getClickTime(getBPM()));
        } 
    }

    function play() {   
        addClass('playButton', 'selected');
        removeClass('stopButton', 'selected');
        changePlayMode('play');
        metronomeTick(BPM); 
    }

    function stop() {   
        addClass('stopButton', 'selected');
        removeClass('playButton', 'selected');
        changePlayMode('stop'); 
    }

    function mute() { 
        if(!elementHasClass('muteButton', 'muted')) {
            addClass('muteButton', 'muted');
            woodAudio.muted = true;
        } else {
            removeClass('muteButton', 'muted');
            woodAudio.muted = false;
        }
    }

    function addClass(elementId, className) {
        document.getElementById(elementId).classList.add(className);
    }

    function removeClass(elementId, className) {
        document.getElementById(elementId).classList.remove(className);
    }
 
    return (
        <div className="metronomeContainer"> 
            BPM: {BPM}
			<input type="number" value={BPM} onChange={handleBPMChange} id="BPM_input"/>
			<br/>
			<button onClick={() => incrementBPM(-1)}>-</button>
			<button onClick={() => incrementBPM(1)}>+</button>

			<button onClick={play} id="playButton">Play</button>
			<button onClick={stop} id="stopButton">Stop</button>
            <button onClick={mute} id="muteButton">Mute</button>
		</div>
    )
}

export default Metronome;