/* Regler

//// Relation mellan tangenter i olika skalor
1 = 1 halvton (direkt angränsande, C -> C# eller E -> F)
2 = 2 halvtoner (till synes direkt angränsande, t.ex. C -> D. C# är egentligen emellan, så C -> D är 2 halvtoner)

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

export default class Scales {
  constructor(variant) {
    console.log(variant);
  }
}
