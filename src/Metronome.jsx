/*
    Settings:   

    fix speed

    fix save volume when change screens

    fix click bpm then type delete = crash

    unit test

    time signatures + light + accent  
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
import Click from './audio/click.mp3';
import Meow from './audio/meow.mp3';
import Snare from './audio/snare.mp3';
import Kick from './audio/kick.mp3';
import Bark from './audio/bark.mp3';

import Util from './Util.jsx';

const Metronome = () => { 
    // Util
        let {flashColor} = Util; 
        let audioIDs = ["woodAudio", "bellTingAudio", "clickAudio", "catAudio", "snareDrumAudio", "kickDrumAudio", "dogAudio"]; 

    // BPM 
        let [BPM, setBPM] = useState(80);
        let BPMProps = {BPM, setBPM};

    // PLAY
        let [playMode, setPlayMode] = useState('stop');  
        let clickTime = getClickTime(BPM);   
        let [keyIsDown, setKeyIsDown] = useState(false);
        let [keyIsHeld, setKeyIsHeld] = useState(false);
        let [currentKey, setCurrentKey] = useState(null);

        useEffect(() => {   
            if(playMode === 'play') { 
                console.log('useEffect + play');
                console.log('BPM', BPM);
                console.log('getClickTime(BPM)', getClickTime(BPM));

                const metronome = setInterval(() => {     
                    document.getElementById(metronomeSound+'Audio').play(); 
                    (document.getElementById('BPMinput') && flashColor('BPMinput', '#64baff', 200));
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
            audioIDs.forEach(audio => document.getElementById(audio).volume = newVolume); 
        }  

    // Settings
        let [settingsView, setSettingsView] = useState(false);
        let [metronomeSound, setMetronomeSound] = useState('wood'); 

        function handleChange(e) { 
            if(playMode === 'play') {
                setPlayMode('stop');
                setMetronomeSound(e.target.value);  
                setTimeout(() => {
                    setPlayMode('play');
                }, 1);
            } else {
                setMetronomeSound(e.target.value); 
            } 
        }

    return (
        <div> 
            <div className="metronomeContainer" id="metronomeContainer"> 
                <div className="cogContainer" id="cogContainer" onMouseDown={() => setSettingsView(settingsView = !settingsView)}>
                    <IconContext.Provider value={{ color: "black", className: "Cog", id: "cog"}}>
                    <FaCog size={30}/> 
                    </IconContext.Provider>
                </div>  

                <audio src={Wood} id="woodAudio"/>
                <audio src={BellTing} id="bellTingAudio"/>
                <audio src={Click} id="clickAudio"/>
                <audio src={Meow} id="catAudio"/>
                <audio src={Snare} id="snareDrumAudio"/>
                <audio src={Kick} id="kickDrumAudio"/>
                <audio src={Bark} id="dogAudio"/> 
            
                { settingsView ?
                <div className="settingsView"> 
                    {/* Choose Metronome Sound */}  
                        <div className="metronomeSoundRadios">
                            <FormControl component="fieldset">
                                <h3>Metronome Sound</h3>
                                <RadioGroup name="sound" value={metronomeSound} onChange={handleChange}>
                                    <FormControlLabel value="wood" control={<CustomRadio/>} label="Wood"/>
                                    <FormControlLabel value="click" control={<CustomRadio/>} label="Click"/>
                                    <FormControlLabel value="snareDrum" control={<CustomRadio/>} label="Snare Drum"/>
                                    <FormControlLabel value="kickDrum" control={<CustomRadio/>} label="Kick Drum"/>
                                    <FormControlLabel value="cat" control={<CustomRadio/>} label="Cat"/>
                                    <FormControlLabel value="dog" control={<CustomRadio/>} label="Dog"/>
                                </RadioGroup>
                            </FormControl> 
                        </div>
                    {/* Time Signature */}

                    {/* Tap Tempo */}
                </div>
                : 
                <div className="metronomeView"> 

                    <BPMinput {...BPMProps}/>   

                    <div className="buttonContainer">
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

function CustomRadio(props) {
    return (
        <Radio
            className="radio"  
            color="white"
            {...props}
        />
    )
}
 
export default Metronome;