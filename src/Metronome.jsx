/*
    change tempo while playing 

    play and stop

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
    let [playMode, changePlayMode] = React.useState('play');
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

    function metronomeTick() { 
        console.log('tick',playMode);
        woodAudio.play();
        if(playMode === 'play') { 
            setTimeout(metronomeTick, getClickTime(getBPM()));
        } 
    }

    function play() {  
        woodAudio.muted = false;
        changePlayMode('play');
        metronomeTick(BPM); 
    }

    function stop() {  
        woodAudio.muted = true;
        changePlayMode('stop'); 
    }

    function mute() {
        woodAudio.muted = true;
    }
 
    return (
        <div className="metronomeContainer"> 
            BPM: {BPM}
			<input type="number" value={BPM} onChange={handleBPMChange} id="BPM_input"/>
			<br/>
			<button onClick={() => incrementBPM(-1)}>-</button>
			<button onClick={() => incrementBPM(1)}>+</button>

			<button onClick={play}>Play</button>
			<button onClick={stop}>Stop</button>
            <button onClick={mute}>Mute</button>
		</div>
    )
}

export default Metronome;