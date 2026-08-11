# The formal layer, organized by computing principle

<!-- GENERATED from lean/*.lean by scripts/lean-ledger — DO NOT EDIT. Counts are derived; edit titles/blurbs in the PRINCIPLE metadata. -->

Every theorem below is proven `by decide` in Lean, verified sorry-free by `npm run lean` — **627 theorems** in
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

9. **Self-discovered** — `lean/Discover.lean` · **7** theorems
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

21. **One leap** — `lean/OneLeap.lean` · **1** theorems
   the whole vortex proved in a single by decide

---

Rendered as schema.org microdata cards at [uuidna.com/theorems](https://uuidna.com/theorems), folded to one recomputable receipt.
