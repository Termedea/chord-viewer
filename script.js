const appKeyboard = new AppKeyboard(new Piano());
const xmlns = 'http://www.w3.org/2000/svg';
const svg = document.implementation.createDocument(xmlns, 'svg', null);
document.getElementById('svgRoot').appendChild(appKeyboard.generateGfx(svg.documentElement), true);

/* 
for (let i = 0; i < octCount; i++) {
  const gfxOct = document.createElementNS(xmlns, 'g');
  gfxOct.style.transform = `translateX(${octWidth * i}px)`;
  const realOct = i + octStart;
  gfxOct.setAttributeNS(null, 'id', `oct${realOct}`);

  let leftPos = 0;
  let blackCounter = 0;
  
  octave.forEach((key, keyIndex) => {
    const masterKey = pianoMaster.keys[keyIndex + realOct * 12];

    if (key.color === 'white') {
      const whiteKey = document.createElementNS(xmlns, 'rect');

      whiteKey.style.fill = 'white';
      whiteKey.style.stroke = colorBlack;
      

      whiteKey.setAttributeNS(null, 'data-color', 'white');
      whiteKey.setAttributeNS(null, 'x', leftPos);
      whiteKey.setAttributeNS(null, 'y', '0');
      whiteKey.setAttributeNS(null, 'width', white.width * sizeFactor);
      whiteKey.setAttributeNS(null, 'height', white.height * sizeFactor);
      whiteKey.setAttributeNS(null, 'id', masterKey.midiCode);
      whiteKey.setAttributeNS(null, 'data-name', masterKey.name[0]);

      appKeyboard.addKey(new AppKey(masterKey, whiteKey));
      gfxOct.appendChild(whiteKey);
      leftPos += white.width * sizeFactor;
    } else {
      const blackKey = document.createElementNS(xmlns, 'rect');
      blackKey.style.fill = colorBlack;
      blackKey.style.stroke = 'white';

      blackKey.setAttributeNS(null, 'x', black.baseX[blackCounter] * sizeFactor);
      blackKey.setAttributeNS(null, 'y', '0');
      blackKey.setAttributeNS(null, 'width', black.width * sizeFactor);
      blackKey.setAttributeNS(null, 'height', black.height * sizeFactor);
      blackKey.setAttributeNS(null, 'id', masterKey.midiCode);
      blackKey.setAttributeNS(null, 'data-name', masterKey.name[0]);

      appKeyboard.addKey(new AppKey(masterKey, blackKey));
      gfxOct.appendChild(blackKey);
      blackCounter++;
    }
  });
  gfxPiano.appendChild(oct);
} */

/* Midi */

/* if (navigator.requestMIDIAccess) {
  console.log('This browser supports WebMIDI!');
} else {
  console.log('WebMIDI is not supported in this browser.');
} */

navigator.requestMIDIAccess().then(onMIDISuccess, () => console.log('Could not access gfxPianoMaster'));

function onMIDISuccess(midiAccess) {
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
