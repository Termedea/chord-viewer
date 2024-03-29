export default class Key {
  name = '';
  detailedName = '';
  midiCode = 0;
  octIdx = 0;
  color = '';
  prev = null;
  next = null;

  constructor(key) {
    this.name = key.name;
    this.detailedName = key.detailedName;
    this.midiCode = key.midiCode;
    this.octIdx = key.oct;
    this.color = key.color;
  }
  getMidiCode() {
    return this.midiCode;
  }
}
