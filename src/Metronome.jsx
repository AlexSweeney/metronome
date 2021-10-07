import React, { useEffect, useState, useReducer } from 'react';
import AudioElements from './components/AudioElements.jsx';

// import './styles/metronomeStyle.css';
// import { FaCog } from 'react-icons/fa';

// import { IconContext } from "react-icons";

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

// import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';
// import SliderInput from './SliderInput.jsx';
// import BPMinput from './BPMinput.jsx';
// import Timer from "./Timer.jsx"; 

import { flashColor } from './utils.jsx';

export default function Metronome() {
  // =============================== Constants =============================== //
  // =============== Audio
  const audioIDs = [
    "Wood", 
    "Bell", 
    "Click", 
    "Snare-Drum", 
    "Kick-Drum", 
    "Dog",
    "Cat", 
   ]; 

  // BPM 
  // const [BPM, setBPM] = useState(80);
  // const BPMProps = { BPM, setBPM };

  // // PLAY
  // const [playMode, setPlayMode] = useState('stop');
  // const clickTime = getClickTime(BPM);
  // const [keyIsDown, setKeyIsDown] = useState(false);
  // const [keyIsHeld, setKeyIsHeld] = useState(false);
  // const [currentKey, setCurrentKey] = useState(null);

  // useEffect(() => {
  //   if (playMode === 'play') {
  //     let sound = document.getElementById(metronomeSound + 'Audio');

  //     const metronome = setInterval(() => {
  //       if (!sound.ended) {
  //         sound.pause();
  //         sound.currentTime = 0;
  //       }

  //       sound.play();
  //       (document.getElementById('BPMinput') && flashColor('BPMinput', '#64baff', 200));
  //     }, getClickTime(BPM));

  //     return () => clearInterval(metronome);
  //   }
  // }, [playMode, BPM]);

  // function getClickTime(BPM) {
  //   return 60000 / BPM;
  // }

  // function play() {
  //   setPlayMode('play');
  // }

  // function stop() {
  //   setPlayMode('stop');
  // }

  // document.addEventListener('keydown', (e) => {
  //   if (e.key === ' ') {
  //     if (playMode === 'play') {
  //       setPlayMode('stop');
  //     } else if (playMode === 'stop') {
  //       setPlayMode('play');
  //     }
  //   }
  // });

  // // Volume
  // let [volume, setVolume] = useState(0.5);

  // useEffect(() => {
  //   updateVolume(volume);
  // }, [volume]);

  // function updateVolume(newVolume) {
  //   audioIDs.forEach(audio => document.getElementById(audio).volume = newVolume);
  // }

  // // Settings
  // let [settingsView, setSettingsView] = useState(false);
  // let [metronomeSound, setMetronomeSound] = useState('wood');

  // function handleChange(e) {
  //   if (playMode === 'play') {
  //     setPlayMode('stop');
  //     setMetronomeSound(e.target.value);
  //     setTimeout(() => {
  //       setPlayMode('play');
  //     }, 1);
  //   } else {
  //     setMetronomeSound(e.target.value);
  //   }
  // }

  // // Timer 
  // let initialTimeState = { hours: '00', minutes: '00', seconds: '00' };
  // const [timeState, dispatch] = useReducer(timeReducer, initialTimeState);
  // let [timerPlayMode, setTimerPlayMode] = useState('stop');

  // function timeReducer(timeState, action) {
  //   let { hours, minutes, seconds } = timeState;

  //   switch (action.target) {
  //     case 'hours':
  //       hours = action.newValue;
  //       break;
  //     case 'minutes':
  //       minutes = action.newValue;
  //       break;
  //     case 'seconds':
  //       seconds = action.newValue;
  //       break;
  //     case 'play':
  //       hours = action.newTime.hours;
  //       minutes = action.newTime.minutes;
  //       seconds = action.newTime.seconds;
  //       break;
  //     case 'stop':
  //       seconds = '00';
  //       minutes = '00';
  //       hours = '00';
  //       break;
  //   }

  //   return { hours, minutes, seconds };
  // }

  // let timerProps = { timeState, dispatch, timeReducer, timerPlayMode, setTimerPlayMode };

  return (
    <div>
      <AudioElements ids={audioIDs}/>
{/*
            <div className="metronomeContainer" id="metronomeContainer"> 
                <div className="cogContainer" id="cogContainer" onMouseDown={() => setSettingsView(settingsView = !settingsView)}>
                    <IconContext.Provider value={{ color: "black", className: "Cog", id: "cog"}}>
                    <FaCog size={30}/> 
                    </IconContext.Provider>
                </div>  

                
            
                { settingsView ?
                <div className="settingsView"> 
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
                        <Timer {...timerProps}/>
                    </div>
                </div>
                }
            </div>  */}
    </div>
  )
}

/*function CustomRadio(props) {
  return (
    <Radio
            className="radio"  
            color="white"
            {...props}
        />
  )
}*/