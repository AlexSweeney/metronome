import React from 'react';
import './metronomeStyle.css';

import Wood from './audio/wood.mp3';

const Metronome = () => {
    const [BPM, changeBPM] = React.useState(40); 
    let woodAudio = document.createElement('audio');
    woodAudio.src = Wood;
    let metronomeInterval = null;

    function incrementBPM(increment) {
        changeBPM(BPM + increment);
        stop();
        play();
    }

    function handleBPMChange(event) {
        changeBPM(event.target.value);
        stop();
        play();
    }

    function metronomeTick() {
         woodAudio.play();
    }

    function getClickTime(BPM) {
        return 60000 / BPM;
    }

    function play() { 
        if(!metronomeInterval) {
            let clickTime = getClickTime(BPM);
            console.log('clickTime', clickTime);
            metronomeInterval = setInterval(metronomeTick, clickTime);
        } 
    }

    function stop() {
        clearInterval(metronomeInterval);
    }

    return (
        <div className="metronomeContainer"> 
			<input type="number" value={BPM} onChange={handleBPMChange}/>
			<br/>
			<button onClick={() => incrementBPM(-1)}>-</button>
			<button onClick={() => incrementBPM(1)}>+</button>

			<button onClick={play}>Play</button>
			<button onClick={stop}>Stop</button>
		</div>
    )
}

export default Metronome;