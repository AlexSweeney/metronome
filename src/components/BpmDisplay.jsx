import React, {useState, useReducer, useEffect} from 'react';
import ClickHoldButton from './ClickHoldButton.jsx';
// import InputWithIncrementButtons from './InputWithIncrementButtons.jsx';

export default function BpmDisplay({bpm, setBpm}) {
  /* 
    * show bpm
    * show tempo

    * on click - = change bpm
    on click + = change bpm
    
    * on click and hold - = change bpm
      * : speed up as held longer
    on click and hold + = change bpm , speed up as held longer

    * on change input = change bpm  
  */

  // ========================== Constants ========================== //
  const [minusDown, setMinusDown] = useState(false);
  const [leftKeyDown, setLeftKeyDown] = useState(false);

  const [holdTime, setHoldTime] = useState(0);
  const [incrementTime, setIncrementTime] = useState(1000);
  const incrementChangePerSecond = 0.25;

  const [tempo, setTempo] = useState('');

  // ========================== Event Handlers ========================== //
  function onInputChange(e) {
    setBpm(e.target.value)
  }

  function onMinusDown() {
    setMinusDown(true)
  }

  function onMinusOut() {
    setMinusDown(false)
  }

  function onMinusUp() {
    setMinusDown(false)
  }

  function onMinusClickHold() {
    const newBpm = bpm - 1;
    if(newBpm >= 1) setBpm(newBpm)
  }

  
  // ========================== Helper Fns ========================== //
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

  function incrementMinus(holdTime) {
    setBpm(oldVal => oldVal - 1) 
  }

  function incrementPlus() {
    setBpm(oldVal => oldVal + 1)
  }

  function incrementHoldTime(time) {
    setHoldTime(oldVal => oldVal + time)
  }

  function updateIncrementTime() {
    setIncrementTime(oldVal => Math.round(oldVal * (1 -  incrementChangePerSecond)))
  }

  // ========================== Listen / Trigger ========================== //
  // ============= bpm
  useEffect(() => {
    const newTempo = getTempo(bpm);
    setTempo(newTempo)
  }, [bpm])

  // ============= minus down
  useEffect(() => {
    if(minusDown) incrementMinus()
  }, [minusDown])

  // ======== update hold time
  useEffect(() => {
    let holdTime;

    if(minusDown) {
      holdTime = setInterval(incrementHoldTime, 100, 100);
    }

    return () => { 
      clearInterval(holdTime)
      setHoldTime(0)
    }
  }, [minusDown]) 

  // ======= trigger increment
  useEffect(() => {
    if(holdTime >= incrementTime) {
      incrementMinus()
      updateIncrementTime()
      setHoldTime(0)
    }
  }, [holdTime, incrementTime])

  // ========================== Output ========================== //
  return (
    <div className="bpm-display-container">
      <ClickHoldButton handleClickHold={onMinusClickHold}>Minus</ClickHoldButton>
      <button onMouseDown={onMinusDown} onMouseUp={onMinusUp} onMouseOut={onMinusOut}>-</button>
        <input type="number" value={bpm} onChange={onInputChange}/>
        
     {/* <button onClick={onClickPlus}>+</button>*/}
      <h3>{tempo}</h3>
      holdTime: {holdTime}
      incrementTime: {incrementTime}
    </div>
  )
}

/*function BPMinput({BPM, setBPM}) {
        


        let initalBPMState = { BPM };
        const [BPMState, dispatch] = useReducer(BPMReducer, initalBPMState);
        let props = {property: 'BPM', state: BPMState, dispatch, settings: {displayLeadingZero: false}};
        let [rightKeyDown, setRightKeyDown] = useState(false);
        let [leftKeyDown, setLeftKeyDown] = useState(false);

        function BPMReducer(state, action) {   
            let newBPM = action.newValue; 
            setBPM(newBPM);
            return {BPM: newBPM};  
        } 

        useEffect(() => { 
            if(rightKeyDown) { 
                let ev = new Event('mousedown', {bubbles: true});  
                document.getElementById('BPMIncreaseButton').dispatchEvent(ev); 
            } else if (!rightKeyDown) {
                let ev = new Event('mouseup', {bubbles: true});  
                document.getElementById('BPMIncreaseButton').dispatchEvent(ev);
            }
        }, [rightKeyDown])

        useEffect(() => {
            if(leftKeyDown) {
                let ev = new Event('mousedown', {bubbles: true});  
                document.getElementById('BPMDecreaseButton').dispatchEvent(ev); 
            } else if(!leftKeyDown) {
                let ev = new Event('mouseup', {bubbles: true});  
                document.getElementById('BPMDecreaseButton').dispatchEvent(ev);
            }
        }, [leftKeyDown])
 
        document.addEventListener('keydown', (e) => {
			if(e.key === 'ArrowRight' && !rightKeyDown) { 
                setRightKeyDown(true);  
			} else if(e.key === 'ArrowLeft' && !leftKeyDown) { 
				setLeftKeyDown(true);
			}
        });

        document.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowRight') {   
                setRightKeyDown(false); 
            } else if(e.key === 'ArrowLeft') { 
                setLeftKeyDown(false);
            }
        }) 

    // TEMPO
        let [tempo, setTempo] = useState(getTempo(BPMState.BPM));

        function getTempo(BPM) {
            if(BPM === 0) {
                return '';
            } else if(BPM >= 1 && BPM <= 20) {
                return 'Larghissimo';
            } else if (BPM >= 20 && BPM <= 40) {
                return 'Grave';
            } else if (BPM >= 40 && BPM <= 60) {
                return 'Lento / Largo';
            } else if (BPM >= 60 && BPM <= 66) {
                return 'Larghetto';
            } else if (BPM >= 67 && BPM <= 75) {
                return 'Adagio';
            } else if (BPM >= 76 && BPM <= 107) {
                return 'Andante';
            } else if (BPM >= 108 && BPM <= 119) {
                return 'Moderato';
            } else if (BPM >= 120 && BPM <= 167) {
                return 'Allegro';
            } else if (BPM >= 168 && BPM <= 200) {
                return 'Presto';
            } else if (BPM >= 201) {
                return 'Prestissimo';
            } 
        }

        useEffect(() => { 
            setTempo(getTempo(BPMState.BPM));
        }, [BPMState.BPM]);

	return ( 
        <div className="BPMComponent">
    		<InputWithIncrementButtons {...props}/>
            <div className="tempoContainer">
                {tempo}
            </div> 
        </div>
	);
}; 

*/