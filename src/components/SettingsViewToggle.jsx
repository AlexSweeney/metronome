import React from 'react';
import { FaCog } from 'react-icons/fa';
import { IconContext } from "react-icons";
import './../styles/SettingsViewToggle.css';

export default function SettingsViewToggle({handleClick}) {
	return (
		<div className="cog-container" id="cogContainer" onClick={handleClick}> 
     	<FaCog size={30} className="cog"/>  
    </div>  
	)
}