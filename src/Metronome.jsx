import React, { useEffect, useState, useReducer } from 'react';
import AudioElements from './components/AudioElements.jsx';
import SettingsViewToggle from './components/SettingsViewToggle.jsx';
import SettingsView from './components/SettingsView.jsx';
import BpmDisplay from './components/BpmDisplay.jsx';
import VolumeSlider from './components/VolumeSlider.jsx';
import Timer from './components/Timer.jsx';

import './styles/Metronome.css';
 
// import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';
// import SliderInput from './SliderInput.jsx';
// import BPMinput from './BPMinput.jsx';
// import Timer from "./Timer.jsx"; 

import { flashColor } from './utils.jsx';

export default function Metronome() {
  // =============================== Constants =============================== //
  // =============== bpm
  const [bpm, setBpm] = useState(60);

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

  const [metronomeSoundId, setMetronomeSoundId] = useState(audioIDs[0]);
  const metronomeSound = document.getElementById(metronomeSoundId);
  // const [metronomeSound, setMetronomeSound] = useState(getElement(metronomeSoundId)); 
  const [metronomeInterval, setMetronomeInterval] = useState(null);
  const [metronomeTime, setMetronomeTime] = useState(getMetronomeTime(bpm));

  // =============== Mode
  const [playMode, setPlayMode] = useState('stop');

  // =============== View
  const [showSettingsView, setShowSettingsView] = useState(false);
 
  // =============== Volume
  const [volume, setVolume] = useState(0.5);

  // =============================== Classes ====================================== //

  // =============================== Event Handlers =============================== //
  function onSettingsViewToggleClick() {
    setShowSettingsView(oldVal => !oldVal)
  }

  function onSettingsOptionClick(e) {
    setMetronomeSoundId(e.target.value)
  }

  function onVolumeChange(newVolume) {
    audioIDs.forEach(id => changeVolume(id, newVolume))
  } 

  function onClickPlay() {
    setPlayMode('play') 
    playSound(metronomeSound) 
  }

  function onClickStop() {
    setPlayMode('stop')
  }

  function onPlay(intervalTime) { 
    return startMetronomeInterval(intervalTime)
  }

  function onStop(interval) {  
    stopMetronomeInterval(interval)
  }

  /*function onPlay() {
    console.log('onPlay(')
    const metronomeSound = document.getElementById(metronomeSoundId);
   
    const thisInterval = setInterval(() => {
      playSound(metronomeSound)
    }, metronomeTime)
 
    setMetronomeInterval(thisInterval)
  }

  function onStop(interval) {
    clearInterval(interval)
    setMetronomeInterval(null)
  }*/
/*
  function onPlay() { 
    playSound(metronomeSoundId) 
    startMetronomeInterval()
  }

  function onStop() {
    stopSound(metronomeSoundId)
    stopMetronomeInterval() 
  }*/

  // function onBpmChange(bpm) { 
    
  // }

  // =============================== Helper Fns =============================== //
  /*function changemetronomeSoundId(newSound) {
    if(playMode === 'play') {
      setPlayMode('stop');
      setMetronomeSoundId(newSound);
      
      setTimeout(() => {
        setPlayMode('play');
      }, 1);
    } else {
      setMetronomeSoundId(newSound);
    }
  }*/

  // function startMetronomeInterval() {
  //   const thisInterval = setInterval(() => { 
  //     playSound(metronomeSoundId)
  //   }, metronomeTime)

  //   setMetronomeInterval(thisInterval) 
  // } 

  // function stopMetronomeInterval() {
  //   clearInterval(metronomeInterval) 
  //   setMetronomeInterval(null)
  // }

  function changeVolume(id, newVolume) {
    const element = document.getElementById(id);
    if(element) element.volume = newVolume;
  }

  function getElement(id) {
    return document.getElementById(id);
  }

  function startMetronomeInterval(intervalTime) {
    return setInterval(() => { 
      playSound(metronomeSound)
    }, intervalTime) 
  }

  function stopMetronomeInterval(interval) {
    clearInterval(interval) 
  }

  function playSound(sound) { 
    if(sound) {
      sound.pause();
      sound.currentTime = 0;
      sound.play()   
    }
  }

  function stopSound(sound) {
    if(sound) {
      sound.pause();
      sound.currentTime = 0;
    } 
  }

  function getMetronomeTime(bpm) {
    return 60000 / bpm;
  }

  // =============================== Listen / trigger =============================== //
  // =============== Change Volume
  useEffect(() => {
    onVolumeChange(volume);
  }, [volume]);

  // =============== Play Stop  
  useEffect(() => {
    let thisInterval;

    if(playMode === 'play') thisInterval = onPlay(metronomeTime);

    return () => { onStop(thisInterval) }
  }, [playMode, metronomeTime]) 

  // =============== Change Bpm 
  useEffect(() => { 
    const newTime = getMetronomeTime(bpm);
    setMetronomeTime(newTime) 
  }, [bpm]) 

  // on change metronome time
 /* useEffect(() => {
    console.log('metroNomeTimeChange', metronomeTime)
    console.log('playMode', playMode)
    setPlayMode('stop')
    clearInterval(metronomeInterval)
    if(playMode === 'play') {
      setTimeout(() => {
        setPlayMode('play')
      }, 1) 
    }
  }, [metronomeTime])*/


 /* useEffect(() => {
    if(!showSettingsView) setShowMetronomeViewClass('show-metronome-view')
    if(showSettingsView) setShowMetronomeViewClass('hide-metronome-view')
  }, [showSettingsView])*/

/*let thisInterval;

    if(playMode === 'play') {
      onPlay()
      const metronomeSound = document.getElementById(metronomeSoundId);

      thisInterval = setInterval(() => {
        playSound(metronomeSound)
      }, metronomeTime)
    }

    return () => {
      // onStop()
      // clearInterval(thisInterval)
    }*/

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
  //     let sound = document.getElementById(metronomeSoundId + 'Audio');

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
  // let [metronomeSoundId, setMetronomeSoundId] = useState('wood');

  // function handleChange(e) {
  //   if (playMode === 'play') {
  //     setPlayMode('stop');
  //     setMetronomeSoundId(e.target.value);
  //     setTimeout(() => {
  //       setPlayMode('play');
  //     }, 1);
  //   } else {
  //     setMetronomeSoundId(e.target.value);
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
          selectedOption={metronomeSoundId}
        />

        <div className="metronome-view" hidden={showSettingsView}>
          <BpmDisplay bpm={bpm} setBpm={setBpm}/>
          
          <div className="buttonContainer">
            <button onClick={onClickPlay} id="playButton" className="BPMButton">Play</button>
            <button onClick={onClickStop} id="stopButton" className="BPMButton">Stop</button> 
          </div> 

          <VolumeSlider volume={volume} setVolume={setVolume}/>
          <Timer/>
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