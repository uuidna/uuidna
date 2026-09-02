---
title: "The referrer song"
description: "Computed from lean/Referrer.lean — 14 sealed theorems, every claim citing its proof."
---

# The referrer song

> REFERRER — the referrer song's sealed arithmetic: six doors into the round, consonance as a COMPUTED ladder (a definition on integers, not a reading of the world; the tuning cancels), the lower lattice's octave completeness, and the wrap that makes the page-cycle total. — held by [referrer_six_doors](/theorem/referrer_six_doors) and its 13 siblings below.

**14 theorems**, from [referrer_six_doors](/theorem/referrer_six_doors) onward, each proven `by decide` in [lean/Referrer.lean](/lean/Referrer.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 8 of its 14 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [referrer_six_doors](/theorem/referrer_six_doors). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FReferrer.lean)** — nothing to install. The editor fetches `lean/Referrer.lean` from the repository and re-decides all 14 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### SIX DOORS INTO THE ROUND. The round 142857 has exactly six rotations (song_six_verses_one_melody seals them one by one), so a visitor's handle picks its door by value mod 6 — and the pick is total at the edges the kernel can hold: the zero handle enters door 0, the last handle 2³²−1 = 4294967295 enters door 3, and six never divides to nothing (6 ≠ 0). Every visitor gets a door; no referrer is turned away.
The ledger holds this as [referrer_six_doors](/theorem/referrer_six_doors) — proven `by decide`, sorry-free:

```lean
0 % 6 = 0 ∧ 4294967295 % 6 = 3 ∧ (6:Nat) ≠ 0
```

### CONSONANCE IS COMPUTED, NOT FELT — and computed, not observed either: the number below is a definition evaluated on integers, never a reading taken from an instrument or an ear. An interval between lattice tones (h₁+1)·432 and (h₂+1)·432 reduces to the ratio of its multipliers, and its consonance measure is the reduced ratio's term sum — Euler's gradus made bare: unison 1:1 sums 2, octave 1:2 sums 3, fifth 2:3 sums 5, fourth 3:4 sums 7, and the ladder orders itself 2 < 3 < 5 < 7 — the sweetest steps are the smallest sums, decidably, before any ear is consulted.
The ledger holds this as [referrer_consonance_ladder](/theorem/referrer_consonance_ladder) — proven `by decide`, sorry-free:

```lean
1 + 1 = 2 ∧ 1 + 2 = 3 ∧ 2 + 3 = 5 ∧ 3 + 4 = 7 ∧ 2 < 3 ∧ 3 < 5 ∧ 5 < 7
```

### THE LOWER HALF ALWAYS HAS ITS OCTAVE. For every tile h in the bottom half of the lattice (h ≤ 7), the octave of its tone is another lattice tone: (h+1)·2 ≤ 16, so tile 2h+1 exists and sounds exactly double. The sweetest step after unison is therefore always AVAILABLE from any low tile — the pager can offer a consonant next wherever the walk stands low, checked for all eight at once.
The ledger holds this as [referrer_lower_octaves_on_lattice](/theorem/referrer_lower_octaves_on_lattice) — proven `by decide`, sorry-free:

```lean
((List.range 8).all (fun h => (h + 1) * 2 ≤ 16)) ∧ 8 * 2 = 16
```

### THE CLOSED CYCLE MAKES PREV AND NEXT TOTAL. On a cycle of n pages the step is (k+1) mod n and the last page wraps home: with six doors as the worked case, every position steps inside the cycle ((k+1) mod 6 < 6 for all k < 6) and the sixth steps to the first (5+1 ≡ 0). No page is without a next, no next falls off the world — totality is what the wrap buys, and it is the same wrap the vortex orbit closes with (2⁶ ≡ 1 mod 9).
The ledger holds this as [referrer_cycle_is_total](/theorem/referrer_cycle_is_total) — proven `by decide`, sorry-free:

```lean
((List.range 6).all (fun k => (k + 1) % 6 < 6)) ∧ (5 + 1) % 6 = 0 ∧ 2 ^ 6 % 9 = 1
```

