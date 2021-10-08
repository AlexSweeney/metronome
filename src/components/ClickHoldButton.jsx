import React, {useState, useEffect} from 'react';

export default function ClickHoldButton({handleClickHold, children}) {
	/*
		call handleClickHold when clicked
		trigger handleClickHold when held
		speed triggering if held longer

		trigger when passed key 
	*/
	
	// =============================== Constants ==================================== //
	const [isDown, setIsDown] = useState(false);
	const [holdTime, setHoldTime] = useState(0);
  const [incrementTime, setIncrementTime] = useState(1000);
  const incrementChangePerSecond = 0.25;

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
		console.log('trigger')
		handleClickHold()
	}

	function updateIncrementTime() {
    setIncrementTime(oldVal => Math.round(oldVal * (1 -  incrementChangePerSecond)))
  }

	// =============================== Helper Fns  ================================== //
	function incrementHoldTime(time) {
		setHoldTime(oldVal => oldVal + time)
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
      setHoldTime(0)
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
		<button onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseOut={onMouseOut}>{children}</button>
	)
}