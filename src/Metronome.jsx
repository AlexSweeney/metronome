/* 
    fix high speeds

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

    add tempo names bar
*/


import React from 'react';
import './metronomeStyle.css';

import Wood from './audio/wood.mp3';

const Metronome = () => {
    console.log('render');
    let minBPM = 0;
    let maxBPM = 200;
    let [BPM, setBPM] = React.useState(40);  
    let [playMode, setPlayMode] = React.useState('stop');
    let clickTime = getClickTime(BPM);    

    let woodAudio = document.createElement('audio');
    woodAudio.src = Wood; 

    React.useEffect(() => {  
        if(playMode === 'play') { 
            const metronome = setInterval(() => {    
                woodAudio.play(); 
            }, getClickTime(BPM));

            return () => clearInterval(metronome);
        } 
    }, [playMode, BPM]);

    function incrementBPM(increment) { 
        setBPM(BPM + increment);
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
 
    function getClickTime(BPM) {
        return 60000 / BPM;
    }

    function play() {
        setPlayMode('play');
    }

    function stop() {
        setPlayMode('stop');
    } 
 
    return (
        <div className="metronomeContainer"> 
            BPM: {BPM}
			<input type="number" value={BPM} min={minBPM} max={maxBPM} onChange={handleBPMChange} id="BPMInput"/>
			<br/>
			<button onClick={() => incrementBPM(-1)}>-</button>
			<button onClick={() => incrementBPM(1)}>+</button>

			<button onClick={play} id="playButton">Play</button>
			<button onClick={stop} id="stopButton">Stop</button> 
		</div>
    )
}

export default Metronome;