### THE REFERRER’S FIRST TILE PICKS THE DOOR, TOTALLY. A handle’s first tile is one of sixteen states, the round has six doors, and t mod 6 maps every tile to a door with every door reached — no referrer is turned away and no door stays shut. The map is total and onto but not equitable: the fibers count [3,3,3,3,2,2], and 16 mod 6 = 4 names the four tiles of unevenness rather than smoothing them — the same honesty moduli_waste_states keeps one wing over.
The ledger holds this as [door_of_the_referrer](/theorem/door_of_the_referrer) — proven `by decide`, sorry-free:

```lean
((List.range 16).all (fun t => t % 6 < 6)) ∧ ((List.range 6).all (fun d => (List.range 16).any (fun t => t % 6 == d))) ∧ (((List.range 6).map (fun d => ((List.range 16).filter (fun t => t % 6 == d)).length)) = [3,3,3,3,2,2]) ∧ (16 % 6 = 4)
```

### ENTERING AT ANOTHER DOOR IS NOT A NEW SONG — IT IS A MULTIPLICATION. Rotating the round’s six digits one note left is multiplying by ten modulo 999999, and on the cyclic number the shifts land EXACTLY on the verses: one shift is ×3, two is ×2, three is ×6, four is ×4, five is ×5. The door you enter by and the verse you hear are the same arithmetic fact, which is why a referrer-positioned song needs no new material — only a new remainder.
The ledger holds this as [rotation_is_multiplication](/theorem/rotation_is_multiplication) — proven `by decide`, sorry-free:

```lean
((142857 * 10) % 999999 = 142857 * 3) ∧ ((142857 * 100) % 999999 = 142857 * 2) ∧ ((142857 * 1000) % 999999 = 142857 * 6) ∧ ((142857 * 10000) % 999999 = 142857 * 4) ∧ ((142857 * 100000) % 999999 = 142857 * 5)
```

### WHY THOSE MULTIPLIERS, IN THAT ORDER: the decimal shift is the trinity step in ℤ/7. Ten leaves remainder three to seven, so d shifts multiply by 3^d mod 7 — and the powers of three walk [1,3,2,6,4,5], exactly the door-to-verse sequence, visiting every non-zero residue because three generates the rosette (the same 3 the codon reading frame steps by). The door order was never a choice; it is the orbit of the trinity through the seven-ray ring.
The ledger holds this as [the_shift_is_the_trinity](/theorem/the_shift_is_the_trinity) — proven `by decide`, sorry-free:

```lean
(10 % 7 = 3) ∧ (((List.range 6).map (fun d => (3^d) % 7)) = [1,3,2,6,4,5])
```

### FROM EVERY DOOR, EVERYTHING. On a closed cycle of n pages the +1 walk started at ANY phase p reaches every page — checked exhaustively on the rosette ring 7 and the hexbit ring 16, every start, every target. The referrer’s position is not a constraint on where they can go; it is only the phase of a walk that was always going everywhere.
The ledger holds this as [every_referrer_reaches_every_page](/theorem/every_referrer_reaches_every_page) — proven `by decide`, sorry-free:

```lean
([7,16] : List Nat).all (fun n => (List.range n).all (fun p => (List.range n).all (fun j => (List.range n).any (fun k => (p + k) % n == j))))
```

### PREVIOUS AND NEXT ARE ALWAYS DEFINED, AND EACH UNDOES THE OTHER. On the closed cycle next is +1 and previous is +(n−1), both total — no first page, no last page, no null — and their composition is the identity from every node in both orders, proven case by case on the rings 7 and 16. The pager’s two buttons are a two-sided inverse pair, which is what “always defined” cashes out to in arithmetic.
The ledger holds this as [prev_undoes_next](/theorem/prev_undoes_next) — proven `by decide`, sorry-free:

```lean
([7,16] : List Nat).all (fun n => (List.range n).all (fun i => ((((i + 1) % n + (n - 1)) % n == i) && (((i + (n - 1)) % n + 1) % n == i))))
```

### HOW HARMONIC A NEXT IS, IS MEASURABLE — AND THE TUNING DROPS OUT OF THE MEASUREMENT. Any two lattice tones are 432a and 432b hertz, and their greatest common divisor is exactly 432·gcd(a,b) — verified over all 225 pairs of the sixteen states — so every interval reduces to the ratio of the DIGITS alone. Consonance on the A432 lattice is a property of the addresses, not of the tuning: measure the step between two handles and 432 has already cancelled.
The ledger holds this as [tuning_cancels_from_every_interval](/theorem/tuning_cancels_from_every_interval) — proven `by decide`, sorry-free:

