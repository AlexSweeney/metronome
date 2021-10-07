import React, {useEffect} from 'react';

export default function AudioElements({ids}) { 
	/*
		* import audio file for each id
		* create audio element for each id
	*/
	
	function importElements(ids) {
		ids.forEach(id => import(`./../audio/${id}.mp3`))
	} 

	useEffect(() => {
		importElements(ids) 
	}, [])

  return (
  	<div className="audio-element-container">
  		{ids.map(id => <audio src={id} id={id}/>)}
  	</div>
  )
}