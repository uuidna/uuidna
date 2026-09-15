---
title: "The right to land and the public's access to it"
description: "Computed from lean/LandRights.lean — 7 sealed theorems, every claim citing its proof."
---

# The right to land and the public's access to it

> The right to land and the public's access to it — integers from src/rights/land-instruments.json, each instrument read from its official source; integrity of the table, not legal advice — held by [land_rights_enter_force_no_earlier_than_adopted](/theorem/land_rights_enter_force_no_earlier_than_adopted) and its 6 siblings below.

**7 theorems** and **91 decided cases**, from [land_rights_enter_force_no_earlier_than_adopted](/theorem/land_rights_enter_force_no_earlier_than_adopted) onward, each proven `by decide` in <a href="/lean/LandRights.lean">lean/LandRights.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. This wing states what HOLDS and seals no boundary of its own — read its honest scope in the wing header, which is not a theorem.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FLandRights.lean)** — nothing to install. The editor fetches `lean/LandRights.lean` from the repository and re-decides all 7 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### each of the 12 instruments that carry both years entered into force no earlier than it was adopted
The ledger holds this as [land_rights_enter_force_no_earlier_than_adopted](/theorem/land_rights_enter_force_no_earlier_than_adopted) — proven `by decide`, sorry-free:

```lean
([(1966, 1976), (1966, 1976), (1989, 1991), (1998, 2001), (1981, 1986), (1969, 1978), (1957, 1957), (2004, 2004), (1991, 1991), (2007, 2008), (2011, 2011), (1999, 2000)].all (fun p => p.1 ≤ p.2)) ∧ ([(1966, 1976), (1966, 1976), (1989, 1991), (1998, 2001), (1981, 1986), (1969, 1978), (1957, 1957), (2004, 2004), (1991, 1991), (2007, 2008), (2011, 2011), (1999, 2000)].map (fun p => p.2 - p.1) = [10, 10, 2, 3, 5, 9, 0, 0, 0, 1, 0, 1])
```

### every one of the 5 recorded votes adds up to its total and carries its majority
The ledger holds this as [land_rights_recorded_votes_carry_their_majorities](/theorem/land_rights_recorded_votes_carry_their_majorities) — proven `by decide`, sorry-free:

```lean
([(48, 0, 8), (143, 4, 11), (121, 8, 54), (161, 0, 8), (43, 0, 4)].all (fun v => v.1 > v.2.1 + v.2.2)) ∧ ([(48, 0, 8), (143, 4, 11), (121, 8, 54), (161, 0, 8), (43, 0, 4)].map (fun v => v.1 + v.2.1 + v.2.2) = [56, 158, 183, 169, 47])
```

### each of the 2 environment-right resolutions drew zero votes against
The ledger holds this as [the_environment_right_drew_no_vote_against](/theorem/the_environment_right_drew_no_vote_against) — proven `by decide`, sorry-free:

```lean
([0, 0].length > 0) ∧ ([0, 0].all (fun n => n == 0))
```

### the innmark closed season sums to 168 days over its 7 month segments
The ledger holds this as [norway_innmark_is_closed_one_hundred_sixty_eight_days](/theorem/norway_innmark_is_closed_one_hundred_sixty_eight_days) — proven `by decide`, sorry-free:

```lean
30 - 30 + 1 + [31, 30, 31, 31, 30].foldl (· + ·) 0 + 14 = 168
```

### all 15 access instruments were adopted after the Charter of the Forest
The ledger holds this as [access_laws_stand_centuries_after_the_charter_of_the_forest](/theorem/access_laws_stand_centuries_after_the_charter_of_the_forest) — proven `by decide`, sorry-free:

```lean
([1948, 1966, 2012, 1974, 1998, 1957, 2003, 2000, 2004, 2013, 1991, 2007, 2011, 1999, 1892].all (fun y => 1217 < y)) ∧ ([1948, 1966, 2012, 1974, 1998, 1957, 2003, 2000, 2004, 2013, 1991, 2007, 2011, 1999, 1892].map (fun y => y - 1217) = [731, 749, 795, 757, 781, 740, 786, 783, 787, 796, 774, 790, 794, 782, 675])
```

### Bulgaria’s 4 access instruments were each adopted in a later year, the constitution first
The ledger holds this as [bulgarias_access_instruments_follow_its_constitution](/theorem/bulgarias_access_instruments_follow_its_constitution) — proven `by decide`, sorry-free:

```lean
([1991, 1999, 2007, 2011].length > 1) ∧ (([1991, 1999, 2007, 2011].zip [1991, 1999, 2007, 2011].tail).all (fun p => p.1 < p.2))
```

### every one of the 16 access instruments records a qualification
The ledger holds this as [every_access_instrument_is_qualified](/theorem/every_access_instrument_is_qualified) — proven `by decide`, sorry-free:

```lean
([133, 119, 98, 209, 88, 111, 133, 143, 485, 213, 124, 256, 265, 150, 109, 110].length > 0) ∧ ([133, 119, 98, 209, 88, 111, 133, 143, 485, 213, 124, 256, 265, 150, 109, 110].all (fun n => n > 0))
```


::: warning 
The right to land and the public's access to it — integers from src/rights/land-instruments. The boundary is confirmed by the wing's own sealed theorems — e.g. [land_rights_enter_force_no_earlier_than_adopted](/theorem/land_rights_enter_force_no_earlier_than_adopted) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
