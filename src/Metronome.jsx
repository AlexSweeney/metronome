/*
    refactor => useEffect hook for timer

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

    console.log('BPM', BPM); 

    let woodAudio = document.createElement('audio');
    woodAudio.src = Wood; 

    React.useEffect(() => {
        console.log('useEffect called', this);
        const metronome = setInterval(() => {
            console.log('useEffect timer click');
            console.log('BPM', BPM);
            if(playMode === 'play') {
                woodAudio.play();
            } 
        }, getClickTime(BPM));

        return () => clearInterval(metronome);
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

   /* function getBPM() {
        return document.getElementById("BPM_input").value;
    }*/

   /* function isPlaying() { 
        return elementHasClass('playButton', 'selected'); 
    }

    function elementHasClass(elementId, className) {
        return Array.from(document.getElementById(elementId).classList).indexOf(className) !== -1;
    }*/

    /*function metronomeTick(BPM) {  
        console.log('metronomeTick', BPM);  
        if(isPlaying()) {
            if(!elementHasClass('muteButton', 'muted')) {
                woodAudio.play();
            }
            
            setTimeout(() => metronomeTick(BPM), getClickTime(getBPM()));
            // setTimeout((context) => { metronomeTick()}, getClickTime(getBPM()), this);
        } 
    }*/

    /*function play() {   
        if(!elementHasClass('playButton', 'selected')) {
            addClass('playButton', 'selected');
            removeClass('stopButton', 'selected');
            changePlayMode('play');
            metronomeTick(BPM); 
        } 
    }

    function stop() {   
        console.log('stop');
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
    }*/

    /*function addClass(elementId, className) {
        document.getElementById(elementId).classList.add(className);
    }

    function removeClass(elementId, className) {
        document.getElementById(elementId).classList.remove(className);
    }*/
 
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