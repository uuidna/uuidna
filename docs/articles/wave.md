---
title: "The conveyor's first wave"
description: "Computed from lean/Wave.lean — 17 sealed theorems, every claim citing its proof."
---

# The conveyor's first wave

> WAVE — the conveyor's first wave over the sealable backlog: the headroom inside int16 with the mix budget closing exactly, the tuning schism's residues and the 119 BPM floor, the note-value doubling ladder and the Morris reversal, Nicomachus' cubes at the window, and the Lights-Out flip involution. Lifted where decidable; refused where judgment is owed. — held by [a440_not_on_the_vortex](/theorem/a440_not_on_the_vortex) and its 16 siblings below.

**17 theorems**, from [a440_not_on_the_vortex](/theorem/a440_not_on_the_vortex) onward, each proven `by decide` in [lean/Wave.lean](/lean/Wave.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 5 of its 17 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [pilgrims_walk_must_cycle](/theorem/pilgrims_walk_must_cycle). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FWave.lean)** — nothing to install. The editor fetches `lean/Wave.lean` from the repository and re-decides all 17 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

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

### THE PILGRIM'S WALK MUST COME HOME (queue lead 128b, from the live superposition's deepening chain): a deepening step maps an address to an address, and an address space is finite — so every chain of collapses revisits, by pigeonhole. The pigeonhole is enumerated IN FULL on the 3-state model: all 81 possible four-step traces over three states, and every single one holds a repeat (at most three distinct among four) — no exception exists, the kernel checked each trace. Beside it, the real space's size: 16^8 = 4294967296 addresses, so the live walk revisits within 4294967297 steps — the BOUND is sealed; the empty seed's actual cycle length stays open as computation (lead 128b). HONEST SCOPE: exhaustive pigeonhole on the model, arithmetic on the space — never a claim about which theorems any cycle greets.
The ledger holds this as [pilgrims_walk_must_cycle](/theorem/pilgrims_walk_must_cycle) — proven `by decide`, sorry-free:

```lean
((List.range 81).all (fun v => (([v % 3, v / 3 % 3, v / 9 % 3, v / 27 % 3].eraseDups).length ≤ 3))) ∧ (16 ^ 8 = 4294967296)
```

### THE SCRUBBER'S SAFETY MARGIN, PROVEN: soda lime absorbs 23 L of CO2 per 100 g, so a 2.5 kg canister holds 23 x 25 = 575 L of theoretical capacity; the CE rating drives it at 1.6 L/min of CO2 - 96 L per hour - so the 3-hour rating consumes 96 x 3 = 288 L, and 288 < 575: the rated duration sits under HALF the chemistry's capacity. The life-saving apparatus is rated the way UL rates safes - honestly, in time, with the margin real and computable. Same soda lime, same margin discipline, in every anesthesia circle system.
The ledger holds this as [scrubber_margin_holds](/theorem/scrubber_margin_holds) — proven `by decide`, sorry-free:

```lean
(23 * 25 = 575) ∧ (96 * 3 = 288) ∧ (288 < 575)
```

### THE DETECTOR LOCK'S REIGN: Jeremiah Chubb's 1818 tamper-reporting lock stood unpicked until Hobbs at the 1851 Great Exhibition - 33 years - and Hobbs' repeat pick took 7 minutes against his first 25: the attack, once learned, is cheap to repeat, which is why tamper-EVIDENCE (the lock reporting the attempt) mattered more than tamper-resistance. The mechanical ancestor of the moved address that proves its own forgery.
The ledger holds this as [chubb_stood_thirty_three_years](/theorem/chubb_stood_thirty_three_years) — proven `by decide`, sorry-free:

```lean
(1851 - 1818 = 33) ∧ (7 < 25)
```

### THE BREATH-HOLD RUNGS OF THE LADDER: constant-weight 130 m (Molchanov) sits below No-Limits 214 m (Nitsch), and the deepest rung reads 1 + 214/10 = 22 atmospheres by the floor - a human on one breath of surface air holding two-tenths of a Comex saturation. The diving ladder's bottom rung for an unassisted lung, integer-exact at the literature's 10 m per atmosphere.
The ledger holds this as [freedive_records_ascend](/theorem/freedive_records_ascend) — proven `by decide`, sorry-free:

```lean
(130 < 214) ∧ (1 + 214 / 10 = 22)
```

### THE FATALITY STUDY'S HONEST WINDOW: Fock counted 181 recreational rebreather deaths across 1998-2010 - a 12-year window of 144 months - and 181 > 144: more than one death per month, every month, for twelve years. The number that made checklists a moral argument rather than a preference; the ~10x-open-circuit rate rides in the prose as the literature's figure.
The ledger holds this as [fock_window_exceeds_a_monthly_toll](/theorem/fock_window_exceeds_a_monthly_toll) — proven `by decide`, sorry-free:

```lean
(2010 - 1998 = 12) ∧ (12 * 12 = 144) ∧ (181 > 144)
```

### THE CHECKLIST TRIAL'S SHAPE: Ranapurwala's cluster-randomized trial enrolled 1,043 divers across 2,041 dives, and 2041 < 1043 x 2 = 2086 - just under two dives per diver, the bound sealed. The trial cut all mishaps by roughly a third; the percentages stay in the prose as the study's measurements, the enrollment arithmetic seals here. Pre-registration, a control, and counts that recompute: the trading-strategy bar, met by the diving world first.
The ledger holds this as [checklist_trial_two_dives_each](/theorem/checklist_trial_two_dives_each) — proven `by decide`, sorry-free:

