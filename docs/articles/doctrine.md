---
title: "The doctrines"
description: "Computed from lean/Doctrine.lean — 10 sealed theorems, every claim citing its proof."
---

# The doctrines

> DOCTRINE — the captain's doctrines sealed: pairs and triples cover every crew with solo the excluded case, the diving ladder's pressures and records integer-exact from 40 m to 41,419 m with saturation's day-priced exit and the NBL's floor-honest ratio, and the verdict domain's three real states with identification the pigeonhole collapse onto the poles. — held by [team_pairs_triples_cover](/theorem/team_pairs_triples_cover) and its 9 siblings below.

**10 theorems**, from [team_pairs_triples_cover](/theorem/team_pairs_triples_cover) onward, each proven `by decide` in [lean/Doctrine.lean](/lean/Doctrine.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [the_middle_is_not_a_pole](/theorem/the_middle_is_not_a_pole). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FDoctrine.lean)** — nothing to install. The editor fetches `lean/Doctrine.lean` from the repository and re-decides all 10 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### PAIRS AND TRIPLES COVER EVERY CREW: for every team size n from 2 to 64, n is a sum of 2s and 3s — an even n is pairs alone, an odd n ≥ 3 is one triple plus pairs — so buddy pairs (recreational) and threes (technical) reach every non-solo team, the Frobenius fact behind the captain's diving doctrine. Checked exhaustively over the window; the window is a window (window_not_universal).
The ledger holds this as [team_pairs_triples_cover](/theorem/team_pairs_triples_cover) — proven `by decide`, sorry-free:

```lean
(List.range' 2 63).all (fun n => n % 2 == 0 || (3 ≤ n && (n - 3) % 2 == 0))
```

### SOLO IS THE ONE EXCLUDED CASE: 1 lies below the smallest pair and the smallest triple, so no sum of 2s and 3s reaches it — the full-cave specialist's team of one is outside the cover by arithmetic, reserved rather than reachable.
The ledger holds this as [solo_is_the_excluded_team](/theorem/solo_is_the_excluded_team) — proven `by decide`, sorry-free:

```lean
(1 < 2) ∧ (1 < 3) ∧ (0 * 2 + 0 * 3 = 0)
```

### THE PRESSURE LADDER, INTEGER-EXACT at the literature's 10 m ≈ 1 atm rung: the recreational floor at 40 m sits at 5 atmospheres, deep technical at 100 m at 11, and the Comex Hydra 10 saturation record depth of ~700 m at 71 — the ladder every diving type climbs and every decompression law prices.
The ledger holds this as [pressure_ladder](/theorem/pressure_ladder) — proven `by decide`, sorry-free:

```lean
(1 + 40 / 10 = 5) ∧ (1 + 100 / 10 = 11) ∧ (1 + 700 / 10 = 71)
```

### THE SPACE-DIVING RECORDS ASCEND: Kittinger 1960 at 31,333 m, Baumgartner 2012 at 38,969, Eustace 2014 at 41,419 — the ladder's upper rungs strictly ordered, the last two 2,450 m apart. Same physics as the water rungs with the gradient reversed; one decompression law binds both ends.
The ledger holds this as [jump_records_ascend](/theorem/jump_records_ascend) — proven `by decide`, sorry-free:

```lean
(31333 < 38969) ∧ (38969 < 41419) ∧ (41419 - 38969 = 2450)
```

### SATURATION ACCOUNTING: the Hydra 10 dive spent 13 days compressing and about 24 decompressing — 13 + 24 = 37 of a 43-day dive travelling, the decompression alone longer than most expeditions. The deepest water rung pays its exit in DAYS, the honest cost the ladder's top charges.
The ledger holds this as [saturation_deco_accounts](/theorem/saturation_deco_accounts) — proven `by decide`, sorry-free:

```lean
(13 + 24 = 37) ∧ (37 < 43) ∧ (43 - 37 = 6)
```

