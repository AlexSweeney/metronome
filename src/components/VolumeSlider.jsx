import React, {useState} from 'react';
import './../styles/VolumeSlider.css';

export default function VolumeSlider({volume, setVolume}) {
	// ============================ Constants ================================= //
	const maxValue = 1;
	const minValue = 0;
	const valueRatio = (maxValue - minValue) / 100;
  const [sliderValue, setSliderValue] = useState(getSliderValue(volume));
  
  // ============================ Event Handlers ============================ //
  function onSliderChange(e) {
    setSliderValue(e.target.value);
    updateVolume(e.target.value);
  }

  // ============================ Helper Fns =============================== //
  function updateVolume(value) {
    let newVolume = convertSliderValue(value);
    setVolume(newVolume);
  }

  function convertSliderValue(value) { 
    return value * valueRatio;
  }

  function getSliderValue(value) { 
    return value / valueRatio;
  }
  
  // ============================ Output =================================== //
  return (
    <input type="range" min="0" max="100" 
      className="volume-slider"
      value={sliderValue} 
      onChange={onSliderChange}/> 
  )
}