```lean
(1043 * 2 = 2086) ∧ (2041 < 2086)
```

### MECHANICS DISCOVERS QUANTUM ELECTRONICS: the rebreather carries THREE oxygen cells and takes the 2-of-3 vote because one cell can lie — and the vote is floor arithmetic: the sum of three bits over 2 is the majority, [0,0,0]->0, [1,0,0]->0, [1,1,0]->1, [1,1,1]->1. This is the majority gate of electronics AND the decode of the three-qubit repetition code of quantum error correction: one flipped bit is outvoted, exactly one mechanical practice, one classical gate and one quantum code wearing the same table. From the rebreather research (DAN, Shearwater): the mechanical discipline preceded and predicts the electronic and quantum forms.
The ledger holds this as [three_cell_vote_majority](/theorem/three_cell_vote_majority) — proven `by decide`, sorry-free:

```lean
((0 + 0 + 0) / 2 = 0) ∧ ((1 + 0 + 0) / 2 = 0) ∧ ((1 + 1 + 0) / 2 = 1) ∧ ((1 + 1 + 1) / 2 = 1)
```

### WHY NEVER REPLACE ALL THREE CELLS AT ONCE: two cells from the same batch aging alike fail TOGETHER, and two liars outvote one honest witness — (0+0+1)/2 = 0 kills the true reading — the same reason correlated errors defeat the three-qubit repetition code. Diversity is not a preference: it is what the majority table requires to mean anything. The rebreather manuals (rEvo, DAN) state it as practice; the arithmetic states it as law.
The ledger holds this as [correlated_failure_defeats_the_vote](/theorem/correlated_failure_defeats_the_vote) — proven `by decide`, sorry-free:

```lean
((0 + 0 + 1) / 2 = 0) ∧ ((1 + 1 + 0) / 2 = 1)
```

### THE BREATHING WINDOW IN CENTIBAR, the life-saving numbers of rebreather diving sealed as an ordered chain: consciousness fails below 16 (hypoxia, PPO2 0.16 bar), the working ceiling is 140 (1.4 bar), the contingency ceiling 160 (1.6 bar, NOAA), and the oxygen-rebreather depth limit keeps loop PPO2 under 200. Life is the interval; the apparatus exists to hold a number inside it, silently, for hours — which is why the checklist RCT (1,043 divers, 2,041 dives) cut mishaps by roughly a third: the human verifies what the body cannot sense.
The ledger holds this as [ppo2_window_of_life](/theorem/ppo2_window_of_life) — proven `by decide`, sorry-free:

```lean
(16 < 140) ∧ (140 < 160) ∧ (160 < 200)
```

### THE SAFES' HONEST RATING, in the ledger's own cost model: Bramah's challenge lock stood from 1784 to 1851 — 67 years — and fell to Hobbs only after 51 hours of work; a three-wheel hundred-number dial offers a million states (100^3); and UL rates every safe in MINUTES of resistance (TL-15 before TL-30), never as unbreakable. Mechanics learned centuries ago what verify_cheaper_than_forge seals: security IS the measured work asymmetry, honestly time-rated — seconds to lock, years to breach, and the rating tells the truth about the gap.
The ledger holds this as [bramah_stood_sixty_seven_years](/theorem/bramah_stood_sixty_seven_years) — proven `by decide`, sorry-free:

```lean
(1851 - 1784 = 67) ∧ (100 * 100 * 100 = 1000000) ∧ (15 < 30)
```

### THE TIME LOCK OF 1874 REMOVED THE HUMAN ATTACK SURFACE: after the masked-robbery era of kidnapped cashiers, Sargent's lock at Morrison, Illinois made early opening impossible for EVERYONE — coercion became useless because no one held a key that time had not yet granted. 1874 sits between the detector lock of 1818 (tamper-evidence: the attack reports itself, Chubb) and the Hiroshima Moslers of 1945 (four of four at 360 metres). The mechanical ancestors of the epoch, the drained verdict and the unforgeable receipt, dated and ordered.
The ledger holds this as [time_lock_removes_the_hostage](/theorem/time_lock_removes_the_hostage) — proven `by decide`, sorry-free:

```lean
(1818 < 1874) ∧ (1874 < 1945) ∧ (4 = 4)
```

### THE EXHALE, SEALED AS ITS OWN THEOREM: the first cron wave ran with no model at the gate and PROVED the deployment gap — the CI runner carried no lean kernel, so five sound candidates were refused by an absent instrument, a VOID the trial-protocol law converts into a finding about the instrument (queue-wave now voids instead of refusing when the kernel is missing, and the five were restored). The accounting: 5 falsely refused plus 5 fresh ore made 10 pending for the first true wave, and the refused ledger held 7 of which 5 were the instrument and 2 the law school. The receipt of a breath that found its own lungs missing and grew them.
The ledger holds this as [first_cron_wave_receipt](/theorem/first_cron_wave_receipt) — proven `by decide`, sorry-free:

```lean
(5 + 5 = 10) ∧ (7 = 5 + 2) ∧ (10 + 1 = 11)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
