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

  change metronome sound 
    * when playing

  ding when finish timer
  click when change bpm / time
  disable timer buttons when playing
  icons - play and stop
  input time - replace old

  tidy 
  push
  publish
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

  const metronomeSounds = [
    "Wood",
    "Click", 
    "Snare-Drum", 
    "Kick-Drum", 
    "Dog",
    "Cat", 
  ];

  const [selectedMetronomeSound, setSelectedMetronomeSound] = useState(metronomeSounds[0]);
  const [metronomeSound, setMetronomeSound] = useState(null); 
  const [metronomeInterval, setMetronomeInterval] = useState(null);
  const [metronomeTime, setMetronomeTime] = useState(getMetronomeTime(bpm));

  // =============== Mode
  const [playMode, setPlayMode] = useState('stop');

  // =============== View
  const [showSettingsView, setShowSettingsView] = useState(false);
 
  // =============== Volume
  const [volume, setVolume] = useState(0.5);

  // =============================== Event Handlers =============================== //
  function onSettingsViewToggleClick() {
    setShowSettingsView(oldVal => !oldVal)
    if(!showSettingsView && !hasInlineHeight('metronomeContainer')) keepHeight('metronomeContainer')
  }

  function onSettingsOptionClick(e) { 
    setSelectedMetronomeSound(e.target.value)
  }

  function onAudioLoad() {
    updateMetronomeSound(selectedMetronomeSound)
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

  function onPlay(intervalTime, playSound) { 
    return startMetronomeInterval(intervalTime, playSound)
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

  function startMetronomeInterval(intervalTime, sound) {
    return setInterval(() => { 
      playSound(sound)
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

  function keepHeight(id) {
    const element = document.getElementById(id);
    const style = window.getComputedStyle(element); 
    element.style.height = style.height;
  }

  function hasInlineHeight(id) {
    const element = document.getElementById(id); 
    return element.style.height !== '';
  }

  function updateMetronomeSound(id) {
    const newSound = document.getElementById(selectedMetronomeSound);
    setMetronomeSound(newSound)
  }

  // =============================== Listen / trigger =============================== //
  // =============== Change Volume
  useEffect(() => {
    onVolumeChange(volume);
  }, [volume]);

  // =============== Play Stop  
  useEffect(() => {
    let thisInterval;

    if(playMode === 'play') thisInterval = onPlay(metronomeTime, metronomeSound);

    return () => { onStop(thisInterval) }
  }, [playMode, metronomeTime, metronomeSound]) 

  // =============== Change Bpm 
  useEffect(() => { 
    const newTime = getMetronomeTime(bpm);
    setMetronomeTime(newTime) 
  }, [bpm]) 

  // =============== Change MetronomeSoundId
  useEffect(() => {
    updateMetronomeSound(selectedMetronomeSound)
  }, [selectedMetronomeSound]) 
 
  // =============================== Output =============================== //
  return (
    <div>
      <AudioElements ids={audioIDs} onLoad={onAudioLoad}/>

      <div className="metronome-container" id="metronomeContainer"> 
        <SettingsViewToggle handleClick={onSettingsViewToggleClick}/>

        <SettingsView 
          show={showSettingsView} 
          handleClick={onSettingsOptionClick} 
          options={metronomeSounds}
          selectedOption={selectedMetronomeSound}
        />

        <div className="metronome-view" hidden={showSettingsView}>
          <div className="bpm-display-container">
            <BpmDisplay bpm={bpm} setBpm={setBpm}/>
          </div>

          <div className="button-container">
            <button onClick={onClickPlay} id="playButton" className="bpm-button">Play</button>
            <button onClick={onClickStop} id="stopButton" className="bpm-button">Stop</button> 
          </div> 

          <div className="volume-slider-container"> 
            <VolumeSlider volume={volume} setVolume={setVolume}/>
          </div>
          <Timer/>
        </div> 
      </div>  
    </div>
  )
}