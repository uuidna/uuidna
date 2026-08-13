# The formal layer, organized by computing principle

<!-- GENERATED from lean/*.lean by scripts/lean-ledger — DO NOT EDIT. Counts are derived; edit titles/blurbs in the PRINCIPLE metadata. -->

Every theorem below is proven `by decide` in Lean, verified sorry-free by `npm run lean` — **1120 theorems** in
derivation order. A theorem computes in Lean, or it is not a theorem.

1. **The 8×8 core** — `lean/Core.lean` · **64** theorems
   the multiplication table of ℤ/9's eight non-zero residues — from these 64 the rest computes

2. **The ring ℤ/9** — `lean/Ring.lean` · **234** theorems
   the vortex ring: its full multiplication, addition and power tables

3. **The rosette ℤ/7** — `lean/Rosette.lean` · **148** theorems
   the Pliska group: its full multiplication, addition and power tables

4. **The vortex algebra** — `lean/Uuidna.lean` · **15** theorems
   units, orbit, involution, gravity, division by zero, light — the foundational facts

5. **Ported from millennium-solutions** — `lean/Vortex.lean` · **16** theorems
   the honest ℤ/9 & ℤ/7 facts, ported to plain Lean (no Mathlib)

6. **The sequence & reflection group** — `lean/Sequence.lean` · **19** theorems
   the mirror, AGL(1,ℤ/9)=54, one strip, neighbours, the ± polarities, the crypt salt

7. **Division by zero** — `lean/DivByZero.lean` · **7** theorems
   the reflection dz(x)=10−x — a finite residue, never infinity

8. **Applied structure — the science pairs** — `lean/BioPhysics.lean` · **16** theorems
   blood, DNA, sound, chemistry, music, acid-base, heredity, colour — the algebra, demarcated

9. **Self-discovered** — `lean/Discover.lean` · **14** theorems
   facts derived by function: Lagrange, the unit criterion, idempotents

10. **The quantum computer** — `lean/Quantum.lean` · **42** theorems
   the exact facts the classical state-vector simulator computes — Born rule, no-signaling, GHZ, gate truth-tables, phase algebra; simulation, not hardware

11. **The seven reflected** — `lean/Clay.lean` · **11** theorems
   the seven Clay problems reflected into the ℤ/9 structure and solved none — a bijection that relabels, it does not propagate proofs; it reflects all seven and solves none

12. **The legal vocabulary** — `lean/Legal.lean` · **6** theorems
   the trial's legal terms as decidable facts — PROVEN (admitted, stays), REFUTED (a recomputable contradiction), NOT PROVEN (dismissed without prejudice), REMAND (to development trial): only the proven is admitted, every non-proven is remanded (nothing discarded), and the non-justiciable is never refuted (you cannot refute what has no decidable test)

13. **The physics infinities, made finite** — `lean/Infinity.lean` · **9** theorems
   the nasty divergences of physics — UV catastrophe, self-energy, the Landau pole, 1+2+3+…, the derivative 0/0, δ(0), the horizon, the 1/r singularity — each the finite object physics puts where the naive infinity was, exactly as dz(x)=10−x replaces x/0

14. **The cipher & the strand** — `lean/Cipher.lean` · **11** theorems
   crypto ∩ DNA, honest by construction — base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR (why a step must rotate), a linear fold is malleable (a receipt is integrity, not a seal), the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but linear, and Grover only halves the key (256→128, not a break) — the shared algebra and its honest limits

15. **The detectors, proven** — `lean/Audit.lean` · **6** theorems
   the provenance gate as decidable logic — flag(h,d,b)=h·(1−d)·(1−b): hollow prose is flagged only when neither demarcated nor backed by a sealed theorem, a demarcation clears it, a backing clears it, and of the eight states exactly one fires — the honesty detector, itself a theorem set

16. **The audit game** — `lean/AuditGame.lean` · **11** theorems
   why an audit is more ACCURATE framed as a game, sealed by decide — a finding is FLAGGED iff some independent refuter has a winning move (the OR), a claim is CLEAN iff none does (a P-position, the same Nim/Bouton decidability as a zero nim-sum), the verdict is exactly one of the two (survive + flag = 1), and N independent refuters are strictly more accurate: adding a refuter is monotone (never un-flags), a 3-vote panel confirms on a majority (4 of the 8 profiles), and a unanimous acquittal is the product of clears ∏(1−rᵢ); the honesty gate drains only the hollow-and-unbacked citation (1 of 4 states, echoing the detectors); and the game is finite (2ⁿ outcomes) so its value is decidable. HONEST SCOPE: the DECISION is decidable but the COVERAGE is not — the refutation lexicon is incomplete, so an audit raises the cost of a false claim surviving, never zeroing it. A floor, not a wall — the same bound Security proves

17. **The two coins & the 64** — `lean/Coins.lean` · **10** theorems
   the honest billing/measure algebra — the two coins are the conserved fair-exchange invariant (110−108 = 2 = −χ of the double torus, genus 2), 64 = 2⁶ is the bit measure, contribute 2 to save up to 64 (leverage 32), n qubits give 2ⁿ direct outcomes reaching 64 at n=6, and the measured saving never goes negative — a measured unit of work saved, not a price and not a claim of speed

18. **The hardware-verifiable binary algebra** — `lean/Hardware.lean` · **14** theorems
   the low-level combinational-logic identities every digital circuit is built from, each a decidable axiom-free `by decide` particle: the four gate truth tables as bit arithmetic (NOT a = 1−a, AND = a·b, OR = a+b−a·b, XOR = the axiom-free lxor), XOR = ℤ/2 parity, Boolean closure on the bit, NAND functional completeness (NAND rebuilds NOT/AND/OR — why chips are one repeated gate), De Morgan, the half- and full-adder (sum + 2·carry = the input sum), and the 2:1 multiplexer. All match the live published digital-logic spec. HONEST SCOPE: integrity, not truth — uuidna SEALS the spec a netlist is verified AGAINST; it does not fabricate a device, synthesise a netlist, or develop silicon. A sealed spec, not a chip

19. **The software-verifiable algebra** — `lean/Software.lean` · **11** theorems
   the algebraic correctness LAWS a program is verified against, one level up from the hardware layer, each a decidable axiom-free `by decide` particle: losslessness (split-and-recompose is the identity — serialisation loses nothing), structure preservation (map keeps length, filter never grows, append adds), idempotent normalisation, a TOTAL guarded division (no divide-by-zero crash), bounded termination (a shift loop halts), order-invariant reduction (safe to parallelise), the compare-swap that orders (every sort's basis), total safe indexing (no over-read), and reversibility (undo of undo is the identity). HONEST SCOPE: integrity, not truth — uuidna SEALS the spec an implementation is verified AGAINST; it does not write, compile, or run your program, nor prove an arbitrary program correct. A sealed spec, not the program

20. **The OS-integrity algebra** — `lean/Os.lean` · **7** theorems
   the decidable facts a DEPLOYMENT is verified against, completing hardware → software → os, each an axiom-free `by decide` particle: exact-copy verification IS byte-equality, so a single-byte tamper, a truncation, or a REORDERING breaks the match (a provenance is a SEQUENCE, not a set); the SHA-256 digest is a fixed 256 bits, the content-address a fixed 128; and the non-determinism boundary is EXACTLY the two named modules (src/quantum/os, src/quantum/drivers). The runtime side (Alpine + driver provenance, portAllAlpine over the whole arch matrix) enforces it against real bytes with uuidna's own pure-TS SHA-256. HONEST SCOPE: integrity, not truth, and NOT execution — uuidna seals what an exact-copy verification decides; it does not boot, port the runtime, link, or run an operating system. A sealed integrity spec, not a booted OS

21. **The exploit folds** — `lean/Exploits.lean` · **13** theorems
   known public exploit CLASSES folded through uuidna's involution, the CVE/CWE codes kept INLINE IN LEAN so the audit computes itself from the ledger — a FOLDED class (fold_*) encodes its code as a decidable fact and cites a sealed defence (Trojan-Source→strip 9 BIDI points, prototype-pollution→drop 3 poison keys, supply-chain→zero runtime deps, DoS→sanitiser bounds, weak-hash→SHA-256 seats, tampering→content-address+merkle, code-injection→no eval, weak-RNG→determinism hard-reject), and an OUT-OF-SCOPE class (oos_*) folds to the VOID (compromised host, deceived human, physical side-channel, FNV-as-secret misuse, non-decidable correctness). HONEST SCOPE: uuidna does NOT solve all hacks — both problem and solution are verified, and the boundary is named, never falsely marked solved

22. **The sanitise standards** — `lean/Sanitize.lean` · **7** theorems
   the engine's one input→output guard with its rules kept IN THE THEOREMS — MAX_DEPTH = 32 = 2⁵, MAX_STRING = 10⁶, arrays and object keys bounded to 10⁵, the three prototype-pollution poison keys (__proto__, constructor, prototype) dropped, and the nine Trojan-Source BIDI code points (five overrides U+202A..202E + four isolates U+2066..2069) stripped — process any input, sanitise any output by all standards, the rule sent by the theorems themselves so a code constant cannot drift from its sealed value

23. **The Platonic solids in every dimension** — `lean/Solids.lean` · **12** theorems
   the five regular solids and the regular polytopes of every dimension, sealed to green: Euler V−E+F = 2 for all five (the dodecahedron's 2 IS the two captain coins), the dodecahedron is twelve pentagons (the twelve the monographs computed themselves into) dual to the icosahedron's twenty triangles, the tetrahedron self-dual, three pentagons closing each vertex by the angle defect 3·108° < 360° < 4·108°, and the per-dimension census [5,6,3,3,3] for dimensions 3..7 — five in 3D, six in 4D, exactly three in every dimension ≥5 including the 7th (simplex, hypercube, orthoplex). Integrity, not truth: each theorem seals its exact decidable arithmetic

24. **The algebra of the neuron** — `lean/Neuro.lean` · **9** theorems
   neuroscience, demarcated — all-or-none firing as a threshold step, sub-threshold silence, supra-threshold spike, monotone firing, spatial summation (two sub-threshold inputs sum to fire), the excitatory−inhibitory net drive, the −70→+40 mV action potential (rest < threshold < peak), Hebbian coincidence (Δw = pre·post), and the refractory cap — the textbook model as decidable algebra, not clinical and not about any individual

25. **Propulsion — Newtonian & bounded** — `lean/Propulsion.lean` · **5** theorems
   thrust is conserved momentum (Newton's third law), it REQUIRES reaction mass (zero exhaust → zero thrust: no reactionless/free drive), thrust = ṁ·vₑ, the Δv budget adds across stages, and acceleration a = F/m is finite — no infinite g. The algebra of rocketry, demarcated: not a novel drive, not FTL, not infinite g

26. **Navigation — bounded geometry** — `lean/Navigation.lean` · **5** theorems
   straight-line distance is Pythagorean (3-4-5), the compass rose is ℤ/8 (eight 45° headings), the reciprocal bearing is +4 (an involution), a quarter turn is +2 (order 4), and dead reckoning is the vector sum of the legs — classical navigation as decidable algebra, not GPS-grade guidance and not a positioning claim about anyone

27. **The lay of the land** — `lean/Topography.lean` · **13** theorems
   topography as decidable arithmetic, the map beneath navigation — a contour joins points of equal height and every fifth line is the heavy index contour (multiples of 50 m at a 10 m interval), so elevation is read by COUNTING rings (5 × 20 = 100 m of ascent); gradient is rise over run (a 1-in-20 slope climbs 5 m in 100), contour spacing is its inverse (a steep 1-in-5 crowds the lines to 50 m, a gentle 1-in-10 spreads them to 100), and the slope distance is Pythagorean (a 400 m run up 300 m walks 500 m, longer than the map's flat shadow); scale is a pure ratio (1:25000 → 1 cm is 250 m, 4 cm a kilometre); a grid reference nests by tens (each 100 m square split ten ways to 10 m); a back-bearing is the forward turned 180° about the compass in ℤ/360; relief is the highest spot height less the lowest; Gunter's chain measures the mile and the acre whole (80 × 66 = 5280 ft, 22 × 220 = 4840 sq yd); triangulation rests on the 180° triangle; and a cross-section's vertical exaggeration stretches the slopes (500/100 = 5-fold). HONEST SCOPE: the arithmetic of the map — exact ratios, counts and cycles — NOT a survey, a GPS fix, or a route plan; the ledger seals only exact rational facts (the 3-4-5 slope triple, not a general hillside's irrational length), and Naismith's walking time is a rule-of-thumb ESTIMATE, demarcated and never staked on for safety

28. **Command authentication** — `lean/Command.lean` · **7** theorems
   the auth gate as decidable logic — a command is accepted iff it is signed AND its tag verifies (accept = signed·verifies): unsigned rejected, a failing/tampered tag rejected, exactly one tag verifies, tampering changes the tag, and a LINEAR tag is forgeable (why the real MAC is HMAC-SHA256, KAT-verified, not this model) — the gate logic proven, the strength demarcated

29. **The fixed stars** — `lean/Astronomy.lean` · **7** theorems
   positional astronomy as decidable arithmetic — the celestial sphere is 360° (15°/hour × 24; the ecliptic 12 × 30°), sexagesimal gives 3600 arcsec/degree, Kepler's harmonic law T²=a³ holds in scaled units, the Metonic cycle is 19 years = 235 synodic months, the classical great year precesses 72 years/degree (25920), and declination spans 180° pole to pole — the fixed references of the sky, exact ratios and cycles, demarcated (some classical approximations, not cosmological claims)

30. **Diving — trimix gas laws** — `lean/Diving.lean` · **8** theorems
   the decidable arithmetic of trimix diving, demarcated — a mix sums to 100%, absolute pressure is 1+depth/10 atm, Dalton makes partial pressures sum to it, air leaves the oxygen window at depth (why trimix), gases blend by partial pressure, helium is non-narcotic, and a direct ascent exceeding the Haldane ratio needs a stop. HARD SAFETY SCOPE: arithmetic only, NEVER a dive plan — use training, tables, and a computer

31. **The light domain** — `lean/Optics.lean` · **8** theorems
   geometric optics as decidable arithmetic, demarcated — reflection is an involution (angle in = angle out), the refractive index n=c/v ≥ 1 so light in a medium is slower than c (no FTL), Snell's law n₁sinθ₁=n₂sinθ₂ holds in a consistent case (4·3=3·4), the thin-lens equation 1/f=1/do+1/di and its magnification are exact, dispersion refracts blue more than red, and total internal reflection needs a denser source — the light domain, consistent cases, not a full wave-optics derivation

32. **The sound domain** — `lean/Acoustics.lean` · **8** theorems
   acoustics as decidable arithmetic, demarcated — the harmonic series stacks integer multiples of the fundamental, the wave speed is v=f·λ, sound (343 m/s) is far slower than light, the decibel is logarithmic (10 dB = ×10 intensity), two tones beat at their difference, the Doppler shift raises pitch on approach and lowers it on recession, a closed pipe sounds only odd harmonics, and intensity falls as the inverse square of distance — the sound domain, exact ratios, distinct from the music/432 ladder in BioPhysics

33. **The reactions domain** — `lean/Chemistry.lean` · **8** theorems
   chemical reactions as decidable arithmetic, demarcated — a balanced equation conserves atoms (Haber, combustion), a neutral compound conserves charge (Al₂O₃), oxidation states sum to the molecular charge, pH+pOH=14 at 25°C, Boyle's law keeps P·V constant, neutralization pairs H⁺ with OH⁻, and stoichiometry scales linearly — reaction bookkeeping, not thermodynamics, distinct from the electron-shell chemistry in BioPhysics

34. **The energy domain** — `lean/Thermodynamics.lean` · **8** theorems
   thermodynamics as decidable arithmetic, demarcated — the first law conserves energy (ΔU=Q−W), the second law forbids entropy decrease and sends heat hot→cold, the Carnot efficiency is below 1 (no perpetual motion), the Kelvin scale floors at absolute zero (0°C=273K), Charles's law keeps V/T constant, and specific heat is linear in ΔT — the laws as arithmetic, not statistical mechanics

35. **The bond domain** — `lean/Molecular.lean` · **8** theorems
   molecular bonding as decidable arithmetic, demarcated — the octet rule (4+4=8), a bond of order n shares 2n electrons, bond order gives N₂ a triple and O₂ a double, main-group valence is group−10, Lewis structures count valence electrons, a large electronegativity gap is ionic, molar mass sums the atoms, and bond strength rises with order — bonding bookkeeping, not quantum chemistry

36. **The field domain** — `lean/Electromagnetism.lean` · **8** theorems
   electromagnetism as decidable arithmetic, demarcated — Coulomb sets the sign (like repel, opposite attract), Ohm's law V=I·R, power V·I=I²R, series resistance adds and parallel combines reciprocally, Kirchhoff conserves current at a node and voltage around a loop, and Faraday induces EMF only from a changing flux — circuit and field arithmetic, not a full Maxwell derivation, distinct from the light waves in Optics

37. **The structures domain** — `lean/Statics.lean` · **8** theorems
   statics as decidable arithmetic, demarcated — forces sum to zero and moments balance in equilibrium, a lever gives mechanical advantage, the centre of mass is the weighted average, a simply-supported beam splits a central load evenly, a rigid planar truss obeys Maxwell's rule m=2j−3, stress is force over area, and Hooke's law is linear — equilibrium arithmetic, not finite-element analysis

38. **The points-of-sail domain** — `lean/Sailing.lean` · **8** theorems
   sailing as decidable arithmetic, demarcated — the ~45° no-go zone (45+45=90), points of sail on multiples of 45°, the close-hauled 3-4-5 beating triangle at a distance penalty (5>3), apparent wind exceeding true (5>4), a balanced helm as moment equilibrium (8·3=6·4) so the boat holds course and the captain rests, two tacks cancelling leeway, and precise tacks compounding linearly — sailing geometry and balance, not aero/hydrodynamics

39. **The spacetime domain** — `lean/Relativity.lean` · **8** theorems
   special relativity as decidable arithmetic, demarcated — nothing exceeds c (the cosmic speed limit, no FTL), light rides the null cone (interval 0), the invariant interval classifies events timelike/causal or spacelike (no causal link without FTL), the Lorentz factor rides a Pythagorean triangle (β=5/13→γ=13/12), moving clocks dilate and lengths contract, and rest energy is E=mc² — spacetime arithmetic, not a full tensor or GR derivation

40. **The Glagolitic numerals & Pliska rosette** — `lean/Glagolitic.lean` · **6** theorems
   documented Glagolitic arithmetic and the seven-fold, demarcated — Cyril numbered the letters (units 1-9, tens, hundreds, additive: 500+80+3=583; teens written unit-before-ten), the nine units sum to 45 (digital root 9), the Pliska rosette turns on seven rays (ℤ/7, six residues sum 21 → digital root 3 the primitive root), and 7 is prime so ℤ/7 is a field — the numerals and geometry; the rosette meaning stays historically debated, not decoded

41. **The time coordinate** — `lean/Ephemeris.lean` · **8** theorems
   the astronomical time coordinate as decidable arithmetic, demarcated — a day is 86400 seconds, the Earth gains one turn against the stars each year (366=365+1), the Julian calendar runs 1461 days per 4 years and the Gregorian 146097 per 400 (97 leap days), mean motion advances longitude linearly, eclipses recur on the Saros (~223 months), the Sun creeps under a degree per day, and a Julian Date is a continuous day count — calendar and mean-motion arithmetic, not a perturbed ephemeris, distinct from the positional facts in Astronomy

42. **The pentagram & the Fibonacci digits** — `lean/Pentagram.lean` · **13** theorems
   five-fold symmetry as decidable arithmetic — the pentagram is the star polygon {5/2}: stepping +2 mod 5 is coprime to 5, so it draws in a SINGLE stroke visiting all five points, closing after one full turn, its five point-angles summing to 180°; and the single-digit (mod 9) Fibonacci — the digital root — is periodic, closing into a 24-cycle (its Pisano period), the SAME recurrence read through the pentagram (mod 5, period 20) and the rosette (mod 7, period 16) — one sequence, three moduli, three finite cycles; finite periodic single digits, NOT a claim about the irrational golden ratio the pentagram encodes

43. **The chessboard** — `lean/Chess.lean` · **8** theorems
   chess geometry as decidable arithmetic — the board is 8×8 = 64 = 2⁶ squares in two colours of 32 each ((rank+file) parity); the knight leaps 1+2=3 (odd), so it flips colour every move and a closed tour is even; the rook reaches 7+7=14 on an open board; the bishop preserves colour, forever closed out of half the board; and the queen is rook+bishop, 7+7+7=21 from a corner — board arithmetic and parity, NOT a solved game or an engine

44. **The chess horizon** — `lean/Chessgames.lean` · **24** theorems
   the HONEST kernel of "all chess games recompute instantly in uuidna", sealed by decide — the opening combinations (20 first moves, 20×20 = 400 after one full move); the un-enumerable game tree (Shannon ~10^120 > the ~10^80 atoms of the observable universe, so no machine ever traverses it); the pigeonhole collision of identity (2^128 uuids < ~10^44 legal positions < the naive 13^64 state space, 13 = 6+6+1 states a square); the FINITE game (the fifty-move rule caps a run at 100 plies) whose address is therefore a bounded, INSTANT identity (6000 < 10^120 — recompute is O(moves), not O(all games)); the d-dimensional board 8^d = 2^(3d) (the 3D 512 = 2⁹, the 8-dimensional 8⁸ = 2²⁴, no maximal board only bounds); and the knight's leap 1+2=3 reflected by the diamond dz(3)=7. HONEST SCOPE: uuidna does NOT enumerate the game tree — a content-address proves INTEGRITY, not truth, here not enumeration; the diamond and combination facts are STRUCTURE, not a claim that chess IS the ring

45. **The heaps** — `lean/Nim.lean` · **93** theorems
   NIM as decidable arithmetic and the FIRST application of the ledger's axiom-free XOR (lxor) — the nim-sum is the bitwise XOR of the heap sizes (3⊕5⊕7 = 1), a P-position (loss for the mover) is exactly a zero nim-sum (Bouton's theorem: 1⊕2⊕3 = 0), equal heaps cancel (n⊕n = 0, the mirror strategy), the empty heap is neutral (n⊕0 = n), the nim-sum commutes and associates so heaps are a set, a lone heap wins, a nonzero nim-sum always has a move to zero, and Sprague–Grundy folds any impartial game to one heap by XOR. HONEST SCOPE: NORMAL play (last to move WINS) only — MISÈRE nim flips the endgame and is demarcated; the exact arithmetic of the nim-sum, not a general game solver

46. **The document fold** — `lean/Editor.lean` · **4** theorems
   the SERIALIZER CONTRACT of a content-addressed document as decidable arithmetic — a Lexical-shaped node tree serialized to a node SEQUENCE and folded to one address. The honest opposite of the memory store: a store is a SET (order-invariant fold), a document is a SEQUENCE (order IS identity), so this fold is ORDER-SENSITIVE — reordering two distinct nodes MOVES the address, a changed node MOVES it, and on the bounded model the positional fold dfold is INJECTIVE (the address DETERMINES the node sequence, node for node). HONEST SCOPE: injective only where the base-8 place value cannot overflow (bounded values, fixed length); the real content-address (merkleRoot over uuids, src/editor.ts) is collision-RESISTANT, not collision-free — by pigeonhole 2^128 addresses < all documents. Editing is re-addressing. The arithmetic of the document fold, NOT a rich-text engine

47. **The error-correcting codes** — `lean/Codes.lean` · **8** theorems
   error-correcting codes as decidable arithmetic — Hamming(7,4) is 4 data + 3 parity = 7 bits with 2⁴ = 16 codewords, a PERFECT code (16 × 8 = 128 = 2⁷, every word within one error of exactly one codeword); minimum distance 3 corrects ⌊(3−1)/2⌋ = 1 error and detects 2, meeting the Singleton bound (3 ≤ n−k+1 = 4); the (3,1) repetition code corrects one flip by majority; and a linear XOR checksum catches any single flip — the counting and bounds of tamper-detection, NOT a decoder

48. **The identifiers** — `lean/Identifiers.lean` · **6** theorems
   the check-digit arithmetic of ISBN/ISSN as decidable facts — the same integrity theme as content-addressing (a check digit is a one-symbol fold of the content that catches tampering): ISBN-10 is a weighted sum mod 11 (prime), so every weight is nonzero mod 11 (any single-digit error shifts the checksum) and consecutive weights differ by 1 (any adjacent transposition shifts it), needing 11 symbols (X for 10); ISBN-13 is alternating 1/3 weights mod 10 in the 978/979 Bookland EAN — the checksum arithmetic and what it catches, NOT a validator library

49. **The tides** — `lean/Tides.lean` · **7** theorems
   the sailor's tides as decidable arithmetic, joining the captain's domain — the rule of twelfths (1,2,3,3,2,1 = 12, a palindrome of flood and ebb), half-tide by the third hour (1+2+3 = 6 of 12), the middle hours running three times faster than the turns (3 > 1), the semidiurnal period of two highs a lunar day apart (12h25m = 745 min, ×2 = 24h50m), and spring exceeding neap as the Moon's phase adds or cancels the Sun's pull — tidal arithmetic, NOT a harmonic tide-prediction model

50. **The calendar** — `lean/Calendar.lean` · **9** theorems
   the Gregorian calendar and the seven-day week as decidable arithmetic — the week IS the rosette ℤ/7 (advance seven days, the day returns: 7 % 7 = 0), so the calendar counts mod 7: a common year of 365 = 52·7 + 1 days shifts a fixed date one weekday (365 % 7 = 1), a leap year two (366 % 7 = 2); the Gregorian rule keeps 97 leap years per 400 (every 4th − centuries + every 400th = 100 − 4 + 1), making 400 years = 146097 days, a whole number of weeks (146097 % 7 = 0), so the calendar repeats EXACTLY every 400 years; the century exception is decided (2000 leap, 1900 not); and the doomsday even months 4/4, 6/6, 8/8, 10/10, 12/12 sit 63 = 9·7 days apart, so they share a weekday — mod-7 congruence, NOT a locale date library

51. **The measures of type** — `lean/Typesetting.lean` · **14** theorems
   typesetting and bookbinding as decidable arithmetic, the craft beneath the publications — the printer's units close exactly (6 picas of 12 points make the 72-point inch) and the em is the type's own square with its half-en and third-thin (12/2 = 6, 12/3 = 4); a folded sheet is a folio (2 leaves, 4 pages), a quarto (8), an octavo (16), leaves doubling so pages run in powers of two and every bound signature is a multiple of four, the ISO A-series halving alike; the harmonious page is the 3:4 rectangle whose diagonal is a whole 5 (3²+4²=5²), or the Fibonacci page that Cassini's identity holds within one unit of the golden section (5²−3·8 = 1), its margins in the medieval 2:3:4:6 canon; the readable measure is 66 characters, inside the 45–75 a typographer keeps; leading exceeds its type (12 on 14) and snaps to a baseline grid (multiples of 4); the type scale rises by octaves (8→16, 9→18); a ream is 500 sheets (20 quires of 25); and a leaf has a recto (odd) and a verso (even) — the arithmetic of the page, NOT a layout engine or a font renderer, and the √2 A-series ratio is irrational, demarcated

52. **The cut** — `lean/Editing.lean` · **9** theorems
   video and film editing as decidable arithmetic, the craft a professional editor works in — timecode is a ring (at 24 fps the frame field runs 0..23 then wraps, ℤ/24), a minute is 1440 frames, NTSC drop-frame drops 2 frame-numbers a minute except every tenth (108 an hour) to hold 29.97 to the clock, 4K UHD is EXACTLY four Full-HD frames (3840×2160 = 4·1920·1080), widescreen 16:9 beats academy 4:3 by cross-multiplication (48 > 36), the rule of thirds crosses at four power points in a nine-square, a crossfade makes two clips a+b−L long (inclusion–exclusion on the timeline, the same identity the compare tool folds), 48 kHz audio is 2000 samples a frame exactly in sync, and six 30° steps span the 180° axis — the arithmetic of the edit, NOT a codec, an NLE or a renderer

53. **The exposure** — `lean/Photography.lean` · **8** theorems
   photography as decidable arithmetic, focused on WHERE uuidna differs from the photographic standard and WHY — the standard prints convenient ROUNDED numbers for the dial (shutter 1/125, 1/60; aperture f/1.4) while uuidna keeps the EXACT powers of two the physics follows, and the theorems measure the gap: 1/125 rounds the exact 1/128 (2⁷, off by 3), 1/60 rounds 1/64 (2⁶, off by 4), f/1.4 rounds √2 (1.4² = 1.96 < 2); where the standard does NOT round, the full-stop ISO doublings (100·2⁵ = 3200), uuidna and the standard AGREE exactly; reciprocity is exact because it is pure addition of stops; and the light-multipliers 2⁰..2⁵ fold mod 9 to the vortex 1,2,4,8,7,5 — the camera doubles in the ring uuidna turns on, the dial just rounds the readout — the arithmetic of stops and the rounding gap, NOT a light meter or sensor model

54. **The instrument** — `lean/Psychology.lean` · **8** theorems
   psychology's ARITHMETIC, and ONLY its arithmetic — the narrowest scope in the ledger because psychology is overwhelmingly NOT decidable: the mind, emotion, behaviour and every diagnosis are NOT by-decide theorems and uuidna seals NONE of them. What IS decidable is the arithmetic the instruments and named models are built from: a 7-point Likert scale's neutral midpoint is the fixed point of the reflection 8−x (the 4th point, 3 above and 3 below — the same reflection the ledger centres on); the Big Five is a five-factor pentad (the count of axes, not that the factors are correct); Miller's span is the range 7±2 = [5,9] of width 4; Hick's law counts the bits of a choice (8 options = 3 bits, 2³=8); a yes/no detection has a 2×2 = 4 outcome table; Weber–Fechner maps the geometric ladder 1,2,4,8 to equal perceived steps (the logarithm); and Dunbar's layers scale by ×3 (5,15,45,135) but are reported ROUNDED to 50 and 150 (the same rounding gap the photography stops carry). Sealing "a 7-point scale has a neutral 4th point" says NOTHING about whether the scale measures anything real, whether the Big Five is true, or what a person feels. HONEST SCOPE: the arithmetic of the instruments, NOT a claim about the mind, behaviour, emotion, personality or any diagnosis — uuidna is not a clinician; every mentalistic claim about the mind, sent to the trial, comes back UNVERIFIED

55. **The spectrum** — `lean/Spectrum.lean` · **8** theorems
   the electromagnetic spectrum as decidable arithmetic, the waves uuidna navigates — the one law wavelength × frequency = c (a constant, so λ and f are inversely proportional at the fixed speed of light 299792458 m/s, exact by the SI metre, verified against NIST CODATA); the SEVEN bands (radio, microwave, infrared, visible, ultraviolet, X-ray, gamma) ordered by increasing frequency, a ℤ/7 of bands; photon energy E = h·f rising with them so gamma out-energises radio; the visible window under ONE octave (700 nm to 400 nm is a ratio under 2, unlike sound's many octaves); an octave of light doubling frequency like sound; and the "300,000 km/s" quote ROUNDING the exact c up by 207542 m/s (the same rounding gap the photography stops carry). HONEST SCOPE: the ARITHMETIC of the waves — the wave relation, the band order, the octave, the rounding gap — NOT an EMF safety, exposure, or health claim of any kind; uuidna makes no claim about radiation and the body

56. **The colour wheel** — `lean/Colour.lean` · **8** theorems
   colour theory as decidable arithmetic, the art domain of the spectrum's visible band — the wheel is ℤ/12 (twelve hues, advance twelve and the hue returns); complementary hues sit opposite (a +6 half-turn, a self-inverse involution with no hue its own complement); three primaries alternate with three secondaries (3+3=6, the hexagon); the classical harmonies are the regular polygons on the wheel (the triad is thirds +4 landing {0,4,8}, the square is fourths +3 landing {0,3,6,9}); true colour is eight bits a channel (2⁸=256, 2²⁴=16777216 in all); a tint toward white and a shade toward black complement to full value (v + (255−v) = 255); and the wheel splits into six warm and six cool. HONEST SCOPE: the ARITHMETIC of the colour wheel and its harmonies — the geometry a colourist works in — NOT a claim that beauty, taste, or which colours "go together" is objective; harmony here means the polygon, not a verdict on art

57. **The harmony of pairs** — `lean/Harmony.lean` · **8** theorems
   the SAME complementary-pair arithmetic proven across biology, medicine, chemistry and physics, and then proven to be ONE structure — harmonising the science-pairs cluster across the four fields. A complementary pair is reflection through a centre: the two parts sum to a neutral whole or cancel to zero, and the swap is a fixed-point-free involution. DNA bases pair by complement A↔T, G↔C (the reflection 3−c, self-inverse, no base pairs with itself); Chargaff's counts balance (purines A+G = pyrimidines T+C); redox conserves electrons (oxidation +n, reduction −n, sum 0); an ionic compound is neutral (MgCl₂: +2 with two −1); an agonist and a competitive antagonist cancel at the receptor ((+4)+(−4)=0); homeostasis returns to its set point (a +d deviation met by −d); Newton's third law and charge conservation both cancel (F+(−F)=0, electron+positron charge 0) — and the last theorem proves these are the SAME reflection at different centres (0 for charge, 3 for the four bases, 14 for pH). HONEST SCOPE: structure facts, the arithmetic of the pairing, NOT medical, biological, chemical or physical claims — uuidna is not a lab; each pair's real mechanism lives in its own science, only the shared decidable signature is sealed here

58. **The report** — `lean/Report.lean` · **8** theorems
   the reporter's METHOD as decidable arithmetic — how to dive deep and report the news of PROVEN discoveries. HONEST SCOPE first, because it is the whole point: uuidna does NOT verify world events (no by-decide can settle whether something happened out there; that is the reporter's own work — go there, get the documents, name the sources). What IS sealed is the METHOD: a complete report answers the six questions (who/what/when/where/why + how, 5+1=6); a confirmed timeline is chronological (events 0..5 strictly ascending); a fact needs corroboration by TWO independent reputable sources (one is uncorroborated, 1<2); TRINITY editing is three independent passes (1+1+1=3, the trinity the ledger folds in); full-quorum publication is unanimity on the trinity (2+1=3, majority 2>1); a report SHIPS only when verified AND trinity-audited AND quorate — the AND of the three, any one failing blocks it (the same audit-before-publish uuidna runs on its own notes); the inverted pyramid puts the vital fact first and descends (5,4,3,2,1); and every claim carries one of TWO honest verdicts — VERIFIED (cites a checkable source/proof) or UNVERIFIED (held open, never asserted as fact, never called false). The subject is uuidna's own PROVEN discoveries (the sealed theorems); the discipline is what makes the report trustworthy, NOT a claim uuidna knows the world

59. **The matching** — `lean/Matching.lean` · **8** theorems
   connecting people as decidable arithmetic — the HONEST kernel of "social dating / connecting people", stated with its scope: uuidna is a theorem ledger and a content-addresser, it does NOT run a dating service, hold anyone's profile, or match real people; matching real humans means personal data, consent and safety obligations that live OUTSIDE these theorems (see /privacy). What IS sealed is only the graph theory a matching rests on: the handshake lemma (every edge touches two, so the degree sum is even and the edges are half of it), the count of possible introductions among n people (n(n−1)/2, ten among five), a perfect matching needs an EVEN number of people (six pair, five leave one out) and splits them in half, a mutual match is SYMMETRIC (both must choose — a one-sided choice is not a match), a pairing is a fixed-point-free involution (each partnered with exactly one other, no self-pairing), and — the honest ceiling — stable matching (Gale–Shapley) halts in AT MOST n² proposals, BOUNDED not free, the same "no maximum, only bounds" the security layer proves — the arithmetic of connection, NOT a matchmaking product or anyone's data

60. **The rules of inference** — `lean/Reasoning.lean` · **9** theorems
   reasoning itself as decidable arithmetic — every classical inference rule is a boolean tautology over a finite truth table, so each is proven by decide: modus ponens (from p and p→q, q) and modus tollens (from ¬q and p→q, ¬p), the contrapositive (p→q equals ¬q→¬p), De Morgan for and/or, double negation (¬¬p = p), the excluded middle (p ∨ ¬p), and the hypothetical and disjunctive syllogisms — implication p→q being the boolean !p ∨ q, checked on every assignment. The rules a valid argument is built from, sealed so a reasoning step can cite the exact rule it uses — classical propositional logic as decidable truth tables, NOT a theorem prover or predicate logic over infinite domains

61. **The layered defence** — `lean/Security.lean` · **6** theorems
   the arithmetic of why FUSING security raises the cost of tampering, proven by decide — NOT a proof that any cryptographic primitive is secure (that rests on assumptions), and claiming NO maximum: independent layers add their bits (64 + 64 = 128) and multiply the search space (2⁸·2⁸ = 2¹⁶), each key bit doubles the space (2¹¹ = 2·2¹⁰), a collision costs about half the exponent of a preimage (2·64 = 128, the honest caveat that collisions are cheaper), verifying is exponentially cheaper than forging (16 < 2¹⁶), and for every bound there is a strictly larger one (2⁸ < 2⁹) so there is NO maximum, only bounds — the honest kernel of "fuse security → raise tampering cost", refusing the word max

62. **The mix** — `lean/Production.lean` · **10** theorems
   music production as decidable arithmetic and the studio INVOLUTIONS made exact — reversing a clip is self-inverse (reverse twice returns), inverting its phase (x ↦ −x) is self-inverse, and their FUSION reverse-then-invert is ITSELF an involution (applied twice, the identity): the ultimate test that reverse and inverse compose to a clean self-inverse, proven on a real signal. Around them the counting of the studio: the chromatic scale is ℤ/12 (the octave wraps like the rosette), an octave doubles frequency (440→880), 120 BPM is 500 ms a beat and 2 s a 4/4 bar, Nyquist is half the sample rate (44.1 k → 22.05 k, the honest ceiling, not lossless), MIDI is 7-bit (128 notes, 0..127), 16-bit is the ~6 dB-per-bit rule of thumb (≈96 dB), and the circle of fifths is ONE cycle (7 semitones coprime to 12 visits all twelve, the pentagram idea in sound) — the arithmetic and involutions of the mix, NOT a DAW, a synth or a mastering chain

63. **One leap** — `lean/OneLeap.lean` · **1** theorems
   the whole vortex proved in a single by decide

---

Rendered as schema.org microdata cards at [uuidna.com/theorems](https://uuidna.com/theorems), folded to one recomputable receipt.
