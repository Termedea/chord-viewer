import AppKey from './AppKey.js';
import Chord from './Chord.js';
import { XMLNS } from './constants.js';

export default class AppKeyboard {
  sizeFactor = 2;
  octCount = 2;
  octStart = 4;
  keys = [];

  white = {
    width: 23,
    height: 120
  };

  black = {
    width: 13,
    height: 80,
    baseX: [14.33333, 41.66666, 82.25, 108.25, 134.75]
  };

  pianoMaster = null;
  chords;
  changeMessage;

  constructor(pianoMaster, changeMessage) {
    this.pianoMaster = pianoMaster;
    this.chord = new Chord();
    this.changeMessage = changeMessage;

    const octLength = this.pianoMaster.octave.length;

    let prev = null;

    for (let i = this.octStart * octLength; i < (this.octStart + this.octCount) * octLength; i++) {
      const current = new AppKey(this.pianoMaster.keys[i]);
      current.prev = prev;
      prev && (prev.next = current);
      this.keys.push(current);
      prev = current;
      current.next = null;
    }
  }

  generateGfx(gfxPiano) {
    const octWidth = this.white.width * 7 * this.sizeFactor;

    gfxPiano.setAttribute('width', `${octWidth * this.octCount}px`);
    gfxPiano.setAttribute('height', `${this.white.height * this.sizeFactor}px`);
    gfxPiano.setAttribute('xml:space', 'preserve');

    for (let i = 0; i < this.octCount; i++) {
      gfxPiano.appendChild(this.generateOctGfx(i, octWidth));
    }
    return gfxPiano;
  }

  generateOctGfx(octIndex, octWidth) {
    const gfxOct = document.createElementNS(XMLNS, 'g');
    gfxOct.setAttributeNS(null, 'id', `oct${octIndex + this.octStart}`);
    gfxOct.style.transform = `translateX(${octWidth * octIndex}px)`;

    let leftPos = 0;
    let blackCounter = 0;

    for (let i = 0; i < this.pianoMaster.octave.length; i++) {
      const currentKey = this.keys[i + octIndex * 12];

      const pos = { x: 0, y: 0 };
      let size = { width: 0, height: 0 };

      if (currentKey.master.color === 'white') {
        size = this.white;
        pos.x = leftPos;
        leftPos += size.width * this.sizeFactor;
        currentKey.generateGfx(pos, { width: size.width * this.sizeFactor, height: size.height * this.sizeFactor });
        gfxOct.prepend(currentKey.getGfxKey());
      } else {
        size = this.black;
        pos.x = this.black.baseX[blackCounter] * this.sizeFactor;
        blackCounter++;
        currentKey.generateGfx(pos, { width: size.width * this.sizeFactor, height: size.height * this.sizeFactor });
        gfxOct.append(currentKey.getGfxKey());
      }
    }

    return gfxOct;
  }

  press = (code) => {
    const currKey = this.getKeyByMIDICode(code);
    if (currKey) currKey.press();
  };

  release = (code) => {
    const currKey = this.getKeyByMIDICode(code);
    if (currKey) currKey.release();
  };

  getAllPressed() {
    return this.keys.filter((key) => key.state === 'down');
  }

  keyStateChange() {
    const matches = this.chord.findChords(this.getAllPressed());
    if (matches.length > 0) {
      this.changeMessage(matches.map((chord) => chord.hrString).join('\n'));
    }
  }

  getMIDICodesByKeys(keys) {
    return keys.map((key) => key.master.getMidiCode());
  }

  getKeyByMIDICode(code) {
    return this.keys.filter((key) => key.master.getMidiCode() === code)[0] || null;
  }
}
