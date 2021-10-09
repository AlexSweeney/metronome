import React, {useState, useReducer, useEffect} from 'react';
import ClickHoldButton from './ClickHoldButton.jsx'; 
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import {playSound, addToEndOfInputNumber} from './utils.js';
import './../styles/BpmDisplay.css';

export default function BpmDisplay({bpm, setBpm, buttonSound}) {
  /* 
    * show bpm
    * show tempo

    * on click - = change bpm
    * on click + = change bpm
    
    * on click and hold - = speed up as held longer
    * on click and hold + = speed up as held longer
    

    * on change input = change bpm  
  */

  // ========================== Constants ========================== //
  const [tempo, setTempo] = useState('');
  const minBpm = 1;
  const maxBpm = 400;

  // ========================== Event Handlers ========================== //
  function onMinusClickHold() {
    changeBpm(bpm - 1)
    playSound(buttonSound)
  }

  function onPlusClickHold() { 
    changeBpm(bpm + 1)
    playSound(buttonSound)
  }

  // ========================== Helper Fns ========================== //
  function changeBpm(newBpm) {
    if(newBpm >= minBpm && newBpm <= maxBpm) {
      setBpm(newBpm)
    }
  }

  function getTempo(bpm) {
    if(bpm === 0) {
      return '';
    } else if(bpm >= 1 && bpm <= 20) {
      return 'Larghissimo';
    } else if (bpm >= 20 && bpm <= 40) {
      return 'Grave';
    } else if (bpm >= 40 && bpm <= 60) {
      return 'Lento / Largo';
    } else if (bpm >= 60 && bpm <= 66) {
      return 'Larghetto';
    } else if (bpm >= 67 && bpm <= 75) {
      return 'Adagio';
    } else if (bpm >= 76 && bpm <= 107) {
      return 'Andante';
    } else if (bpm >= 108 && bpm <= 119) {
      return 'Moderato';
    } else if (bpm >= 120 && bpm <= 167) {
      return 'Allegro';
    } else if (bpm >= 168 && bpm <= 200) {
      return 'Presto';
    } else if (bpm >= 201) {
      return 'Prestissimo';
    } 
  } 

  // ========================== Listen / Trigger ========================== //
  // ============= set tempo on bpm change
  useEffect(() => {
    const newTempo = getTempo(bpm);
    setTempo(newTempo)
  }, [bpm])

  // ========================== Output ========================== //
  return (
    <div className="bpm-display">
      <div className="bpm-container">
        <ClickHoldButton handleClickHold={onMinusClickHold} className="bpm-button">
          <AiOutlineMinus/>
        </ClickHoldButton> 
          <div className="bpm-display-input">{bpm}</div> 
        <ClickHoldButton handleClickHold={onPlusClickHold} className="bpm-button">
          <AiOutlinePlus/>
        </ClickHoldButton> 
      </div>
      <h3 className="tempo">{tempo}</h3>
    </div>
  )
}