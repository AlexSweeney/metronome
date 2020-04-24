/*
    Settings:
        change metronome sound
        change time signature
        change accent

    fix speed

    tap tempo  
*/


import React, {useEffect, useState, useReducer} from 'react';
import './styles/metronomeStyle.css'; 
import { FaCog } from 'react-icons/fa'; 
import { IconContext } from "react-icons";

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

    return (
        <div>
            { settingsView ? 
                <div>Settings View</div>
                :  
                <div className="metronomeContainer" id="metronomeContainer"> 
                    <div className="BPMContainer"> 
                        <div className="cogContainer"></div> 

                        <BPMinput BPM={BPM}/> 

                        <div className="cogContainer" id="cogContainer" onMouseDown={() => setSettingsView(settingsView = !settingsView)}>
                            <IconContext.Provider value={{ color: "black", className: "Cog", id: "cog"}}>
                              <div onClick={console.log('div click')}>
                                <FaCog size={30} onClick={console.log('div click')}/>
                              </div>
                            </IconContext.Provider>
                        </div>  
                    </div>
                    
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
    )
}
 
export default Metronome;