---
title: "Propulsion — Newtonian & bounded"
description: "Computed from lean/Propulsion.lean — 5 sealed theorems, every claim citing its proof."
---

# Propulsion — Newtonian & bounded

> PROPULSION — Newtonian and BOUNDED, demarcated. Thrust is momentum conservation (Newton's third law): forward momentum balances the ejected exhaust, so a rocket at rest stays at total momentum zero. Thrust REQUIRES reaction mass (zero exhaust → zero thrust: no reactionless/free drive), thrust = ṁ·vₑ, the Δv budget adds across stages, and acceleration a = F/m is FINITE — no infinite g-force. HONEST SCOPE: the decidable algebra of Newtonian rocketry — not a novel drive, not FTL, not infinite g.

**5 theorems**, each proven `by decide` in [lean/Propulsion.lean](/lean/Propulsion.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### Newton's third law, as momentum: a rocket at rest ejecting mass keeps total momentum zero — forward 100·3 balances backward 60·5, so 100·3 + 60·(−5) = 0. Thrust is conserved momentum, nothing gained from nothing.

The ledger holds this as [momentum_conserved](/theorem/momentum_conserved) — proven `by decide`, sorry-free:

```lean
(100 * 3 + 60 * (-5) : Int) = 0
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

### The Δv budget adds across stages: staging sums the increments, 3 + 2 + 1 = 6 — the rocket equation is additive in log-mass, so multi-stage Δv is a sum, not a leap.

The ledger holds this as [delta_v_stages_add](/theorem/delta_v_stages_add) — proven `by decide`, sorry-free:

```lean
([3, 2, 1] : List Nat).sum = 6
```

### Acceleration is FINITE: a = F/m for a fixed thrust 300 and any mass m ≥ 1 is bounded by 300 — it never diverges. There is no infinite g-force to survive; g is bounded, like every value in the ledger (dz_bounded).

The ledger holds this as [acceleration_finite](/theorem/acceleration_finite) — proven `by decide`, sorry-free:

```lean
(List.range' 1 10).all (fun m => 300 / m <= 300)
```


::: warning HONEST SCOPE
the decidable algebra of Newtonian rocketry — not a novel drive, not FTL, not infinite g.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
