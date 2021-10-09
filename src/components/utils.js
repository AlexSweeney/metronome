export function playSound(sound) {
  if(sound) {
    sound.pause()
    sound.currentTime = 0;
    sound.play()
  } 
}

export function stopSound(sound) {
  if(sound) {
    sound.pause()
    sound.currentTime = 0;
  } 
}

/*export function flashColor(target, color, holdTime) { 
	let el = document.getElementById(target); 
	let origColor = el.style.backgroundColor;

	el.style.backgroundColor = color;

	setTimeout(() => {
		el.style.backgroundColor = origColor;
	}, holdTime);
} */