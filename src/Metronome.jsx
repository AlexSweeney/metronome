import React, { useEffect, useState, useReducer } from 'react';
import AudioElements from './components/AudioElements.jsx';
import SettingsViewToggle from './components/SettingsViewToggle.jsx';
import SettingsView from './components/SettingsView.jsx';
import BpmDisplay from './components/BpmDisplay.jsx';

import './styles/Metronome.css';
 
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

  const [metronomeSound, setMetronomeSound] = useState(audioIDs[0]);

  // =============== Mode
  const [playMode, setPlayMode] = useState('stop');

  // =============== View
  const [showSettingsView, setShowSettingsView] = useState(false);

  // =============== View
  const [bpm, setBpm] = useState(60);

  // =============================== Classes =============================== //

  // =============================== Event Handlers =============================== //
  function onSettingsViewToggleClick() {
    setShowSettingsView(oldVal => !oldVal)
  }

  function onSettingsOptionClick(e) {
    changeMetronomeSound(e.target.value)
  }

  // =============================== Helper Fns =============================== //
  function changeMetronomeSound(newSound) {
    if(playMode === 'play') {
      setPlayMode('stop');
      setMetronomeSound(newSound);
      
      setTimeout(() => {
        setPlayMode('play');
      }, 1);
    } else {
      setMetronomeSound(newSound);
    }
  }

  // =============================== Listen / trigger =============================== //
 /* useEffect(() => {
    if(!showSettingsView) setShowMetronomeViewClass('show-metronome-view')
    if(showSettingsView) setShowMetronomeViewClass('hide-metronome-view')
  }, [showSettingsView])*/

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

  // =============================== Output =============================== //
  return (
    <div>
      <AudioElements ids={audioIDs}/>

      <div className="metronome-container" id="metronomeContainer"> 
        <SettingsViewToggle handleClick={onSettingsViewToggleClick}/>

        <SettingsView 
          show={showSettingsView} 
          handleClick={onSettingsOptionClick} 
          options={audioIDs}
          selectedOption={metronomeSound}
        />

        <div className="metronome-view" hidden={showSettingsView}>
          <BpmDisplay bpm={bpm} setBpm={setBpm}/>
        </div>
                {/*

                
            
                { settingsView ?
                
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
                }*/}
      </div>  
    </div>
  )
}

/*function CustomRadio(props) {
  return (
    
  )
}*/