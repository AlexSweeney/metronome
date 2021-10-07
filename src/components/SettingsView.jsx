import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './../styles/SettingsView.css';

export default function SettingsView({show, options, selectedOption, handleClick}) {
  const showClass = show ? 'show-settings-view' : 'hide-settings-view'; 

  return (
    <div className={`settings-view ${showClass}`}> 
      <FormControl component="fieldset">
        <h3>Metronome Sound</h3>
        <RadioGroup name="sound" value={selectedOption} onChange={handleClick}>
          {
            options.map(option => <FormControlLabel value={option} control={<Radio color="primary"/>} label={option}/>)
          }
        </RadioGroup>
      </FormControl> 
    </div>
  )
}