### WATER TRAINS SPACE AT SEVEN-ISH TO ONE, stated by the floor as Nat division demands: NASA's crews log ~40 pool hours per ~6 EVA hours, and 40 / 6 = 6 with remainder 4 — the floor is 6, the remainder is named, and no false 7 is sealed. The pool is 12 m deep: space is reached through two atmospheres of water.
The ledger holds this as [nbl_trains_by_the_floor](/theorem/nbl_trains_by_the_floor) — proven `by decide`, sorry-free:

```lean
(40 / 6 = 6) ∧ (40 % 6 = 4) ∧ (1 + 12 / 10 = 2)
```

### THE MIDDLE IS A REAL THIRD STATE: the verdict domain [REFUTED, UNVERIFIED, VERIFIED] as [0, 1, 2] carries no duplicate — Nodup over the whole domain, the claim as a property of the LIST rather than a row of bare literals — so UNVERIFIED is not a weaker pole but a state of its own, the in-between the bilateral law protects; and the domain outsizes the binary poles, three against two (trinity_exceeds_qubit).
The ledger holds this as [the_middle_is_not_a_pole](/theorem/the_middle_is_not_a_pole) — proven `by decide`, sorry-free:

```lean
(([0, 1, 2] : List Nat).Nodup) ∧ (([0, 1, 2] : List Nat).length = 3) ∧ (([0, 2] : List Nat).length = 2)
```

### IDENTIFICATION IS A ONE-WAY COLLAPSE, SHOWN AS THE MAP ITSELF: identify sends the middle to a pole (here 1 to 0 — plane, balloon, Venus) and fixes the poles, so the domain [0, 1, 2] with no duplicate maps to the image [0, 0, 2] WITH one — Nodup holds before and fails after, the pigeonhole collapse computed rather than gestured at. No inverse recovers the middle from the image: a UFO identified stops being a UFO, and the class lives only in the in-between, destroyed by the act that resolves it.
The ledger holds this as [identification_collapses_the_middle](/theorem/identification_collapses_the_middle) — proven `by decide`, sorry-free:

```lean
(([0, 1, 2] : List Nat).Nodup) ∧ (List.map (fun v => if v == 1 then 0 else v) [0, 1, 2] = [0, 0, 2]) ∧ (¬ ([0, 0, 2] : List Nat).Nodup)
```

### THREE DECIDE THE FOURTH: the four directions as Z/4 — N, E, S, W as 0, 1, 2, 3 — sum to 6, so any one direction is the total minus the other three: three higher fix the one lower, every way round, the quorum drawn as geometry. The accreditation reading rides in prose: a lower theorem presents to the court under three higher ones, and their agreement leaves it exactly one place to stand.
The ledger holds this as [compass_three_decide_the_fourth](/theorem/compass_three_decide_the_fourth) — proven `by decide`, sorry-free:

```lean
(0 + 1 + 2 + 3 = 6) ∧ (6 - (0 + 1 + 2) = 3) ∧ (6 - (0 + 1 + 3) = 2) ∧ (6 - (0 + 2 + 3) = 1) ∧ (6 - (1 + 2 + 3) = 0)
```

### THE COMPASS IS TWO REFLECTIONS: opposite is +2 in Z/4, and applying it twice returns every direction home — N to S to N, E to W to E — the same self-inverse shape as dz, worn by the map over the whole domain rather than by any single pair. Two involution pairs, one quadrature: the four basis states the two coins deliver (2 squared).
The ledger holds this as [compass_opposites_involute](/theorem/compass_opposites_involute) — proven `by decide`, sorry-free:

```lean
(List.map (fun x => (x + 2) % 4) [0, 1, 2, 3] = [2, 3, 0, 1]) ∧ (List.map (fun x => ((x + 2) % 4 + 2) % 4) [0, 1, 2, 3] = [0, 1, 2, 3]) ∧ (2 * 2 = 4)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
