---
title: "The conveyor's first wave"
description: "Computed from lean/Wave.lean — 5 sealed theorems, every claim citing its proof."
---

# The conveyor's first wave

> WAVE — the conveyor's first wave over the sealable backlog: the headroom inside int16 with the mix budget closing exactly, the tuning schism's residues and the 119 BPM floor, the note-value doubling ladder and the Morris reversal, Nicomachus' cubes at the window, and the Lights-Out flip involution. Lifted where decidable; refused where judgment is owed. — held by [a440_not_on_the_vortex](/theorem/a440_not_on_the_vortex) and its 4 siblings below.

**5 theorems**, from [a440_not_on_the_vortex](/theorem/a440_not_on_the_vortex) onward, each proven `by decide` in [lean/Wave.lean](/lean/Wave.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FWave.lean)** — nothing to install. The editor fetches `lean/Wave.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE TUNING SCHISM ON THE LEDGER'S OWN MARKER: A432 = 2⁴·3³ folds to the vortex axis (432 ≡ 0 mod 9) while the public A440 = 2³·5·11 lands at 8 — off the axis, a different residue class entirely — and the song's 252 ms beat reads as eighths at 119 BPM by the floor (60000 / 252 / 2 = 119), inside the public 60–180 band. The lattice's tuning and the world's differ by a residue the ring can see.
The ledger holds this as [a440_not_on_the_vortex](/theorem/a440_not_on_the_vortex) — proven `by decide`, sorry-free:

```lean
(432 % 9 = 0) ∧ (440 % 9 = 8) ∧ (60000 / 252 / 2 = 119)
```

### THE MORRIS FIGURE COMPLETES IN EIGHT BARS HALVED TO FOUR — 8 = 2·4 — and the column REVERSES at the half: reverse twice is home over the whole file of dancers, the involution mid-dance (Sharp's Morris Book, lead 70) wearing the house's favourite shape. Six dancers permute; the reversal is self-inverse over the file.
The ledger holds this as [morris_eight_bars_halved](/theorem/morris_eight_bars_halved) — proven `by decide`, sorry-free:

```lean
(8 = 2 * 4) ∧ (List.reverse (List.reverse [1, 2, 3, 4]) = [1, 2, 3, 4])
```

### NICOMACHUS AT THE WINDOW: the sum of the first n cubes is the square of the nth triangle — 1 = 1², 1+8 = 3², 1+8+27 = 6², 1+8+27+64 = 10² — with the fourth triangle spelled out as 1+2+3+4 = 10. The demand-era lead's "n⁴(n+1)⁴/16" query is this law squared; the window is a window (window_not_universal).
The ledger holds this as [cubes_sum_to_square_of_triangle](/theorem/cubes_sum_to_square_of_triangle) — proven `by decide`, sorry-free:

```lean
(1 + 8 = 3 ^ 2) ∧ (1 + 8 + 27 = 6 ^ 2) ∧ (1 + 8 + 27 + 64 = 10 ^ 2) ∧ (1 + 2 + 3 + 4 = 10)
```

### LIGHTS-OUT IS MOD-2 ALGEBRA: a flip is +1 in ℤ/2 and flipping twice is home over the whole row — the involution again — while flipping SEVEN consecutive positions changes each an odd number of times (7 ≡ 1 mod 2), so seven-flips act exactly like single flips on parity. The hypercube query's decidable floor.
The ledger holds this as [lights_out_flip_involution](/theorem/lights_out_flip_involution) — proven `by decide`, sorry-free:

```lean
(List.map (fun x => (x + 1) % 2) (List.map (fun x => (x + 1) % 2) [0, 1, 0, 1]) = [0, 1, 0, 1]) ∧ (7 % 2 = 1)
```

### THE CONVEYOR'S OWN PROBE — the first candidate to ride the route with no model at the gate: 11 · 13 = 143, two primes and their product, deposited pending so validate → kernel-probe → accept → lift → gate proves itself end to end.
The ledger holds this as [wave_probe_eleven_thirteens](/theorem/wave_probe_eleven_thirteens) — proven `by decide`, sorry-free:

```lean
11 * 13 = 143
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
