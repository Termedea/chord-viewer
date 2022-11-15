const sizeFactor = 2;
const octCount = 2;
const octStart = 4;

const white = {
  width: 23,
  height: 120,
  count: 7,
  id: ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  code: [0, 2, 4, 5, 7, 9, 11]
};
const black = {
  width: 13,
  height: 80,
  count: 5,
  baseX: [14.33333, 41.66666, 82.25, 108.25, 134.75],
  id: ['dFlat', 'eFlat', 'gFlat', 'aFlat', 'bFlat'],
  code: [1, 3, 6, 8, 10]
};

const xmlns = 'http://www.w3.org/2000/svg';

const svg = document.implementation.createDocument(xmlns, 'svg', null);
const piano = svg.documentElement;

const colorBlack = 'rgb(58, 56, 69)';
const colorBlue = 'rgb(86, 55, 133)';

const octWidth = white.width * white.count * sizeFactor;
piano.setAttribute('width', `${octWidth * octCount}px`);
piano.setAttribute('height', `${white.height * sizeFactor}px`);
piano.setAttribute('xml:space', 'preserve');

for (let i = 0; i < octCount; i++) {
  const oct = document.createElementNS(xmlns, 'g');
  oct.style.transform = `translateX(${octWidth * i}px)`;
  const realOct = i + octStart;
  oct.setAttributeNS(null, 'id', `oct${realOct}`);

  for (let wI = 0; wI < white.count; wI++) {
    const whiteKey = document.createElementNS(xmlns, 'rect');
    whiteKey.style.fill = 'white';
    whiteKey.style.stroke = colorBlack;
    whiteKey.setAttributeNS(null, 'data-key', `${white.id[wI]}-${realOct}`);
    whiteKey.setAttributeNS(null, 'data-color', 'white');
    whiteKey.setAttributeNS(null, 'x', wI * white.width * sizeFactor);
    whiteKey.setAttributeNS(null, 'y', '0');
    whiteKey.setAttributeNS(null, 'width', white.width * sizeFactor);
    whiteKey.setAttributeNS(null, 'height', white.height * sizeFactor);
    whiteKey.setAttributeNS(null, 'id', white.code[wI] + 12 * realOct);

    oct.appendChild(whiteKey);
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
  }

  piano.appendChild(oct);
}
document.getElementById('svgRoot').appendChild(piano, true);

/* Midi */

if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
} else {
  console.log('WebMIDI is not supported in this browser.');
}

navigator.requestMIDIAccess().then(onMIDISuccess, () => console.log('Could not access keyboard'));

function onMIDISuccess(midiAccess) {
  console.log(midiAccess);

  for (var input of midiAccess.inputs.values()) {
    input.onmidimessage = getMIDIMessage;
  }
}

function getMIDIMessage(midiMessage) {
  const currKey = document.getElementById(midiMessage.data[1]);
  if (midiMessage.data[0] === 144) {
    console.log(currKey.getAttributeNS(null, 'data-key'));
    currKey.style.fill = colorBlue;
  } else {
    currKey.style.fill = 'white';
  }
}
