/*  
    volume control
    
    fix, remove increment on input box

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
    let minBPM = 0;
    let maxBPM = 200;
    let [volumeSlider, setVolumeSlider] = React.useState(50);
    let [volume, setVolume] = React.useState(0.5);
    let [BPM, setBPM] = React.useState(40);  
    let [playMode, setPlayMode] = React.useState('stop');
    let [incrementHold, setIncrementHold] = React.useState(null);
    let clickTime = getClickTime(BPM);     

    React.useEffect(() => {  
        if(playMode === 'play') { 
            const metronome = setInterval(() => {    
                document.getElementById('woodAudio').play(); 
            }, getClickTime(BPM));

            return () => clearInterval(metronome);
        } 
    }, [playMode, BPM]);

    React.useEffect(() => { 
        if(incrementHold) { 
            const holdBPM = setInterval(() => {
                if(incrementHold === 1) { 
                    setBPM(BPM + 1); 
                } else if (incrementHold === -1) { 
                    setBPM(BPM - 1);
                }
            }, 100);
            
            return () => clearInterval(holdBPM);
        }
    }, [incrementHold, BPM]);

    React.useEffect(() => {
        console.log('change volumeSlider');
        updateVolume();
        
    }, [volumeSlider]);

    function updateVolume() {
        console.log('updateVolume', volume);
        setVolume(volumeSlider / 100);
        document.getElementById('woodAudio').volume = volume;
    }

    function incrementBPM(increment) {  
        setBPM(BPM + increment)
        setIncrementHold(increment);
    }

    function stopIncrementBPM() { 
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
 
    function getClickTime(BPM) {
        return 60000 / BPM;
    }

    function play() {
        setPlayMode('play');
    }

    function stop() {
        setPlayMode('stop');
    } 

    function handleVolumeSliderChange(e) {
        setVolumeSlider(e.target.value);
    }
 
    return (
        <div className="metronomeContainer" id="metronomeContainer">  
            <audio src={Wood} id="woodAudio"/>

			<input type="number" value={BPM} min={minBPM} max={maxBPM} onChange={handleBPMChange} id="BPMInput"/>
			<br/>
			<button onMouseDown={() => incrementBPM(-1)}
                    onMouseUp={stopIncrementBPM}>-</button>
			<button onMouseDown={() => incrementBPM(1)}
                    onMouseUp={stopIncrementBPM}>+</button>

			<button onClick={play} id="playButton">Play</button>
			<button onClick={stop} id="stopButton">Stop</button> 

            <input type="range" min="0" max="100" value={volumeSlider} onChange={handleVolumeSliderChange}/>
            volume {volumeSlider}
		</div>
    )
}

export default Metronome;