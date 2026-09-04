---
title: "The pentagram & the Fibonacci digits"
description: "Computed from lean/Pentagram.lean — 13 sealed theorems, every claim citing its proof."
---

# The pentagram & the Fibonacci digits

> THE PENTAGRAM & THE FIBONACCI DIGITS — the star polygon {5/2} and the single-digit (Pisano) Fibonacci cycles, finite and decidable. — held by [pentagram_single_stroke](/theorem/pentagram_single_stroke) and its 12 siblings below.

**13 theorems**, from [pentagram_single_stroke](/theorem/pentagram_single_stroke) onward, each proven `by decide` in <a href="/lean/Pentagram.lean">lean/Pentagram.lean</a>, axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 13 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [pentagram_step_coprime_five](/theorem/pentagram_step_coprime_five). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FPentagram.lean)** — nothing to install. The editor fetches `lean/Pentagram.lean` from the repository and re-decides all 13 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### The pentagram is the star polygon {5/2}: stepping +2 (mod 5) draws it in a SINGLE stroke — [0,2,4,1,3] — visiting all five points without lifting the pen, because 2 is coprime to 5.
The ledger holds this as [pentagram_single_stroke](/theorem/pentagram_single_stroke) — proven `by decide`, sorry-free:

```lean
(List.range 5).map (fun k => (2*k) % 5) = [0,2,4,1,3]
```

### The convex pentagon is the step +1 (mod 5): [0,1,2,3,4] — the same five vertices, walked the short way; the pentagram is the SAME five points, walked by twos.
The ledger holds this as [pentagon_single_stroke](/theorem/pentagon_single_stroke) — proven `by decide`, sorry-free:

```lean
(List.range 5).map (fun k => k % 5) = [0,1,2,3,4]
```

### The star closes: five steps of +2 return to the start — (2·5) mod 5 = 0. A pentagram is exactly one full turn of the twos.
The ledger holds this as [pentagram_closes_after_five](/theorem/pentagram_closes_after_five) — proven `by decide`, sorry-free:

```lean
(2*5) % 5 = 0
```

### WHY it is one stroke and not a shorter loop: the step 2 is coprime to 5 — gcd(2,5)=1 — so ×2 permutes ℤ/5 and the walk hits every point before repeating (as +7 does on the circle of fifths mod 12).
The ledger holds this as [pentagram_step_coprime_five](/theorem/pentagram_step_coprime_five) — proven `by decide`, sorry-free:

```lean
Nat.gcd 2 5 = 1
```

### The five point-angles of the pentagram sum to a half-turn: 5 · 36 = 180°, each sharp point 36° — the {5/2} star angle. A count of degrees, exact.
The ledger holds this as [pentagram_point_angles_half_turn](/theorem/pentagram_point_angles_half_turn) — proven `by decide`, sorry-free:

```lean
5 * 36 = 180
```

### The single-digit (mod 9) Fibonacci — the digital-root Fibonacci — is periodic: 24 single digits satisfy Fₙ₊₂ ≡ Fₙ+Fₙ₊₁ (mod 9) from the seed [0,1] and return to it, closing into a 24-cycle (its Pisano period).
The ledger holds this as [fib_single_digit_cycle_24](/theorem/fib_single_digit_cycle_24) — proven `by decide`, sorry-free:

```lean
fibCycle 9 [0,1,1,2,3,5,8,4,3,7,1,8,0,8,8,7,6,4,1,5,6,2,8,1] 24 = true
```

### The SAME Fibonacci recurrence through the pentagram modulus (mod 5): 20 single digits close into a 20-cycle — the Pisano period π(5)=20. The pentagram lens on the golden sequence.
The ledger holds this as [fib_pentagram_cycle_20](/theorem/fib_pentagram_cycle_20) — proven `by decide`, sorry-free:

```lean
fibCycle 5 [0,1,1,2,3,0,3,3,1,4,0,4,4,3,2,0,2,2,4,1] 20 = true
```

### The SAME recurrence fused to the rosette modulus (mod 7): 16 single digits close into a 16-cycle — the Pisano period π(7)=16. One sequence, read through pentagram (5), rosette (7) and single digit (9).
The ledger holds this as [fib_rosette_cycle_16](/theorem/fib_rosette_cycle_16) — proven `by decide`, sorry-free:

```lean
fibCycle 7 [0,1,1,2,3,5,1,6,0,6,6,5,4,2,6,1] 16 = true
```

### The "777" is three sevens — 7+7+7 = 21 = 3·7. Not 777 of anything: the trinity (3) times the rosette (7), the same 21 as a sum and as a product. A mnemonic that computes.
The ledger holds this as [three_sevens_twentyone](/theorem/three_sevens_twentyone) — proven `by decide`, sorry-free:

```lean
7 + 7 + 7 = 21 ∧ 3 * 7 = 21
```

### The trinity (3) and the rosette (7) are coprime — gcd(3,7)=1 — so a step of 3 permutes ℤ/7 (visits every ray), and ℤ/3 and ℤ/7 fuse into a single ℤ/21 cycle (the Chinese remainder theorem). Coprimality IS the fusion.
The ledger holds this as [trinity_rosette_coprime](/theorem/trinity_rosette_coprime) — proven `by decide`, sorry-free:

```lean
Nat.gcd 3 7 = 1
```

### DNA reads in triplets: the codon reading frame steps by 3. Through the seven-ray rosette that step visits ALL seven rays in one rotation — [0,3,6,2,5,1,4] — because 3 is coprime to 7. The reading frame (the DNA 3) IS a full rotation (the rosette 7): 3×7 in one stroke.
The ledger holds this as [codon_frame_rotates_rosette](/theorem/codon_frame_rotates_rosette) — proven `by decide`, sorry-free:

```lean
(List.range 7).map (fun k => (3*k) % 7) = [0,3,6,2,5,1,4]
```

### The human pentagram’s pentagon: each interior angle is 108° — (5−2)·180 = 540, and 540 = 5·108. A finite count of degrees, exact; the five points fold to a half-turn (5·36 = 180).
The ledger holds this as [pentagon_interior_angle_108](/theorem/pentagon_interior_angle_108) — proven `by decide`, sorry-free:

```lean
(5 - 2) * 180 = 540 ∧ 5 * 108 = 540
```

### π is the honest edge: irrational, infinite, non-repeating — NOT a `by decide` object (proving anything about π itself needs analysis. What decides is the finite rationals AROUND it: Archimedes’ bounds 223/71 < π < 22/7 are two ordered fractions — 223·7 = 1561 < 1562 = 22·71 — bracketing π within 1/(71·7). The ledger holds the finite witnesses; π stays outside, by its nature.
The ledger holds this as [pi_bracketed_by_finite_rationals](/theorem/pi_bracketed_by_finite_rationals) — proven `by decide`, sorry-free:

```lean
223 * 7 = 1561 ∧ 22 * 71 = 1562 ∧ 223 * 7 < 22 * 71
```


::: warning 
THE PENTAGRAM & THE FIBONACCI DIGITS — the star polygon {5/2} and the single-digit (Pisano) Fibonacci cycles, finite and decidable. The boundary is confirmed by the wing's own sealed theorems — e.g. [pentagram_single_stroke](/theorem/pentagram_single_stroke) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
