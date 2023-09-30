import AppKeyboard from './Classes/AppKeyboard.js';
import Piano from './Classes/Piano.js';
import { XMLNS } from './constants.js';
const appKeyboard = new AppKeyboard(new Piano(), onMessageChange);

function onMessageChange(message) {
  document.getElementById('identification').innerText = message;
}

const svg = document.implementation.createDocument(XMLNS, 'svg', null);
document
  .getElementById('svgRoot')
  .appendChild(appKeyboard.generateGfx(svg.documentElement), true);

/* Midi */

/* if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
} else {
  console.log('WebMIDI is not supported in this browser.');
} */

navigator
  .requestMIDIAccess()
  .then(onMIDISuccess, () => console.log('Could not access gfxPianoMaster'));

function onMIDISuccess(midiAccess) {
  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function getMIDIMessage(midiMessage) {
  /* Av någon anledning bytte4s koden från 144 till 154 vid ett tillfälle. Kolla här om grafik inte svarar på nedtryck */
  //console.log(midiMessage.data[0]);
  if (midiMessage.data[0] === 154 || midiMessage.data[0] === 144) {
    appKeyboard.press(midiMessage.data[1]);
    /* Ska vara med i båda framöver, eventuellt */
    appKeyboard.keyStateChange();
  } else if (midiMessage.data[0] === 138) {
    appKeyboard.release(midiMessage.data[1]);
  }
}
