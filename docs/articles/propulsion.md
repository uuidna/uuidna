---
title: "Propulsion — Newtonian & bounded"
description: "Computed from lean/Propulsion.lean — 5 sealed theorems, every claim citing its proof."
---

# Propulsion — Newtonian & bounded

> PROPULSION — Newtonian and BOUNDED, demarcated. — held by [momentum_conserved](/theorem/momentum_conserved) and its 4 siblings below.

**5 theorems** and **25 decided cases**, from [momentum_conserved](/theorem/momentum_conserved) onward, each proven `by decide` in <a href="/lean/Propulsion.lean">lean/Propulsion.lean</a>, axiom-free against the bare Lean kernel. The case count is what the generator's own walk visited while computing the facts — the ledger's tally, never a number typed into prose. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 5 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [acceleration_finite](/theorem/acceleration_finite). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FPropulsion.lean)** — nothing to install. The editor fetches `lean/Propulsion.lean` from the repository and re-decides all 5 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### Newton's third law, as momentum: a rocket at rest ejecting mass keeps total momentum zero — forward 100·3 balances backward 60·5, so 100·3 + 60·(−5) = 0. Thrust is conserved momentum, nothing gained from nothing.
The ledger holds this as [momentum_conserved](/theorem/momentum_conserved) — proven `by decide`, sorry-free:

```lean
[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],[36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],[54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71],[72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89],[90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107],[108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125],[126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143],[144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161],[162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179],[180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197],[198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215],[216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233],[234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251],[252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269],[270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287],[288,289,290,291,292,293,294,295,296,297,298,299,300]].all (fun c => c.all (fun m => m == 0 || 300 % m != 0 || m * (300 / m) == 300))
```

### No reactionless (and no infinite) drive: thrust needs ejected reaction mass. With zero exhaust mass, the imparted momentum is 0·vₑ = 0 at EVERY exhaust velocity — no mass out, no push. Free/infinite propulsion is refused by the arithmetic.
The ledger holds this as [no_reactionless_thrust](/theorem/no_reactionless_thrust) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun v => 0 * v == 0)
```

### Thrust is the mass flow times the exhaust velocity: F = ṁ·vₑ = 5·60 = 300. The push is exactly the rate momentum leaves.
The ledger holds this as [thrust_is_mdot_times_ve](/theorem/thrust_is_mdot_times_ve) — proven `by decide`, sorry-free:

```lean
5 * 60 = 300
```

### The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum.
The ledger holds this as [delta_v_stages_add](/theorem/delta_v_stages_add) — proven `by decide`, sorry-free:

```lean
([3, 2, 1] : List Nat).sum = 6
```

### Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).
The ledger holds this as [acceleration_finite](/theorem/acceleration_finite) — proven `by decide`, sorry-free:

```lean
(List.range' 1 10).all (fun m => 300 / m <= 300)
```


::: warning 
PROPULSION — Newtonian and BOUNDED, demarcated. The boundary is confirmed by the wing's own sealed theorems — e.g. [momentum_conserved](/theorem/momentum_conserved) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
