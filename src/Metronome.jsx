/*
    refactor => clear interval when playmode = stop

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
*/


import React from 'react';
import './metronomeStyle.css';

import Wood from './audio/wood.mp3';

const Metronome = () => {
    console.log('render');
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
        setBPM(event.target.value);  
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
			<input type="number" value={BPM} onChange={handleBPMChange} id="BPM_input"/>
			<br/>
			<button onClick={() => incrementBPM(-1)}>-</button>
			<button onClick={() => incrementBPM(1)}>+</button>

			<button onClick={play} id="playButton">Play</button>
			<button onClick={stop} id="stopButton">Stop</button>
            {/*<button onClick={mute} id="muteButton">Mute</button>*/}
		</div>
    )
}

export default Metronome;