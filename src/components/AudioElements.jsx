import React, {useEffect, useState} from 'react';
import Wood from './../audio/Wood.mp3';

export default function AudioElements({ids}) { 
	/*
		* import audio file for each id
		* create audio element for each id
	*/ 

	// ============================== Constants ============================== //
	const [loadedAudio, setLoadedAudio] = useState({});
	const [finishedLoading, setFinishedLoading] = useState(false);

	// ============================== Helper Fns ============================= //
	async function loadAudio(id) {
		return await import(`./../audio/${id}.mp3`).then(result => {
			return {id: id, src: result.default};
		})
	} 

	function loadAudioFromIds(ids) {
		const promises = ids.map(id => loadAudio(id));
		Promise.all(promises).then((result) => { 
			setLoadedAudio(result)
			setFinishedLoading(true)
		})
	}

	// ============================== Listen / trigger ======================= //
	useEffect(() => {
		loadAudioFromIds(ids)
	}, [])
 	
 	// ============================== Output ================================ //
  return (
  	<div className="audio-element-container"> 
  		{	
  			finishedLoading &&
  			loadedAudio.map(audioObject => { 
  				const {id, src} = audioObject;
  				return <audio src={src} id={id} key={id} preload="true"/>
  			}) 
  		}
  	</div>
  )
}   