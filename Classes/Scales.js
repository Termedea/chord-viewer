/* Regler



///Definition halvton, helton.
1 = 1 halvton (direkt angränsande, C -> C# eller E -> F)
2 = 2 halvtoner C -> D (kan se ut som direkt angränsande, eftersom de är två vita bredvid varandra med C# (svart tangent) är emellan.)

//// Relation mellan tangenter i olika skalor
Major (dur): 2212221
Minor (moll): 2122122

Dorian: 2122212
Lydian: 2221221
Phrygian: 1222122
Mixolydian: 2212212
Locrian: 1221222

//// Relation mellan tangenter för olika typer av ackord
Dur: 4 halvtoner + 3 halvtoner, 
Moll: 3 halvtoner + 3 halvtoner

//// Namngivning av tangenter (och Ackord)
Varje bokstav en gång,
E Dur:
E   F#  G#  A   B   C#  D#  (E)
  2   2   1   2   2   2   1

Om F# hade hetat Gb hade det blivit 2 G-tangenter och ingen F-tangent. 

////// Ackord som grader i skalan

Ackord byggs av "tillåtna" toner i skalan. Beroende på startposition blir de dur, moll eller diminished. 

C Dur:
Tillåtna toner: 
C   D   E   F   G   A   B   (C)
  2   2   1   2   2   2   1

Grader:
1: Ackord som börjar på C i rotposition. 
2: Ackord som börjar på D i rotposition.
3: Ackord som börjar på E i rotposition.
4: Ackord som börjar på F i rotposition.
5: Ackord som börjar på G i rotposition.
6: Ackord som börjar på A i rotposition.
7: Ackord som börjar på B i rotposition.

Vilken variant ska ackordet som börjar på D (grad 2) vara?
För ett D dur har vi D -> F# (4 halvsteg) -> A (3 halvsteg). 
För ett D moll har vi D -> F (3 halvsteg) -> A (4 halvsteg).
F# är inte tillåtet i C dur-skalan, så grad 2 i C dur ska vara Dm.

Notering: Enligt denna modell blir grad 7 varken moll eller dur, utan diminished (3+3), för att bara innehålla tillåtna toner.

Ackord byggda utifrån respektive rotposition kallas grader i skalan. Dur ackord skrivs med stor rommersk siffra (I, IV, V), moll skrivs med liten (ii, iii, vi). Diminished skrivs med liten romersk siffra och en liten cirkel (vii°)
C dur består alltså av ackorden:
I = C, 
ii = Dm, 
iii = Em, 
IV = F, 
V = G, 
vi = Am, 
vii° = B°

Om vi i stället tar skalan C moll:
C   D   Eb  F   G   Ab  Bb  (C)
  2   1   2   2   1   2   2   

i: Cm, 
ii°: D°,
III: E♭,
iv: Fm,
v: Gm,
VI: A♭,
VII: B♭

*/
import Chord from './Chord.js';
export default class Scales {
  chord = null;
  octave = null;
  constructor(pianoMaster) {
    this.chord = new Chord();
    this.pianoMaster = pianoMaster;
    this.octave = pianoMaster.getOctave();
  }

  scalesDef = {
    major: {
      degrees: [
        { name: 'I', mode: 'major' },
        { name: 'ii', mode: 'minor' },
        { name: 'iii', mode: 'minor' },
        { name: 'IV', mode: 'major' },
        { name: 'V', mode: 'major' },
        { name: 'vi', mode: 'minor' },
        { name: 'vii°', mode: 'diminished' }
      ],
      intervals: [0, 2, 2, 1, 2, 2, 2],
      accIntervals: [0, 2, 4, 5, 7, 9, 11]
    },
    minor: {
      degrees: ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'],
      intervals: [0, 2, 1, 2, 2, 1, 2],
      accIntervals: [0, 2, 4, 5, 7, 9, 11]
    }
  };

  keySign = {};

  findScales(keys) {
    const chord = this.chord.getMatches(keys)[0];
    const { mode } = chord;

    const startKey = chord?.rootKey?.name;

    const startIndex = this.octave.findIndex((key) => key.name === startKey);

    const firstScale = this.getScale(startIndex, mode);
    const fifthScale = this.getScale(startIndex + 7, mode);
    const fourthScale = this.getScale(startIndex + 5, mode);
    this.getKeySignature(firstScale, mode);
    this.getKeySignature(fifthScale, mode);
    this.getKeySignature(fourthScale, mode);
  }

  getScale(startIndex, mode) {
    let currIndex = startIndex;
    const scale = this.scalesDef[mode].intervals.map((interval) => {
      currIndex += interval;

      const octIndex = currIndex % this.octave.length;
      return this.octave[octIndex];
    });

    return scale;
  }

  getKeySignature(scale, mode) {
    this.keySign = scale.map((key, i) => {
      return { name: key.name, degree: this.scalesDef[mode].degrees[i] };
    });
    console.log(this.keySign);
  }

  checkName(scale) {
    const duplicates = Object.values(
      scale.reduce((c, v) => {
        let k = v.name[0];

        c[k] = c[k] || [];
        c[k].push(v);
        return c;
      }, {})
    ).reduce((c, v) => (v.length > 1 ? c.concat(v) : c), []);

    console.log(duplicates);
    const alternatives = duplicates.filter(
      (key) => key.detailedName.length > 1
    );
    console.log(alternatives);
  }
}
