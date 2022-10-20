/*  */
const clav = document.getElementById('clav');

const base = {
  xStart: 0,
  yStart: 0,
  white: {
    width: 50,
    height: 220,
    style:
      'fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:2.77070045;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:0.98009949',
    keys: ['c1', 'd1', 'e1', 'f1', 'g1', 'a1', 'b1', 'c2', 'd2', 'e2', 'f2', 'g2', 'a2', 'b2', 'c3', 'd3', 'e3']
  },
  black: {
    width: 31,
    height: 133,
    gap1: 20,
    gap2: 30,
    style:
      '#000000;fill-opacity:1;stroke:#000000;stroke-width:2.82222223;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1',
    keys: ['db1', 'eb1', 'gb1', 'ab1', 'bb1', 'db2', 'eb2', 'gb2', 'ab2', 'bb2', 'db3', 'eb']
  }
};

const keyId = [
  'c1',
  'db1',
  'd1',
  'eb1',
  'e1',
  'f1',
  'gb1',
  'g1',
  'ab1',
  'a1',
  'bb1',
  'b1',
  'c2',
  'db2',
  'd2',
  'eb2',
  'e2',
  'f2',
  'gb2',
  'g2',
  'ab2',
  'a2',
  'bb2',
  'b2',
  'c3',
  'db3',
  'd3',
  'eb3',
  'e3'
];

keyId.forEach((key) => {
  const type = base.white.keys.includes(key) ? 'white' : 'black';
  rect = `
          <rect
            id="${key}"
            data-type=${type}
            width="${base[type].width}"
            height="${base[type].height}"          
            style="${base[type].style}"
        />
    `;

  clav.insertAdjacentHTML('beforeend', rect);
});

const existingKeys = [...clav.children];

existingKeys.forEach((key, i) => {
  const prevKey = key.previousElementSibling;

  console.log(prevKey?.getAttribute('data-type'));
});

/* keys.black.instances.forEach((key, i) => {
  const rect = `
        <rect
          id="${key}"
          width="${keys.black.width}"
          height="${keys.black.height}"          
          style="${keys.black.style}"
      />
  `;

  clav.insertAdjacentHTML('beforeend', rect);
  const newRect = document.getElementById(key);
  console.log(newRect);
  console.log(newRect.previousElementSibling);
  /* newRect.setAttribute('x', newRect.previousElementSibling.x + keys.white.width / 2); 
});*/
