import Key from './Key.js';
export default class Piano {
  keys = [];
  octave = [
    {
      name: ['C'],
      fullName: ['bsharp', 'c'],
      color: 'white'
    },
    {
      name: ['D♭'],
      fullName: ['csharp', 'dflat'],
      color: 'black'
    },
    {
      name: ['D'],
      fullName: ['d'],
      color: 'white'
    },
    {
      name: ['E♭'],
      fullName: ['dsharp', 'eflat'],
      color: 'black'
    },
    {
      name: ['E'],
      fullName: ['e', 'fflat'],
      color: 'white'
    },
    {
      name: ['F'],
      fullName: ['esharp', 'f'],
      color: 'white'
    },
    {
      name: ['G♭'],
      fullName: ['gflat', 'fsharp'],
      color: 'black'
    },
    {
      name: ['G'],
      fullName: ['g'],
      color: 'white'
    },
    {
      name: ['A♭'],
      fullName: ['aflat', 'gsharp'],
      color: 'black'
    },
    {
      name: ['A'],
      fullName: ['a'],
      color: 'white'
    },
    {
      name: ['B♭'],
      fullName: ['bflat', 'asharp'],
      color: 'black'
    },
    {
      name: ['B'],
      fullName: ['b', 'cflat'],
      color: 'white'
    }
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
