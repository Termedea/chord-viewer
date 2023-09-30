import Key from './Key.js';
export default class Piano {
  keys = [];

  octave = [
    {
      name: 'C',
      detailedName: ['B♯', 'C'],
      color: 'white'
    },
    {
      name: 'D♭',
      detailedName: ['C♯', 'D♭'],
      color: 'black'
    },
    {
      name: 'D',
      detailedName: ['D'],
      color: 'white'
    },
    {
      name: 'E♭',
      detailedName: ['D♯', 'E♭'],
      color: 'black'
    },
    {
      name: 'E',
      detailedName: ['E', 'F♭'],
      color: 'white'
    },
    {
      name: 'F',
      detailedName: ['E♯', 'F'],
      color: 'white'
    },
    {
      name: 'G♭',
      detailedName: ['G♭', 'F♯'],
      color: 'black'
    },
    {
      name: 'G',
      detailedName: ['G'],
      color: 'white'
    },
    {
      name: 'A♭',
      detailedName: ['A♭', 'G♯'],
      color: 'black'
    },
    {
      name: 'A',
      detailedName: ['A'],
      color: 'white'
    },
    {
      name: 'B♭',
      detailedName: ['B♭', 'A♯'],
      color: 'black'
    },
    {
      name: 'B',
      detailedName: ['B', 'C♭'],
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
  getOctave() {
    return this.octave;
  }
}
