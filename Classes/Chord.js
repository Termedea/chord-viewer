import { HR } from '../constants.js';
export default class Chord {
  /*   mode = {
    major: {
      root: [0, 4, 7],
      first: [0, 3, 8],
      second: [0, 5, 9]
    },
    minor: {
      root: [0, 3, 7],
      first: [0, 4, 9],
      second: [0, 5, 8]
    }
  }; */

  modes = {
    major: {
      root: [0, 4, 7],
      first: [-8, -5, 0],
      second: [-5, 0, 4]
    },
    minor: {
      root: [0, 3, 7],
      first: [-9, -5, 0],
      second: [-5, 0, 3]
    },
    diminished: {
      root: [0, 3, 6],
      first: [-9, -6, 0],
      second: [-6, 0, 3]
    }
  };

  correct = null;

  /* chords.push(generateRandomChord([octaveIndex], [minor, major], [0,1,2])); */

  // // randomizedChord = C, minor, 0, getAllDown = 60, 63, 67
  /* if(chords.match(randomizedChord, appKeyboard.getAllDown()))  */
  normalizeMIDICodeArray(codes) {
    return codes.map((code) => (code -= codes[0]));
  }

  findChords(keys) {
    const matches = this.getMatches(keys);
    return matches;
  }

  randomizeCorrectChord() {}

  getMatches(keys) {
    const matches = [];
    Object.keys(this.modes).forEach((modeKey) => {
      const mode = this.modes[modeKey];
      Object.keys(mode).forEach((variantKey) => {
        if (this.keysMatchVariant(mode[variantKey], keys)) {
          const rootIndex = this.findRoot(mode[variantKey]);

          const correctVariant = {
            rootKey: keys[rootIndex].master.name,
            mode: modeKey,
            variant: variantKey,
            variantCode: mode[variantKey],
            hrString: `You played: ${keys[rootIndex].master.name.join()} ${HR[modeKey]}, ${HR[variantKey]}`
          };

          matches.push(correctVariant);
        }
      });
    });
    return matches;
  }

  keysMatchVariant(variant, keys) {
    const codes = keys.map((key) => key.master.getMidiCode());
    const intervals = this.normalizeMIDICodeArray(codes);

    if (intervals.length !== variant.length) return false;

    const normalizedVariant = this.normalizeMIDICodeArray(variant);

    for (let i = 0; i < intervals.length; i++) {
      if (intervals[i] !== normalizedVariant[i]) return false;
    }
    return true;
  }

  getCorrectChordVariants() {}

  findRoot(variants) {
    return variants.indexOf(0);
  }
}
