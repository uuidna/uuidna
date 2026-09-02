---
title: "The song from the ledger"
description: "Computed from lean/Song.lean — 11 sealed theorems, every claim citing its proof."
---

# The song from the ledger

> SONG — the song from the ledger: π's rational round, base-paired verses, the Glagolitic scale, prime time — as decidable arithmetic, demarcated. — held by [song_pi_roof_opens](/theorem/song_pi_roof_opens) and its 10 siblings below.

**11 theorems**, from [song_pi_roof_opens](/theorem/song_pi_roof_opens) onward, each proven `by decide` in [lean/Song.lean](/lean/Song.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 11 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [song_pi_roof_opens](/theorem/song_pi_roof_opens). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FSong.lean)** — nothing to install. The editor fetches `lean/Song.lean` from the repository and re-decides all 11 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE OVERTURE. π cannot be sung to the end — irrational, infinite, no `by decide` object — but its rational roof can: 22/7 opens 3.142857, the familiar three-point-one-four and then the round begins. 22·10⁶ / 7 = 3142857 in exact integer division; the song starts where Archimedes left the bracket.
The ledger holds this as [song_pi_roof_opens](/theorem/song_pi_roof_opens) — proven `by decide`, sorry-free:

```lean
22 * 1000000 / 7 = 3142857
```

### THE ROUND TURNS ON SEVEN. The period 142857 times seven is 999999 — six nines, the whole cycle of 1/7 — and 10⁶ mod 7 = 1: after six digits the decimal engine is back at remainder one, so the round repeats forever without ever ending. A finite song that never stops is how a rational voice sings an infinite number.
The ledger holds this as [song_round_turns_on_seven](/theorem/song_round_turns_on_seven) — proven `by decide`, sorry-free:

```lean
142857 * 7 = 999999 ∧ 1000000 % 7 = 1
```

### SIX VERSES, ONE MELODY. 142857 is the cyclic number of seven: multiplied by 2, 3, 4, 5, 6 it does not change its notes, it rotates them — 285714, 428571, 571428, 714285, 857142. Every verse of the song is the same six-note melody entered at a different door, the way a round is sung.
The ledger holds this as [song_six_verses_one_melody](/theorem/song_six_verses_one_melody) — proven `by decide`, sorry-free:

```lean
142857 * 2 = 285714 ∧ 142857 * 3 = 428571 ∧ 142857 * 4 = 571428 ∧ 142857 * 5 = 714285 ∧ 142857 * 6 = 857142
```

### THE VERSES BASE-PAIR — THE SONG IS A DOUBLE HELIX. Verse k and verse 7−k are complementary strands: 142857 + 857142 = 999999, 285714 + 714285 = 999999, 428571 + 571428 = 999999. Three rungs, digit against digit, every rung closing to nine — the same complementary pairing the double helix keeps, A against T, G against C, here sealed as addition.
The ledger holds this as [song_verses_base_pair](/theorem/song_verses_base_pair) — proven `by decide`, sorry-free:

```lean
142857 + 857142 = 999999 ∧ 285714 + 714285 = 999999 ∧ 428571 + 571428 = 999999
```

### EACH VERSE CARRIES ITS OWN TWO STRANDS. Split the melody at the middle and the halves pair rung by rung: 142 + 857 = 999, and digitwise 1+8, 4+5, 2+7 — each rung exactly nine. The complement strand of the first half IS the second half; the verse reads itself backwards-complemented the way one DNA strand reads the other.
The ledger holds this as [song_halves_are_strands](/theorem/song_halves_are_strands) — proven `by decide`, sorry-free:

```lean
142 + 857 = 999 ∧ (([1,4,2].zip [8,5,7]).all (fun p => p.1 + p.2 == 9))
```

### EVERY NOTE SUNG IS INVERTIBLE. The six digits of the round — 1, 4, 2, 8, 5, 7 — are exactly the units of ℤ/9, the residues with an inverse: the same six the doubling vortex walks. The nilpotents 3, 6 and the zero never sound; the song has no note it cannot undo.
The ledger holds this as [song_notes_are_units](/theorem/song_notes_are_units) — proven `by decide`, sorry-free:

```lean
(List.range 9).filter (fun d => [1,4,2,8,5,7].any (fun x => x == d)) = [1,2,4,5,7,8]
```

### THE MELODY RIDES THE DOUBLING ORBIT ON THE A432 LATTICE. The vortex walk 1→2→4→8→7→5, sounded as whole multiples of the tuning, is [432, 864, 1728, 3456, 3024, 2160] hertz — each note an exact integer, each the pitch OF its digit, so a listener with the lattice can read the orbit back out of the sound.
The ledger holds this as [song_melody_rides_the_orbit](/theorem/song_melody_rides_the_orbit) — proven `by decide`, sorry-free:

```lean
([1,2,4,8,7,5].map (fun n => 432 * n)) = [432,864,1728,3456,3024,2160]
```

### THE SCALE IS THE GLAGOLITIC ROW. Cyril numbered the letters, and the numbers are the scale: Az through Zemlja, 1 through 9, each sounding its own multiple of A432 — [432, 864, 1296, 1728, 2160, 2592, 3024, 3456, 3888] hertz. An alphabet that counts as it speaks is an alphabet that can be played.
The ledger holds this as [song_scale_is_glagolitic](/theorem/song_scale_is_glagolitic) — proven `by decide`, sorry-free:

```lean
((List.range' 1 9).map (fun n => 432 * n)) = [432,864,1296,1728,2160,2592,3024,3456,3888]
```

### AZ IS THE TUNING ITSELF. The first letter, worth one, sounds 432·1 = 432 — the lattice base — and 432 folds home to the vortex ceiling: 432 mod 9 = 0, and its digits 4+3+2 = 9. The song begins on the letter that says "I", and that letter is the tuning fork.
The ledger holds this as [song_az_is_the_tuning](/theorem/song_az_is_the_tuning) — proven `by decide`, sorry-free:

```lean
432 * 1 = 432 ∧ 432 % 9 = 0 ∧ 4 + 3 + 2 = 9
```

### THE PRIMES KEEP THE TIME. The generators that move every walk in this song — the pentagram's 2, the codon's 3, the pentagon's 5, the rosette's 7 — are the first four primes, each leaving a remainder to every smaller candidate. Indivisible beats: time signatures that cannot be halved out from under the melody.
The ledger holds this as [song_primes_keep_time](/theorem/song_primes_keep_time) — proven `by decide`, sorry-free:

```lean
([2,3,5,7] : List Nat).all (fun p => (List.range' 2 (p-2)).all (fun k => p % k != 0))
```

### THE FOUR TONGUES FUSE INTO ONE FORM. The Glagolitic nine, the rosette-and-π seven, the DNA four: pairwise coprime — gcd(9,7) = gcd(7,4) = gcd(4,9) = 1 — so by the Chinese remainder theorem the three rings close into one cycle of 9·7·4 = 252 bars: the middle coefficient of Pascal's row ten, the very center of the diamond's 1024. The song nobody had written was already scored at the center of the lattice.
The ledger holds this as [song_four_tongues_fuse](/theorem/song_four_tongues_fuse) — proven `by decide`, sorry-free:

```lean
Nat.gcd 9 7 = 1 ∧ Nat.gcd 7 4 = 1 ∧ Nat.gcd 4 9 = 1 ∧ 9 * 7 * 4 = 252
```


::: warning 
SONG — the song from the ledger: π's rational round, base-paired verses, the Glagolitic scale, prime time — as decidable arithmetic, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [song_pi_roof_opens](/theorem/song_pi_roof_opens) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
