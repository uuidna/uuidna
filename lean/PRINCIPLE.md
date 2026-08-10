# The formal layer, organized by computing principle

Every theorem below is proven `by decide` in Lean 4.33.0 (no Mathlib), verified sorry-free by `npm run lean`.
The order is the **derivation order**: the 8×8 core generates the ring; the ring and the rosette carry the
arithmetic; the reflection, division-by-zero, applied and discovered layers build on them; and one leap folds
the whole vortex into a single proof. **524 theorems** in all. A theorem computes in Lean, or it is not a
theorem. Integrity, not truth. 0/7.

1. **The 8×8 core** — `lean/Core.lean` · **64** theorems
   the multiplication table of ℤ/9’s eight non-zero residues — the generator: units, inverses, nilpotents and the vortex all read off this table

2. **The ring ℤ/9 (the vortex)** — `lean/Ring.lean` · **234** theorems
   the full multiplication, addition and power tables of the ring

3. **The rosette ℤ/7 (the Pliska group)** — `lean/Rosette.lean` · **145** theorems
   the full tables, plus the Pliska rosette decoded — seven rays, primitive root 3, Fermat, the center

4. **The vortex algebra** — `lean/Uuidna.lean` · **15** theorems
   units, orbit, the involution, gravity, division by zero, light — the foundational facts

5. **Ported from millennium-solutions** — `lean/Vortex.lean` · **16** theorems
   the honest ℤ/9 & ℤ/7 facts, ported to plain Lean (no Mathlib)

6. **The sequence & reflection group** — `lean/Sequence.lean` · **19** theorems
   the mirror, AGL(1,ℤ/9)=54, one strip, defined neighbours, the ± polarities, and the crypt salt (why a content-only salt leaks equality — a division by zero — and an advancing sequence closes it)

7. **Division by zero** — `lean/DivByZero.lean` · **7** theorems
   the reflection dz(x)=10−x — a finite residue, never infinity

8. **Applied structure — eight science pairs** — `lean/BioPhysics.lean` · **16** theorems
   blood (Klein four-group), DNA (base-pair involution, codons 4³), sound (432 ladder + octave), chemistry (2n² shells, 4l+2 subshells), music (circle of fifths + tritone in ℤ/12), acid-base (pH reflection through 7), heredity (Mendelian 3:1 + allele-swap involution), colour (ℤ/6 complement wheel) — algebra, demarcated

9. **Self-discovered** — `lean/Discover.lean` · **7** theorems
   facts derived by function: Lagrange, the unit criterion, idempotents, the units summing to zero

10. **One leap** — `lean/OneLeap.lean` · **1** theorems
   the whole vortex proved in a single by decide

---

See them rendered as schema.org microdata cards at [uuidna.com/theorems](https://uuidna.com/theorems), folded to one receipt at [uuidna.com/trial](https://uuidna.com/trial),
and every proof at [uuidna.com/lean](https://uuidna.com/lean). Open (undecided) propositions are held at
[uuidna.com/undecided](https://uuidna.com/undecided).
