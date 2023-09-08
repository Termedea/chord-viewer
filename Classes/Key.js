export default class Key {
  name = '';
  fullName = [];
  midiCode = 0;
  octIdx = 0;
  color = '';
  prev = null;
  next = null;

  constructor(key) {
    this.name = key.name;
    this.fullName = key.fullName;
    this.midiCode = key.midiCode;
    this.octIdx = key.oct;
    this.color = key.color;
  }
  getMidiCode() {
    return this.midiCode;
  }
}