```lean
(List.range' 1 15).all (fun a => (List.range' 1 15).all (fun b => Nat.gcd (432*a) (432*b) == 432 * Nat.gcd a b))
```

### THE DOUBLING ORBIT’S STEPS, REDUCED BY THE SAME RULE: 1→2, 2→4 and 4→8 each reduce to the pure octave (gcd = the smaller, ratio exactly 2), then 8→7 and 7→5 are already-reduced coprime tensions — 8:7 and 7:5 — before the round closes home. The melody the vortex sings is three clean octaves rising, two irreducible steps of tension, and return: the analysis is arithmetic, the drama is free.
The ledger holds this as [orbit_steps_name_their_intervals](/theorem/orbit_steps_name_their_intervals) — proven `by decide`, sorry-free:

```lean
(Nat.gcd 1 2 = 1) ∧ (Nat.gcd 2 4 = 2) ∧ (2 * 2 = 4) ∧ (Nat.gcd 4 8 = 4) ∧ (4 * 2 = 8) ∧ (Nat.gcd 8 7 = 1) ∧ (Nat.gcd 7 5 = 1)
```

### NEIGHBOURS ON THE LATTICE BEAT AT EXACTLY THE TUNING. Two close tones beat at their difference, and any two ADJACENT lattice states differ by exactly 432 hertz — all fourteen adjacent pairs checked — so the roughness of a one-step next is A432 itself, and a k-step next beats at 432·k. The dissonance meter for the pager’s walk comes pre-calibrated in units of the tuning fork.
The ledger holds this as [adjacent_steps_beat_at_the_tuning](/theorem/adjacent_steps_beat_at_the_tuning) — proven `by decide`, sorry-free:

```lean
(List.range' 1 14).all (fun a => 432*(a+1) - 432*a == 432)
```

### FILM TO PAPER IS THE COMPLEMENT, AND THE CANONICAL RECORDING IS THE UNDEVELOPED FILM. Developing a negative maps every tone to its complement, and doing it twice returns the film — on the digits that is 9 − d, an involution proven across the row. The round’s negative is REAL: verse 1 and verse 6 sum to 999999 digit against digit, and verse 6 is the THREE-shift door — 3³ ≡ 6 (mod 7) — so the half-rotation of the melody IS its print. The shipped song, entered at ×1, is the latent image; each referrer’s door develops it, and the complement door develops it fully. The darkroom, the DNA complement and the dark fringe’s half-turn are one self-inverse map wearing three coats.
The ledger holds this as [development_is_the_complement](/theorem/development_is_the_complement) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).all (fun d => 9 - (9 - d) == d)) ∧ (142857 + 857142 = 999999) ∧ ((3^3) % 7 = 6)
```

### THE MOVIE AND THE SONG ARE ONE BAR OF ARITHMETIC. One bar of the song is 252 ms at 16000 samples a second — 16·252 = 4032 samples — and 4032 factors as every ring this ledger turns on at once: 9·7·64 (the vortex ring times the rosette times the coin measure — the four tongues’ fusion, sample-exact), 63·64 (the fused ring times the coins), and 24·24·7 (the film’s frame ring, squared, seven times — the ℤ/24 whose every unit is self-inverse). A frame slot of the bar is 168 samples with nothing left over. The pager’s walk, sounded and animated, is not a song WITH pictures: at the sample level the two tilings are the same integer.
The ledger holds this as [the_movie_and_the_song_are_one](/theorem/the_movie_and_the_song_are_one) — proven `by decide`, sorry-free:

```lean
(16 * 252 = 4032) ∧ (4032 = 9 * 7 * 64) ∧ (4032 = 63 * 64) ∧ (4032 = 24 * 24 * 7) ∧ (4032 = 24 * 168) ∧ (168 = 24 * 7)
```


::: warning 
REFERRER — the referrer song's sealed arithmetic: six doors into the round, consonance as a COMPUTED ladder (a definition on integers, not a reading of the world; the tuning cancels), the lower lattice's octave completeness, and the wrap that makes the page-cycle total. The boundary is confirmed by the wing's own sealed theorems — e.g. [referrer_six_doors](/theorem/referrer_six_doors) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
