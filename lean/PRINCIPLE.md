# The formal layer, organized by computing principle

<!-- GENERATED from lean/*.lean by scripts/lean-ledger — DO NOT EDIT. Counts are derived; edit titles/blurbs in the PRINCIPLE metadata. -->

Every theorem below is proven `by decide` in Lean, verified sorry-free by `npm run lean` — **770 theorems** in
derivation order. A theorem computes in Lean, or it is not a theorem.

1. **The 8×8 core** — `lean/Core.lean` · **64** theorems
   the multiplication table of ℤ/9's eight non-zero residues — from these 64 the rest computes

2. **The ring ℤ/9** — `lean/Ring.lean` · **234** theorems
   the vortex ring: its full multiplication, addition and power tables

3. **The rosette ℤ/7** — `lean/Rosette.lean` · **145** theorems
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

10. **The quantum computer** — `lean/Quantum.lean` · **27** theorems
   the exact facts the classical state-vector simulator computes — Born rule, no-signaling, GHZ, gate truth-tables, phase algebra; simulation, not hardware

11. **The seven reflected** — `lean/Clay.lean` · **11** theorems
   the seven Clay problems reflected into the ℤ/9 structure and solved none — a bijection that relabels, it does not propagate proofs; it reflects all seven and solves none

12. **The physics infinities, made finite** — `lean/Infinity.lean` · **9** theorems
   the nasty divergences of physics — UV catastrophe, self-energy, the Landau pole, 1+2+3+…, the derivative 0/0, δ(0), the horizon, the 1/r singularity — each the finite object physics puts where the naive infinity was, exactly as dz(x)=10−x replaces x/0

13. **The cipher & the strand** — `lean/Cipher.lean` · **11** theorems
   crypto ∩ DNA, honest by construction — base-pairing is a fixed-key XOR (a one-time-pad step), the pad is self-inverse but key reuse leaks the plaintext XOR (why a step must rotate), a linear fold is malleable (a receipt is integrity, not a seal), the transport leaks message length, translation is lossy (never a cipher), an affine S-box is invertible but linear, and Grover only halves the key (256→128, not a break) — the shared algebra and its honest limits

14. **The detectors, proven** — `lean/Audit.lean` · **6** theorems
   the provenance gate as decidable logic — flag(h,d,b)=h·(1−d)·(1−b): hollow prose is flagged only when neither demarcated nor backed by a sealed theorem, a demarcation clears it, a backing clears it, and of the eight states exactly one fires — the honesty detector, itself a theorem set

15. **The two coins & the 64** — `lean/Coins.lean` · **6** theorems
   the honest billing/measure algebra — the two coins are the conserved fair-exchange invariant (110−108 = 2 = −χ of the double torus, genus 2), 64 = 2⁶ is the bit measure, contribute 2 to save up to 64 (leverage 32), n qubits give 2ⁿ direct outcomes reaching 64 at n=6, and the measured saving never goes negative — a measured unit of work saved, not a price and not a claim of speed

16. **The algebra of the neuron** — `lean/Neuro.lean` · **9** theorems
   neuroscience, demarcated — all-or-none firing as a threshold step, sub-threshold silence, supra-threshold spike, monotone firing, spatial summation (two sub-threshold inputs sum to fire), the excitatory−inhibitory net drive, the −70→+40 mV action potential (rest < threshold < peak), Hebbian coincidence (Δw = pre·post), and the refractory cap — the textbook model as decidable algebra, not clinical and not about any individual

17. **Propulsion — Newtonian & bounded** — `lean/Propulsion.lean` · **5** theorems
   thrust is conserved momentum (Newton's third law), it REQUIRES reaction mass (zero exhaust → zero thrust: no reactionless/free drive), thrust = ṁ·vₑ, the Δv budget adds across stages, and acceleration a = F/m is finite — no infinite g. The algebra of rocketry, demarcated: not a novel drive, not FTL, not infinite g

18. **Navigation — bounded geometry** — `lean/Navigation.lean` · **5** theorems
   straight-line distance is Pythagorean (3-4-5), the compass rose is ℤ/8 (eight 45° headings), the reciprocal bearing is +4 (an involution), a quarter turn is +2 (order 4), and dead reckoning is the vector sum of the legs — classical navigation as decidable algebra, not GPS-grade guidance and not a positioning claim about anyone

19. **Command authentication** — `lean/Command.lean` · **7** theorems
   the auth gate as decidable logic — a command is accepted iff it is signed AND its tag verifies (accept = signed·verifies): unsigned rejected, a failing/tampered tag rejected, exactly one tag verifies, tampering changes the tag, and a LINEAR tag is forgeable (why the real MAC is HMAC-SHA256, KAT-verified, not this model) — the gate logic proven, the strength demarcated

20. **The fixed stars** — `lean/Astronomy.lean` · **7** theorems
   positional astronomy as decidable arithmetic — the celestial sphere is 360° (15°/hour × 24; the ecliptic 12 × 30°), sexagesimal gives 3600 arcsec/degree, Kepler's harmonic law T²=a³ holds in scaled units, the Metonic cycle is 19 years = 235 synodic months, the classical great year precesses 72 years/degree (25920), and declination spans 180° pole to pole — the fixed references of the sky, exact ratios and cycles, demarcated (some classical approximations, not cosmological claims)

21. **Diving — trimix gas laws** — `lean/Diving.lean` · **8** theorems
   the decidable arithmetic of trimix diving, demarcated — a mix sums to 100%, absolute pressure is 1+depth/10 atm, Dalton makes partial pressures sum to it, air leaves the oxygen window at depth (why trimix), gases blend by partial pressure, helium is non-narcotic, and a direct ascent exceeding the Haldane ratio needs a stop. HARD SAFETY SCOPE: arithmetic only, NEVER a dive plan — use training, tables, and a computer

22. **The light domain** — `lean/Optics.lean` · **8** theorems
   geometric optics as decidable arithmetic, demarcated — reflection is an involution (angle in = angle out), the refractive index n=c/v ≥ 1 so light in a medium is slower than c (no FTL), Snell's law n₁sinθ₁=n₂sinθ₂ holds in a consistent case (4·3=3·4), the thin-lens equation 1/f=1/do+1/di and its magnification are exact, dispersion refracts blue more than red, and total internal reflection needs a denser source — the light domain, consistent cases, not a full wave-optics derivation

23. **The sound domain** — `lean/Acoustics.lean` · **8** theorems
   acoustics as decidable arithmetic, demarcated — the harmonic series stacks integer multiples of the fundamental, the wave speed is v=f·λ, sound (343 m/s) is far slower than light, the decibel is logarithmic (10 dB = ×10 intensity), two tones beat at their difference, the Doppler shift raises pitch on approach and lowers it on recession, a closed pipe sounds only odd harmonics, and intensity falls as the inverse square of distance — the sound domain, exact ratios, distinct from the music/432 ladder in BioPhysics

24. **The reactions domain** — `lean/Chemistry.lean` · **8** theorems
   chemical reactions as decidable arithmetic, demarcated — a balanced equation conserves atoms (Haber, combustion), a neutral compound conserves charge (Al₂O₃), oxidation states sum to the molecular charge, pH+pOH=14 at 25°C, Boyle's law keeps P·V constant, neutralization pairs H⁺ with OH⁻, and stoichiometry scales linearly — reaction bookkeeping, not thermodynamics, distinct from the electron-shell chemistry in BioPhysics

25. **The energy domain** — `lean/Thermodynamics.lean` · **8** theorems
   thermodynamics as decidable arithmetic, demarcated — the first law conserves energy (ΔU=Q−W), the second law forbids entropy decrease and sends heat hot→cold, the Carnot efficiency is below 1 (no perpetual motion), the Kelvin scale floors at absolute zero (0°C=273K), Charles's law keeps V/T constant, and specific heat is linear in ΔT — the laws as arithmetic, not statistical mechanics

26. **The bond domain** — `lean/Molecular.lean` · **8** theorems
   molecular bonding as decidable arithmetic, demarcated — the octet rule (4+4=8), a bond of order n shares 2n electrons, bond order gives N₂ a triple and O₂ a double, main-group valence is group−10, Lewis structures count valence electrons, a large electronegativity gap is ionic, molar mass sums the atoms, and bond strength rises with order — bonding bookkeeping, not quantum chemistry

27. **The field domain** — `lean/Electromagnetism.lean` · **8** theorems
   electromagnetism as decidable arithmetic, demarcated — Coulomb sets the sign (like repel, opposite attract), Ohm's law V=I·R, power V·I=I²R, series resistance adds and parallel combines reciprocally, Kirchhoff conserves current at a node and voltage around a loop, and Faraday induces EMF only from a changing flux — circuit and field arithmetic, not a full Maxwell derivation, distinct from the light waves in Optics

28. **The structures domain** — `lean/Statics.lean` · **8** theorems
   statics as decidable arithmetic, demarcated — forces sum to zero and moments balance in equilibrium, a lever gives mechanical advantage, the centre of mass is the weighted average, a simply-supported beam splits a central load evenly, a rigid planar truss obeys Maxwell's rule m=2j−3, stress is force over area, and Hooke's law is linear — equilibrium arithmetic, not finite-element analysis

29. **The points-of-sail domain** — `lean/Sailing.lean` · **8** theorems
   sailing as decidable arithmetic, demarcated — the ~45° no-go zone (45+45=90), points of sail on multiples of 45°, the close-hauled 3-4-5 beating triangle at a distance penalty (5>3), apparent wind exceeding true (5>4), a balanced helm as moment equilibrium (8·3=6·4) so the boat holds course and the captain rests, two tacks cancelling leeway, and precise tacks compounding linearly — sailing geometry and balance, not aero/hydrodynamics

30. **The spacetime domain** — `lean/Relativity.lean` · **8** theorems
   special relativity as decidable arithmetic, demarcated — nothing exceeds c (the cosmic speed limit, no FTL), light rides the null cone (interval 0), the invariant interval classifies events timelike/causal or spacelike (no causal link without FTL), the Lorentz factor rides a Pythagorean triangle (β=5/13→γ=13/12), moving clocks dilate and lengths contract, and rest energy is E=mc² — spacetime arithmetic, not a full tensor or GR derivation

31. **The Glagolitic numerals & Pliska rosette** — `lean/Glagolitic.lean` · **6** theorems
   documented Glagolitic arithmetic and the seven-fold, demarcated — Cyril numbered the letters (units 1-9, tens, hundreds, additive: 500+80+3=583; teens written unit-before-ten), the nine units sum to 45 (digital root 9), the Pliska rosette turns on seven rays (ℤ/7, six residues sum 21 → digital root 3 the primitive root), and 7 is prime so ℤ/7 is a field — the numerals and geometry; the rosette meaning stays historically debated, not decoded

32. **The time coordinate** — `lean/Ephemeris.lean` · **8** theorems
   the astronomical time coordinate as decidable arithmetic, demarcated — a day is 86400 seconds, the Earth gains one turn against the stars each year (366=365+1), the Julian calendar runs 1461 days per 4 years and the Gregorian 146097 per 400 (97 leap days), mean motion advances longitude linearly, eclipses recur on the Saros (~223 months), the Sun creeps under a degree per day, and a Julian Date is a continuous day count — calendar and mean-motion arithmetic, not a perturbed ephemeris, distinct from the positional facts in Astronomy

33. **The pentagram & the Fibonacci digits** — `lean/Pentagram.lean` · **13** theorems
   five-fold symmetry as decidable arithmetic — the pentagram is the star polygon {5/2}: stepping +2 mod 5 is coprime to 5, so it draws in a SINGLE stroke visiting all five points, closing after one full turn, its five point-angles summing to 180°; and the single-digit (mod 9) Fibonacci — the digital root — is periodic, closing into a 24-cycle (its Pisano period), the SAME recurrence read through the pentagram (mod 5, period 20) and the rosette (mod 7, period 16) — one sequence, three moduli, three finite cycles; finite periodic single digits, NOT a claim about the irrational golden ratio the pentagram encodes

34. **The chessboard** — `lean/Chess.lean` · **8** theorems
   chess geometry as decidable arithmetic — the board is 8×8 = 64 = 2⁶ squares in two colours of 32 each ((rank+file) parity); the knight leaps 1+2=3 (odd), so it flips colour every move and a closed tour is even; the rook reaches 7+7=14 on an open board; the bishop preserves colour, forever closed out of half the board; and the queen is rook+bishop, 7+7+7=21 from a corner — board arithmetic and parity, NOT a solved game or an engine

35. **The error-correcting codes** — `lean/Codes.lean` · **8** theorems
   error-correcting codes as decidable arithmetic — Hamming(7,4) is 4 data + 3 parity = 7 bits with 2⁴ = 16 codewords, a PERFECT code (16 × 8 = 128 = 2⁷, every word within one error of exactly one codeword); minimum distance 3 corrects ⌊(3−1)/2⌋ = 1 error and detects 2, meeting the Singleton bound (3 ≤ n−k+1 = 4); the (3,1) repetition code corrects one flip by majority; and a linear XOR checksum catches any single flip — the counting and bounds of tamper-detection, NOT a decoder

36. **The identifiers** — `lean/Identifiers.lean` · **6** theorems
   the check-digit arithmetic of ISBN/ISSN as decidable facts — the same integrity theme as content-addressing (a check digit is a one-symbol fold of the content that catches tampering): ISBN-10 is a weighted sum mod 11 (prime), so every weight is nonzero mod 11 (any single-digit error shifts the checksum) and consecutive weights differ by 1 (any adjacent transposition shifts it), needing 11 symbols (X for 10); ISBN-13 is alternating 1/3 weights mod 10 in the 978/979 Bookland EAN — the checksum arithmetic and what it catches, NOT a validator library

37. **The tides** — `lean/Tides.lean` · **7** theorems
   the sailor's tides as decidable arithmetic, joining the captain's domain — the rule of twelfths (1,2,3,3,2,1 = 12, a palindrome of flood and ebb), half-tide by the third hour (1+2+3 = 6 of 12), the middle hours running three times faster than the turns (3 > 1), the semidiurnal period of two highs a lunar day apart (12h25m = 745 min, ×2 = 24h50m), and spring exceeding neap as the Moon's phase adds or cancels the Sun's pull — tidal arithmetic, NOT a harmonic tide-prediction model

38. **One leap** — `lean/OneLeap.lean` · **1** theorems
   the whole vortex proved in a single by decide

---

Rendered as schema.org microdata cards at [uuidna.com/theorems](https://uuidna.com/theorems), folded to one recomputable receipt.
