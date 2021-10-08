import React, { useEffect, useState, useReducer } from 'react';
import AudioElements from './components/AudioElements.jsx';
import SettingsViewToggle from './components/SettingsViewToggle.jsx';
import SettingsView from './components/SettingsView.jsx';
import BpmDisplay from './components/BpmDisplay.jsx';
import VolumeSlider from './components/VolumeSlider.jsx';
import Timer from './components/Timer.jsx';

import './styles/Metronome.css';
 
/*
  To do
  
  style - layout
  style - hover 
  change metronome sound
  ding when finish timer
  click when change bpm / time
  disable timer buttons when playing
  icons - play and stop

*/

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

  // =============================== Helper Fns =============================== //
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
      </div>  
    </div>
  )
}