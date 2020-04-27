/*
    Settings:
        change metronome sound
        change time signature
        change accent

    fix speed

    fix click bpm then type delete = crash

    tap tempo  
*/


import React, {useEffect, useState, useReducer} from 'react';
import './styles/metronomeStyle.css'; 
import { FaCog } from 'react-icons/fa'; 

import { IconContext } from "react-icons"; 

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';
import SliderInput from './SliderInput.jsx'; 
import BPMinput from './BPMinput.jsx';
import Timer from "./Timer.jsx";

import Wood from './audio/wood.mp3';
import BellTing from './audio/bell-ting.mp3';

import Util from './Util.jsx';

const Metronome = () => { 
    // Util
        let {flashColor} = Util; 

    // Metronome Sound
       

    // BPM 
        let [BPM, setBPM] = useState(80);

    // PLAY
        let [playMode, setPlayMode] = useState('stop');  
        let clickTime = getClickTime(BPM);   
        let [keyIsDown, setKeyIsDown] = useState(false);
        let [keyIsHeld, setKeyIsHeld] = useState(false);
        let [currentKey, setCurrentKey] = useState(null);

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

        document.addEventListener('keydown', (e) => { 
            if(e.key === ' ') {
                if(playMode === 'play') {
                    setPlayMode('stop');
                } else if(playMode === 'stop') {
                    setPlayMode('play');
                }
            }  
        });
 
    // Volume
        let [volume, setVolume] = useState(0.5);

        useEffect(() => { 
            updateVolume(volume);
        }, [volume]);

        function updateVolume(newVolume) { 
           /* document.getElementById('woodAudio').volume = newVolume;
            document.getElementById('bellTingAudio').volume = newVolume;*/
        }  

    // Settings
        let [settingsView, setSettingsView] = useState(false);
        let [metronomeSound, setMetronomeSound] = useState('Wood');
        // let metronomeSound = 'Wood'; 

        let value = "hello";

        function handleChange(e) {
            setMetronomeSound(e.target.value);
            console.log('change');
            console.log(e.target.value);
        }

    return (
        <div> 
            <div className="metronomeContainer" id="metronomeContainer"> 
                <div className="cogContainer" id="cogContainer" onMouseDown={() => setSettingsView(settingsView = !settingsView)}>
                    <IconContext.Provider value={{ color: "black", className: "Cog", id: "cog"}}>
                    <FaCog size={30}/> 
                    </IconContext.Provider>
                </div>  
            
                { settingsView ?
                <div className="settingsView"> 
                    {/* Choose Metronome Sound */}
                        metronomeSound: {String(metronomeSound)} 
                        <br/>
                         
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sound</FormLabel>
                            <RadioGroup name="sound" value={metronomeSound} onChange={handleChange}>
                                <FormControlLabel value="wood" control={<Radio/>} label="Wood"/>
                                <FormControlLabel value="click" control={<Radio/>} label="Clicks"/>
                                <FormControlLabel value="snareDrum" control={<Radio/>} label="Snare Drum"/>
                                <FormControlLabel value="kickDrum" control={<Radio/>} label="Kick Drum"/>
                                <FormControlLabel value="cat" control={<Radio/>} label="cat"/>
                                <FormControlLabel value="dog" control={<Radio/>} label="dog"/>
                            </RadioGroup>
                        </FormControl> 
                    {/* Time Signature */}

                    {/* Tap Tempo */}
                </div>
                : 
                <div className="metronomeView"> 

                    <BPMinput BPM={BPM}/>   

                    <div className="buttonContainer">
                        <audio src={Wood} id="woodAudio"/>
                        <audio src={BellTing} id="bellTingAudio"/>

                        <button onClick={play} id="playButton" className="BPMButton">Play</button>
                        <button onClick={stop} id="stopButton" className="BPMButton">Stop</button> 
                    </div> 

                    <div className="volumeContainer">
                        <SliderInput value={volume} setValue={setVolume} minValue={0} maxValue={1}/>
                        <br/>
                    </div>

                    <div className="timerComponentContainer">
                        <Timer/>
                    </div>
                </div>
                }
            </div> 
        </div>
    )
}
 
export default Metronome;