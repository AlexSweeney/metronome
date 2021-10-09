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

