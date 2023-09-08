/* Regler

//// Relation mellan tangenter i olika skalor
1 = 1 halvton
2 = 2 halvtoner
Major: 2212221
Minor: 2122122

Dorian: 2122212
Lydian: 2221221
Phrygian: 1222122
Mixolydian: 2212212
Locrian: 1221222


//// Namngivning av tangenter (och Ackord)
Varje bokstav en gång,
E Dur:
E F# G# A B C# D# E
2 2 1 2 2 2 1

Om F# hade hetat Gb hade det blivit 2 G-tangenter och ingen F-tangent. 

////// Ackord som grader i skalan

Ackord byggs av "tillåtna" toner i skalan. Beroende på startposition blir de dur, moll eller diminished. 

C Dur:
Tillåtna toner: 
C D E F G A B
2 2 1 2 2 2 1

I: Ackord som börjar på C i rotposition. 
ii: Ackord som börjar på D i rotposition.
iii: Ackord som börjar på E i rotposition.
IV: Ackord som börjar på F i rotposition.
V: Ackord som börjar på G i rotposition.
vi: Ackord som börjar på A i rotposition.
vii°: Ackord som börjar på B i rotposition.

Vilken variant ska ackordet som börjar på D vara?
För ett D dur har vi D (1) F# (4 halvsteg) A (3 halvsteg). 
För ett D moll har vi D(1) F (3 halvsteg) A (3 halvsteg).
F# är inte tillåtet i C dur-skalan, så grad 2 i C dur ska vara Dm.

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
C D Eb F G Ab Bb C
2 1 2 2 1 2 2 1

i: Cm, 
ii°: D°,
III: E♭,
iv: Fm,
v: Gm,
VI: A♭,
VII: B♭

*/

export default class Scales {
  constructor(variant) {
    console.log(variant);
  }
}
