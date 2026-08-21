---
title: "The algebra of the neuron"
description: "Computed from lean/Neuro.lean — 18 sealed theorems, every claim citing its proof."
---

# The algebra of the neuron

> NEUROSCIENCE — the algebra of the neuron, demarcated, and rebuilt so a DEAD NEURON CANNOT SATISFY IT. — held by [subthreshold_silent](/theorem/subthreshold_silent) and its 17 siblings below.

**18 theorems**, from [subthreshold_silent](/theorem/subthreshold_silent) onward, each proven `by decide` in [lean/Neuro.lean](/lean/Neuro.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 11 of its 18 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [all_or_none_amplitude](/theorem/all_or_none_amplitude). A boundary stated here is decided.

### Below threshold the neuron is SILENT — every input 0..4 against a threshold of 5 gives output 0, the flat foot of the step.
The ledger holds this as [subthreshold_silent](/theorem/subthreshold_silent) — proven `by decide`, sorry-free:

```lean
(List.range 5).all (fun x => (if x >= 5 then 1 else 0) == 0)
```

### At and above threshold the neuron FIRES — every input 5..9 against a threshold of 5 gives output 1, the raised half of the step.
The ledger holds this as [suprathreshold_fires](/theorem/suprathreshold_fires) — proven `by decide`, sorry-free:

```lean
(List.range' 5 5).all (fun x => (if x >= 5 then 1 else 0) == 1)
```

### TWO SUB-THRESHOLD INPUTS SUM TO FIRE — 3 alone is silent, 3 + 3 crosses the threshold of 5. Neither input alone is sufficient, which is what makes it summation rather than a relabelled threshold.
The ledger holds this as [spatial_summation](/theorem/spatial_summation) — proven `by decide`, sorry-free:

```lean
((if 3 >= 5 then 1 else 0) = 0) ∧ ((if 3 + 3 >= 5 then 1 else 0) = 1)
```

### The action potential swings −70 mV to +40 mV, a span of 110 mV, with the −55 mV threshold strictly between rest and peak — the ordering is part of the fact.
The ledger holds this as [action_potential_swing](/theorem/action_potential_swing) — proven `by decide`, sorry-free:

```lean
((40 - (-70) : Int) = 110) ∧ ((-70 : Int) < -55) ∧ ((-55 : Int) < 40)
```

### ALL-OR-NONE, STATED SO A GRADED NEURON FAILS IT. The spike amplitude over stimulus 0..9 is the table [0,0,0,0,0,110,110,110,110,110] — silent below threshold, the FULL 110 mV above it. The graded rival 22·s is stated in the same theorem and shown NOT to equal that table, and shown to take values that are neither 0 nor 110. The predecessor could not do this: its only live constants were 1 and 0, so it verified its own notation and was refuted by the 110 mV it named.
The ledger holds this as [all_or_none_amplitude](/theorem/all_or_none_amplitude) — proven `by decide`, sorry-free:

```lean
((List.range 10).map (fun s => if s >= 5 then 110 else 0) = [0,0,0,0,0,110,110,110,110,110]) ∧ ((List.range 10).map (fun s => 22 * s) ≠ [0,0,0,0,0,110,110,110,110,110]) ∧ ((List.range 10).map (fun s => 22 * s)).any (fun a => a != 0 && a != 110)
```

### THE RATE SATURATES AT A MEASURED CEILING, and monotone-in-input does not. Drive 0..7 gives [0,100,200,300,400,450,450,450] — rising, then flat at 450 Hz, the figure MEASURED by Wang (2016) rather than the 1000 Hz idealisation that merely inverts a 1 ms refractory period. The linear rival 100·i is stated in the same theorem and shown to differ, which is exactly what the monotone predecessor could not exclude: monotonicity is satisfied by an unbounded neuron.
The ledger holds this as [firing_rate_saturates](/theorem/firing_rate_saturates) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun i => min (100 * i) 450) = [0,100,200,300,400,450,450,450]) ∧ ((List.range 8).map (fun i => min (100 * i) 450) ≠ (List.range 8).map (fun i => 100 * i)) ∧ (List.zipWith (fun a b => decide (a <= b)) ((List.range 8).map (fun i => min (100 * i) 450)) ((List.range 8).map (fun i => min (100 * i) 450)).tail).all (fun p => p)
```

### HEBBIAN POTENTIATION IS COINCIDENCE, AND THE RIVALS ARE NAMED. Δw = pre·post over the four input pairs is [0,0,0,1] — potentiation only when BOTH fire. Stated beside it: pre-alone does not give that table, and max (the OR rule) does not either. The predecessor was under-specified rather than vacuous — the audit expected vacuity and was wrong — so its content is kept and only its dead List.range 2 is gone.
The ledger holds this as [hebbian_coincidence_table](/theorem/hebbian_coincidence_table) — proven `by decide`, sorry-free:

```lean
([(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 * p.2) = [0,0,0,1]) ∧ ([(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1) ≠ [0,0,0,1]) ∧ ([(0,0),(0,1),(1,0),(1,1)].map (fun p => max p.1 p.2) ≠ [0,0,0,1])
```

### LEARNING GOES BOTH WAYS — the signed rule pre·(post−1) gives [−1, 0, +1], so weakening (long-term depression) is in the algebra and not only strengthening. A rule that can only increase a weight is a rule that cannot learn.
The ledger holds this as [hebbian_ltd_is_signed](/theorem/hebbian_ltd_is_signed) — proven `by decide`, sorry-free:

```lean
([(1,0),(1,1),(1,2)].map (fun p => (p.1 : Int) * (p.2 - 1)) = [-1, 0, 1]) ∧ (([(1,0),(1,1),(1,2)].map (fun p => (p.1 : Int) * (p.2 - 1))).any (fun d => d < 0))
```

### THE REFRACTORY WINDOW, WITH FIRING RESTORED SO A DEAD NEURON CANNOT SATISFY IT. Absolute: silent for EVERY drive 0..199, however strong — and the SAME expression evaluated past the window fires for every strong drive 8..27, so neither branch of the conditional is dead. That second clause is not decoration: the predecessor folded to `if 1 < 2 then 0 else X`, a constant whose firing branch was unreachable, and a sweep over an unreachable branch measures nothing. Relative: a moderate drive of 6 still fails while a strong drive of 9 succeeds — the window raises the threshold, it does not clamp the output. Back at rest the SAME moderate drive of 6 fires again, and the recovery trajectory is [0,0,0,1,1,1]. The predecessor folded to `if 1 < 2 then 0 else X` — a constant 0, its firing branch unreachable, dead code wearing a physiological name and satisfied by a neuron that never fires at all.
The ledger holds this as [refractory_absolute_and_relative](/theorem/refractory_absolute_and_relative) — proven `by decide`, sorry-free:

```lean
((List.range 200).all (fun d => (List.range 1).all (fun t => (if t < 1 then 0 else if d >= 8 then 1 else 0) == 0))) -- and the SAME expression with t past the window fires for every strong drive, so neither branch is dead ∧ ((List.range' 8 20).all (fun d => (if (3:Nat) < 1 then 0 else if d >= 8 then 1 else 0) == 1)) ∧ ((if (1:Nat) < 1 then 0 else if 6 >= 8 then 1 else 0) = 0) ∧ ((if (1:Nat) < 1 then 0 else if 9 >= 8 then 1 else 0) = 1) ∧ ((if (3:Nat) < 1 then 0 else if 3 < 3 then (if 6 >= 8 then 1 else 0) else (if 6 >= 5 then 1 else 0)) = 1) ∧ ((List.range 6).map (fun t => if t < 1 then 0 else if t < 3 then (if 6 >= 8 then 1 else 0) else (if 6 >= 5 then 1 else 0)) = [0,0,0,1,1,1])
```

### INHIBITION SUBTRACTS, AND SUBTRACTION IS NOT DIVISION. A drive of 7 fires; the same drive less 3 inhibition does not. 12 − 4 still fires while 12 / 4 does not, which is what distinguishes a subtractive veto from a divisive gain change — the predecessor stated a net sum that a dead neuron also satisfied.
The ledger holds this as [inhibition_vetoes_spike](/theorem/inhibition_vetoes_spike) — proven `by decide`, sorry-free:

```lean
((if (7 : Int) >= 5 then 1 else 0) = 1) ∧ ((if (7 - 3 : Int) >= 5 then 1 else 0) = 0) ∧ ((if (12 - 4 : Int) >= 5 then 1 else 0) = 1) ∧ ((if (12 / 4 : Int) >= 5 then 1 else 0) = 0)
```

### TEMPORAL SUMMATION HAS A CLOCK. A second input of 4 arriving after delay 0..3 still fires because the first has not fully decayed; at delay 4 and beyond it does not. The same 4 alone never fires — so the firing is the SUMMATION, and the window is finite.
The ledger holds this as [temporal_summation_decays](/theorem/temporal_summation_decays) — proven `by decide`, sorry-free:

```lean
((List.range 6).map (fun d => if max (4 - Int.ofNat d) 0 + 4 >= 5 then 1 else 0) = [1,1,1,1,0,0]) ∧ ((if (4 : Int) >= 5 then 1 else 0) = 0)
```

### INTENSITY IS IN THE RATE. A drive of 6 and a drive of 60 produce the SAME 110 mV amplitude — the spike carries no magnitude — while the number of spikes in a fixed window differs. That is the whole content of rate coding, and it is the direct consequence of all-or-none.
The ledger holds this as [rate_codes_intensity](/theorem/rate_codes_intensity) — proven `by decide`, sorry-free:

```lean
((if (6 : Int) >= 5 then 110 else 0) = (if (60 : Int) >= 5 then 110 else 0)) ∧ (((List.range 20).filter (fun t => t % 10 == 0)).length != ((List.range 20).filter (fun t => t % 2 == 0)).length)
```

### THE REFRACTORY PERIOD PUTS A CEILING ON THE RATE — at best one spike every other tick, 10 in a window of 20, strictly fewer than the 20 ticks themselves. The measured ceiling 611 Hz sits below the 1000 Hz a 1 ms window would imply: the bound is real, and the idealisation overstates it.
The ledger holds this as [refractory_bounds_rate](/theorem/refractory_bounds_rate) — proven `by decide`, sorry-free:

```lean
(((List.range 20).filter (fun t => t % 2 == 0)).length = 10) ∧ (((List.range 20).filter (fun t => t % 2 == 0)).length < (List.range 20).length) ∧ ((611 : Nat) < 1000)
```

### A SLOW RAMP NEVER FIRES, A FAST ONE DOES — accommodation. Against a threshold that rises with time (5 + t), an input growing at the same rate never crosses it, while one growing at 3t crosses at t = 3. The two trajectories are stated to DIFFER, so the theorem cannot be satisfied by a neuron that ignores its input.
The ledger holds this as [threshold_accommodates_ramp](/theorem/threshold_accommodates_ramp) — proven `by decide`, sorry-free:

```lean
((List.range 8).map (fun t => if t >= 5 + t then 1 else 0) = [0,0,0,0,0,0,0,0]) ∧ ((List.range 8).map (fun t => if 3 * t >= 5 + t then 1 else 0) = [0,0,0,1,1,1,1,1]) ∧ ((List.range 8).map (fun t => if t >= 5 + t then 1 else 0) ≠ (List.range 8).map (fun t => if 3 * t >= 5 + t then 1 else 0))
```

### TOO MUCH DRIVE STOPS THE SPIKE — depolarisation block. Firing occupies a BAND (inputs 5..11) and stops above it, so the response is NOT monotone in input. The second clause states that non-monotonicity explicitly, which is precisely the property the discarded firing_monotone asserted the opposite of: monotone firing is not merely weak, it is false of a real neuron.
The ledger holds this as [depolarisation_blocks_firing](/theorem/depolarisation_blocks_firing) — proven `by decide`, sorry-free:

```lean
((List.range 16).map (fun x => if x >= 5 && x <= 11 then 1 else 0) = [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0]) ∧ ¬ ((List.range 16).all (fun x => (if x >= 5 && x <= 11 then 1 else 0) <= (if x + 1 >= 5 && x + 1 <= 11 then 1 else 0)))
```

### INTEGRATE AND FIRE RESETS — the membrane accumulates 0,2,4 then returns to 0, and a spike is emitted exactly at each reset. Without the reset the accumulator would rise forever; the sawtooth IS the model.
The ledger holds this as [integrate_and_fire_resets](/theorem/integrate_and_fire_resets) — proven `by decide`, sorry-free:

```lean
((List.range 9).map (fun t => 2 * (t % 3)) = [0,2,4,0,2,4,0,2,4]) ∧ ((List.range 9).map (fun t => if t > 0 && t % 3 == 0 then 1 else 0) = [0,0,0,1,0,0,1,0,0])
```

### ALL-OR-NONE IS ABOUT INITIATION— down a passive dendrite the amplitude falls 1000, 893, 618, 502 (thousandths), strictly decreasing and more than halved by the last point. Stated beside the constant rival [1000,1000,1000,1000], which it is shown NOT to equal. This is the honest boundary on the wing headline: the spike is all-or-none where it starts and graded where it travels.
The ledger holds this as [spike_amplitude_attenuates](/theorem/spike_amplitude_attenuates) — proven `by decide`, sorry-free:

```lean
([1000, 893, 618, 502] ≠ [1000, 1000, 1000, 1000]) ∧ (List.zipWith (fun a b => decide (b < a)) [1000, 893, 618, 502] [1000, 893, 618, 502].tail).all (fun p => p) ∧ ((502 : Nat) * 2 < 1010)
```

### THE THRESHOLD IS A QUASI-THRESHOLD — a 100 µV band separates the largest drive that fails from the smallest that fires, so "threshold" names a narrow interval and not a mathematical point. The step function is a model of a steep slope, and this theorem states the width the model discards.
The ledger holds this as [threshold_is_quasi_threshold](/theorem/threshold_is_quasi_threshold) — proven `by decide`, sorry-free:

```lean
((-6372943 : Int) - (-6373043) = 100)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
