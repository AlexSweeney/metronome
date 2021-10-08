import React, {useState, useEffect} from 'react';

export default function ClickHoldButton({handleClickHold, className, children}) {
	/*
		* call handleClickHold when clicked
		* trigger handleClickHold when held
		* speed up triggering as held longer

		trigger when passed key 
	*/
	
	// =============================== Constants ==================================== //
	const startIncrementTime =1000;
  const incrementChangePerSecond = 0.25;

	const [isDown, setIsDown] = useState(false);
	const [holdTime, setHoldTime] = useState(0);
  const [incrementTime, setIncrementTime] = useState(startIncrementTime);
  
	// =============================== Event Handlers =============================== //
	function onMouseDown() {
		setIsDown(true)
	}

	function onMouseUp() {
		setIsDown(false)
	}

	function onMouseOut() {
		setIsDown(false)
	}

	function onTrigger() { 
		handleClickHold()
	}

	function updateIncrementTime() {
    setIncrementTime(oldVal => Math.round(oldVal * (1 -  incrementChangePerSecond)))
  }

	// =============================== Helper Fns  ================================== //
	function incrementHoldTime(time) {
		setHoldTime(oldVal => oldVal + time)
	}

	function resetHold() {
		setHoldTime(0)
		setIncrementTime(startIncrementTime)
	}

	// =============================== Listen / Trigger ============================= //
	// ================ On Down
	useEffect(() => {
		if(isDown) onTrigger()
	}, [isDown])

	// ================ Update Hold Time
	useEffect(() => {
		let holdTimeInterval;

		if(isDown) holdTimeInterval = setInterval(incrementHoldTime, 100, 100);
 
    return () => { 
      clearInterval(holdTimeInterval)
	    resetHold()
    }
	}, [isDown])

	// ================ Trigger Increment when held
	 useEffect(() => {
    if(holdTime >= incrementTime) {
      onTrigger()
      updateIncrementTime()
      setHoldTime(0)
    }
  }, [holdTime, incrementTime])

	// =============================== Output ======================================= //
	return (
		<button 
			onMouseDown={onMouseDown} 
			onMouseUp={onMouseUp} 
			onMouseOut={onMouseOut}
			className={className}>{children}</button>
	)
}