import React, {useState} from 'react';

function SliderInput({value, setValue, minValue, maxValue}) {
    let [sliderValue, setSliderValue] = useState(50);
    let valueRatio = (maxValue - minValue) / 100;

    function handleSliderChange(e) {
        setSliderValue(e.target.value);
        updateValue(e.target.value);
    }

    function updateValue(value) {
        let newValue = convertSliderValue(value);
        setValue(newValue);
    }

    function convertSliderValue(value) { 
        return value * valueRatio;
    }
    
    return (
        <input type="range" min="0" max="100" 
            value={sliderValue} 
            onChange={handleSliderChange}/>
    )
}

export default SliderInput;