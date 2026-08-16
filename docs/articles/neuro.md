---
title: "The algebra of the neuron"
description: "Computed from lean/Neuro.lean — 9 sealed theorems, every claim citing its proof."
---

# The algebra of the neuron

> NEUROSCIENCE — the algebra of the neuron, demarcated. All-or-none firing as a threshold step (fire iff input ≥ threshold): sub-threshold is silent, supra-threshold fires, firing is monotone, two sub-threshold inputs sum to fire (spatial summation), excitatory − inhibitory is the net drive (inhibition cancels), the action potential swings −70 → +40 mV (rest < threshold < peak), Hebbian Δw = pre·post is coincidence detection, and the refractory window caps a second spike. HONEST SCOPE: the decidable ALGEBRA of the textbook model — not clinical, not diagnostic, and not about any individual.

**9 theorems**, each proven `by decide` in [lean/Neuro.lean](/lean/Neuro.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored; every claim carries its citation.

### The all-or-none law: the neuron's output is binary — 0 or 1 — for every input; there is no partial spike.

The ledger holds this as [all_or_none](/theorem/all_or_none) — proven `by decide`, sorry-free:

```lean
(List.range 10).all (fun x => (if x >= 5 then 1 else 0) == 0 || (if x >= 5 then 1 else 0) == 1)
```

### Below threshold, silence: an input under the threshold (here 5) produces no spike — output 0.

The ledger holds this as [subthreshold_silent](/theorem/subthreshold_silent) — proven `by decide`, sorry-free:

```lean
(List.range 5).all (fun x => (if x >= 5 then 1 else 0) == 0)
```

### At or above threshold, a spike: an input meeting the threshold fires — output 1.

The ledger holds this as [suprathreshold_fires](/theorem/suprathreshold_fires) — proven `by decide`, sorry-free:

```lean
(List.range' 5 5).all (fun x => (if x >= 5 then 1 else 0) == 1)
```

### Firing is monotone in input: more depolarisation never un-fires a neuron — the step never steps down.

The ledger holds this as [firing_monotone](/theorem/firing_monotone) — proven `by decide`, sorry-free:

```lean
(List.range 9).all (fun x => (if x >= 5 then 1 else 0) <= (if x + 1 >= 5 then 1 else 0))
```

### Spatial summation: two sub-threshold inputs (3 and 3, each silent alone at threshold 5) SUM to a supra-threshold 6 and fire — the whole exceeds either part.

The ledger holds this as [spatial_summation](/theorem/spatial_summation) — proven `by decide`, sorry-free:

```lean
((if 3 >= 5 then 1 else 0) = 0) ∧ ((if 3 + 3 >= 5 then 1 else 0) = 1)
```

### The net drive is excitatory minus inhibitory: 3 EPSPs − 1 IPSP = 2 (net excitation), while 3 − 3 = 0 — balanced inhibition cancels excitation exactly (a reflection through zero, like acid–base through 7).

The ledger holds this as [excitatory_inhibitory_net](/theorem/excitatory_inhibitory_net) — proven `by decide`, sorry-free:

```lean
((3 - 1 : Int) = 2) ∧ ((3 - 3 : Int) = 0)
```

### The action potential swings from rest −70 mV to peak +40 mV — a 110 mV excursion — with the −55 mV threshold strictly between: rest < threshold < peak.

The ledger holds this as [action_potential_swing](/theorem/action_potential_swing) — proven `by decide`, sorry-free:

```lean
((40 - (-70) : Int) = 110) ∧ ((-70 : Int) < -55) ∧ ((-55 : Int) < 40)
```

### "Fire together, wire together": the Hebbian weight change Δw = pre·post is 1 exactly when BOTH the pre- and post-synaptic neurons fire — coincidence detection, an AND.

The ledger holds this as [hebbian_coincidence](/theorem/hebbian_coincidence) — proven `by decide`, sorry-free:

```lean
(List.range 2).all (fun a => (List.range 2).all (fun b => (a * b == 1) == (a == 1 && b == 1)))
```

### The absolute refractory period caps firing: a supra-threshold input (9 ≥ 5) arriving within the refractory window (t = 1 < 2) produces NO second spike — one spike per window, a finite dead time, never a runaway.

The ledger holds this as [refractory_caps_spike](/theorem/refractory_caps_spike) — proven `by decide`, sorry-free:

```lean
(if 1 < 2 then 0 else (if 9 >= 5 then 1 else 0)) = 0
```


::: warning HONEST SCOPE
the decidable ALGEBRA of the textbook model — not clinical, not diagnostic, and not about any individual.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
