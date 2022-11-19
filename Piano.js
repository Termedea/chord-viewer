class Piano {
  keys = [];

  octave = [
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

  constructor() {
    for (let i = 0; i < 128; i++) {
      const octPos = i % this.octave.length;
      const oct = Math.floor(i / this.octave.length) - 1;
      const currKey = this.octave[octPos];

      this.keys.push(new Key({ ...currKey, oct, midiCode: i }));
    }
  }
}
