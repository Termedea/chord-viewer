class AppKey {
  gfxKey = null;
  master = null;
  state = 'up';
  baseColor = '';
  activeColor = '';
  next = null;
  prev = null;

  constructor(master, next, prev) {
    this.master = master;

    if (master.color === 'white') {
      this.baseColor = '#ffffff';
      this.activeColor = 'rgb(86, 55, 133)';
    } else {
      this.baseColor = 'rgb(58, 56, 69)';
      this.activeColor = '#ffff00';
    }
  }
  setPrevious() {}
  setNext() {}
  generateGfx(pos, size) {
    const key = document.createElementNS(xmlns, 'rect');
    key.style.fill = this.baseColor;
    key.style.stroke = '#000000';
    key.setAttributeNS(null, 'y', '0');

    key.setAttributeNS(null, 'x', pos.x);
    key.setAttributeNS(null, 'width', size.width);
    key.setAttributeNS(null, 'height', size.height);
    key.setAttributeNS(null, 'id', this.master.midiCode);
    key.setAttributeNS(null, 'data-name', this.master.name[0]);
    this.gfxKey = key;
  }

  getColor() {
    return this.color;
  }

  getGfxKey() {
    return this.gfxKey;
  }

  press() {
    this.state = 'down';
    this.gfxKey.style.fill = this.activeColor;
  }

  release() {
    this.state = 'up';
    this.gfxKey.style.fill = this.baseColor;
  }

  highlight() {}
}
