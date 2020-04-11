import React from 'react';
import './metronomeStyle.css';

import Wood from './audio/wood.mp3';

const Metronome = () => {
    const [BPM, changeBPM] = React.useState(40); 
    let woodAudio = null;
    let metronome = null;

    React.useEffect(() => {
        woodAudio = document.createElement('audio');
        woodAudio.src = Wood;
    }, []);
   

    function incrementBPM(increment) {
        changeBPM(BPM + increment);
    }

    function handleChange(event) {
        changeBPM(event.target.value);
    }

    function metronomeTick() {
         woodAudio.play();
    }

    function play() { 
        if(!metronome) {
            metronome = setInterval(metronomeTick, 1000)
        } 
    }

    function stop() {
        clearInterval(metronome);
    }

    return (
        <div className="metronomeContainer"> 
			<input type="number" value={BPM} onChange={handleChange}/>
			<br/>
			<button onClick={() => incrementBPM(-1)}>-</button>
			<button onClick={() => incrementBPM(1)}>+</button>

			<button onClick={play}>Play</button>
			<button onClick={stop}>Stop</button>
		</div>
    )
}

export default Metronome;