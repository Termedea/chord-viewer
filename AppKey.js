class AppKey {
  gfxKey = null;
  master = null;
  state = 'up';
  baseColor = '';
  activeColor = 'rgb(86, 55, 133)';
  next = null;
  prev = null;

  constructor(master) {
    this.master = master;

    if (master.color === 'white') {
      this.baseColor = '#ffffff';
    } else {
      this.baseColor = 'rgb(58, 56, 69)';
    }
  }
  setPrevious() {}
  setNext() {}

  step(n) {
    let key = this;
    for (let i = 0; i < n; i++) {
      key = key.next;
    }
    return key;
  }

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
    return this;
  }

  release() {
    this.state = 'up';
    this.gfxKey.style.fill = this.baseColor;
    return this;
  }

  highlight() {}
}
