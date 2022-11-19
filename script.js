const sizeFactor = 2;
const octCount = 2;
const octStart = 4;
const colorBlack = 'rgb(58, 56, 69)';
const colorBlue = 'rgb(86, 55, 133)';

class AppKey {
  masterKey = null;
  svgKey = null;
  state = 'up';
  midiCode = 0;
  color = '';
  activeColor = '';

  constructor(masterKey, svgKey) {
    this.masterKey = masterKey;
    this.svgKey = svgKey;

    if (masterKey.color === 'white') {
      this.color = 'white';
      this.activeColor = '#ff33cc';
    } else {
      this.color = 'black';
      this.activeColor = 'yellow';
    }
  }
  press() {
    this.state = 'down';
    this.svgKey.style.fill = this.activeColor;
  }
  release() {
    this.state = 'up';
    this.svgKey.style.fill = this.color;
  }
}

class AppKeyboard {
  octCount = 2;
  octStart = 4;
  keys = [];

  press = (code) => {
    this.getKeyByMIDICode(code).press();
  };
  release = (code) => {
    this.getKeyByMIDICode(code).release();
  };

  addKey = (key) => {
    this.keys.push(key);
  };
  getKeyByMIDICode(code) {
    return this.keys.filter((key) => key.masterKey.getMidiCode() === code)[0];
  }
}

const appKeyboard = new AppKeyboard();

/* const appKeyboard = {
  octCount: 2,
  octStart: 4,
  keys: [],
  push: (i) => {
    console.log(this);
  },
  release: () => {}
}; */
const pianoMaster = { min: 0, max: 0, keys: [] };

const octave = [
  { name: ['bsharp', 'c'], color: 'white' },
  { name: ['csharp', 'dflat'], color: 'black' },
  { name: ['d'], color: 'white' },
  { name: ['dsharp', 'eflat'], color: 'black' },
  { name: ['e', 'fflat'], color: 'white' },
  { name: ['esharp', 'f'], color: 'white' },
  { name: ['gflat'], color: 'black' },
  { name: ['g'], color: 'white' },
  { name: ['aflat'], color: 'black' },
  { name: ['a'], color: 'white' },
  { name: ['bflat'], color: 'black' },
  { name: ['b'], color: 'white' }
];

for (let i = 0; i < 128; i++) {
  const octPos = i % octave.length;
  const oct = Math.floor(i / octave.length) - 1;
  const currKey = octave[octPos];
  pianoMaster.keys.push(new Key({ ...currKey, oct, midiCode: i }));
}

/* Old code below */

/* pure graphics objects, rename later */
const white = {
  width: 23,
  height: 120
};

const black = {
  width: 13,
  height: 80,
  baseX: [14.33333, 41.66666, 82.25, 108.25, 134.75]
};

/* g 7 + (12 * oct) */

function getNextHalfStepByName() {}
function getPrevHalfStepByName() {}

const xmlns = 'http://www.w3.org/2000/svg';

const svg = document.implementation.createDocument(xmlns, 'svg', null);
const gfxPiano = svg.documentElement;

const octWidth = white.width * 7 * sizeFactor;

gfxPiano.setAttribute('width', `${octWidth * octCount}px`);
gfxPiano.setAttribute('height', `${white.height * sizeFactor}px`);
gfxPiano.setAttribute('xml:space', 'preserve');

for (let i = 0; i < octCount; i++) {
  const oct = document.createElementNS(xmlns, 'g');
  oct.style.transform = `translateX(${octWidth * i}px)`;
  const realOct = i + octStart;
  oct.setAttributeNS(null, 'id', `oct${realOct}`);

  let leftPos = 0;
  /* 0-11 */
  octave.forEach((key, keyIndex) => {
    const masterKey = pianoMaster.keys[keyIndex + realOct * 12];

    if (key.color === 'white') {
      const whiteKey = document.createElementNS(xmlns, 'rect');
      whiteKey.style.fill = 'white';
      whiteKey.style.stroke = colorBlack;
      /* whiteKey.setAttributeNS(null, 'data-key', `${white.id[wI]}-${realOct}`); */
      whiteKey.setAttributeNS(null, 'data-color', 'white');
      whiteKey.setAttributeNS(null, 'x', leftPos);
      whiteKey.setAttributeNS(null, 'y', '0');
      whiteKey.setAttributeNS(null, 'width', white.width * sizeFactor);
      whiteKey.setAttributeNS(null, 'height', white.height * sizeFactor);
      whiteKey.setAttributeNS(null, 'id', masterKey.midiCode);
      whiteKey.setAttributeNS(null, 'data-name', masterKey.name[0]);

      oct.appendChild(whiteKey);

      appKeyboard.addKey(new AppKey(masterKey, whiteKey));
      leftPos += white.width * sizeFactor;
    } else {
    }
  });

  /* for (let wI = 0; wI < white.count; wI++) {

  }

  for (let bI = 0; bI < black.count; bI++) {
    const blackKey = document.createElementNS(xmlns, 'rect');
    blackKey.style.fill = colorBlack;
    blackKey.style.stroke = 'white';
    blackKey.setAttributeNS(null, 'data-key', `${black.code[bI]}-${realOct}`);
    blackKey.setAttributeNS(null, 'x', black.baseX[bI] * sizeFactor);
    blackKey.setAttributeNS(null, 'y', '0');
    blackKey.setAttributeNS(null, 'width', black.width * sizeFactor);
    blackKey.setAttributeNS(null, 'height', black.height * sizeFactor);
    blackKey.setAttributeNS(null, 'id', black.code[bI] + 12 * realOct);

    oct.appendChild(blackKey);
  } */

  gfxPiano.appendChild(oct);
}
console.log(appKeyboard);
document.getElementById('svgRoot').appendChild(gfxPiano, true);

/* Midi */

if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
} else {
  console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess().then(onMIDISuccess, () => console.log('Could not access gfxPianoMaster'));

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);

  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function getMIDIMessage(midiMessage) {
  if (midiMessage.data[0] === 144) {
    appKeyboard.press(midiMessage.data[1]);
  } else {
    appKeyboard.release(midiMessage.data[1]);
  }
}
