class Chord {
  root = null;

  mode = {
    major: {
      root: [4, 7],
      first: [-8, -5],
      second: [-5, 4]
    },
    minor: {
      root: [3, 7],
      first: [-7, -5],
      second: [-5, 3]
    }
  };
  correct = null;

  /* chords.push(generateRandomChord([octaveIndex], [minor, major], [0,1,2])); */

  // // randomizedChord = C, minor, 0, getAllDown = 60, 63, 67
  /* if(chords.match(randomizedChord, appKeyboard.getAllDown()))  */

  getChord(root, key2, key3) {}
}
