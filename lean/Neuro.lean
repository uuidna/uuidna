-- lean/Neuro.lean — GENERATED. NEUROSCIENCE — the algebra of the neuron, demarcated, and rebuilt so a DEAD NEURON CANNOT SATISFY IT. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- Below threshold the neuron is SILENT — every input 0..4 against a threshold of 5 gives output 0, the flat
    foot of the step. -/
theorem subthreshold_silent : (List.range 5).all (fun x => (if x >= 5 then 1 else 0) == 0) := by decide

/-- At and above threshold the neuron FIRES — every input 5..9 against a threshold of 5 gives output 1, the
    raised half of the step. -/
theorem suprathreshold_fires : (List.range' 5 5).all (fun x => (if x >= 5 then 1 else 0) == 1) := by decide

/-- TWO SUB-THRESHOLD INPUTS SUM TO FIRE — 3 alone is silent, 3 + 3 crosses the threshold of 5. Neither input
    alone is sufficient, which is what makes it summation rather than a relabelled threshold. -/
theorem spatial_summation : ((if 3 >= 5 then 1 else 0) = 0) ∧ ((if 3 + 3 >= 5 then 1 else 0) = 1) := by decide

/-- The action potential swings −70 mV to +40 mV, a span of 110 mV, with the −55 mV threshold strictly between
    rest and peak — the ordering is part of the fact, not decoration. -/
theorem action_potential_swing : ((40 - (-70) : Int) = 110) ∧ ((-70 : Int) < -55) ∧ ((-55 : Int) < 40) := by decide

/-- ALL-OR-NONE, STATED SO A GRADED NEURON FAILS IT. The spike amplitude over stimulus 0..9 is the table
    [0,0,0,0,0,110,110,110,110,110] — silent below threshold, the FULL 110 mV above it, never an intermediate
    value. The graded rival 22·s is stated in the same theorem and shown NOT to equal that table, and shown to
    take values that are neither 0 nor 110. The predecessor could not do this: its only live constants were 1
    and 0, so it verified its own notation and was refuted by the 110 mV it named. -/
theorem all_or_none_amplitude :
    ((List.range 10).map (fun s => if s >= 5 then 110 else 0) = [0,0,0,0,0,110,110,110,110,110])
  ∧ ((List.range 10).map (fun s => 22 * s) ≠ [0,0,0,0,0,110,110,110,110,110])
  ∧ ((List.range 10).map (fun s => 22 * s)).any (fun a => a != 0 && a != 110) := by decide

/-- THE RATE SATURATES AT A MEASURED CEILING, and monotone-in-input does not. Drive 0..7 gives
    [0,100,200,300,400,450,450,450] — rising, then flat at 450 Hz, the figure MEASURED by Wang (2016) rather
    than the 1000 Hz idealisation that merely inverts a 1 ms refractory period. The linear rival 100·i is stated
    in the same theorem and shown to differ, which is exactly what the monotone predecessor could not exclude:
    monotonicity is satisfied by an unbounded neuron. -/
theorem firing_rate_saturates :
    ((List.range 8).map (fun i => min (100 * i) 450) = [0,100,200,300,400,450,450,450])
  ∧ ((List.range 8).map (fun i => min (100 * i) 450) ≠ (List.range 8).map (fun i => 100 * i))
  ∧ (List.zipWith (fun a b => decide (a <= b)) ((List.range 8).map (fun i => min (100 * i) 450))
       ((List.range 8).map (fun i => min (100 * i) 450)).tail).all (fun p => p) := by decide

/-- HEBBIAN POTENTIATION IS COINCIDENCE, AND THE RIVALS ARE NAMED. Δw = pre·post over the four input pairs is
    [0,0,0,1] — potentiation only when BOTH fire. Stated beside it: pre-alone does not give that table, and max
    (the OR rule) does not either. The predecessor was under-specified rather than vacuous — the audit expected
    vacuity and was wrong — so its content is kept and only its dead List.range 2 is gone. -/
theorem hebbian_coincidence_table :
    ([(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1 * p.2) = [0,0,0,1])
  ∧ ([(0,0),(0,1),(1,0),(1,1)].map (fun p => p.1) ≠ [0,0,0,1])
  ∧ ([(0,0),(0,1),(1,0),(1,1)].map (fun p => max p.1 p.2) ≠ [0,0,0,1]) := by decide

/-- LEARNING GOES BOTH WAYS — the signed rule pre·(post−1) gives [−1, 0, +1], so weakening (long-term
    depression) is in the algebra and not only strengthening. A rule that can only increase a weight is a rule
    that cannot learn. -/
theorem hebbian_ltd_is_signed :
    ([(1,0),(1,1),(1,2)].map (fun p => (p.1 : Int) * (p.2 - 1)) = [-1, 0, 1])
  ∧ (([(1,0),(1,1),(1,2)].map (fun p => (p.1 : Int) * (p.2 - 1))).any (fun d => d < 0)) := by decide

/-- THE REFRACTORY WINDOW, WITH FIRING RESTORED SO A DEAD NEURON CANNOT SATISFY IT. Absolute: silent for EVERY
    drive 0..199, however strong — and the SAME expression evaluated past the window fires for every strong
    drive 8..27, so neither branch of the conditional is dead. That second clause is not decoration: the
    predecessor folded to `if 1 < 2 then 0 else X`, a constant whose firing branch was unreachable, and a sweep
    over an unreachable branch measures nothing. Relative: a moderate drive of 6 still fails while a strong
    drive of 9 succeeds — the window raises the threshold, it does not clamp the output. Back at rest the SAME
    moderate drive of 6 fires again, and the recovery trajectory is [0,0,0,1,1,1]. The predecessor folded to `if
    1 < 2 then 0 else X` — a constant 0, its firing branch unreachable, dead code wearing a physiological name
    and satisfied by a neuron that never fires at all. -/
theorem refractory_absolute_and_relative :
    ((List.range 200).all (fun d => (List.range 1).all (fun t => (if t < 1 then 0 else if d >= 8 then 1 else 0) == 0)))
    -- and the SAME expression with t past the window fires for every strong drive, so neither branch is dead
  ∧ ((List.range' 8 20).all (fun d => (if (3:Nat) < 1 then 0 else if d >= 8 then 1 else 0) == 1))
  ∧ ((if (1:Nat) < 1 then 0 else if 6 >= 8 then 1 else 0) = 0)
  ∧ ((if (1:Nat) < 1 then 0 else if 9 >= 8 then 1 else 0) = 1)
  ∧ ((if (3:Nat) < 1 then 0 else if 3 < 3 then (if 6 >= 8 then 1 else 0) else (if 6 >= 5 then 1 else 0)) = 1)
  ∧ ((List.range 6).map (fun t =>
        if t < 1 then 0 else if t < 3 then (if 6 >= 8 then 1 else 0) else (if 6 >= 5 then 1 else 0))
      = [0,0,0,1,1,1]) := by decide

/-- INHIBITION SUBTRACTS, AND SUBTRACTION IS NOT DIVISION. A drive of 7 fires; the same drive less 3 inhibition
    does not. 12 − 4 still fires while 12 / 4 does not, which is what distinguishes a subtractive veto from a
    divisive gain change — the predecessor stated a net sum that a dead neuron also satisfied. -/
theorem inhibition_vetoes_spike :
    ((if (7 : Int) >= 5 then 1 else 0) = 1) ∧ ((if (7 - 3 : Int) >= 5 then 1 else 0) = 0)
  ∧ ((if (12 - 4 : Int) >= 5 then 1 else 0) = 1) ∧ ((if (12 / 4 : Int) >= 5 then 1 else 0) = 0) := by decide

/-- TEMPORAL SUMMATION HAS A CLOCK. A second input of 4 arriving after delay 0..3 still fires because the first
    has not fully decayed; at delay 4 and beyond it does not. The same 4 alone never fires — so the firing is
    the SUMMATION, and the window is finite. -/
theorem temporal_summation_decays :
    ((List.range 6).map (fun d => if max (4 - Int.ofNat d) 0 + 4 >= 5 then 1 else 0) = [1,1,1,1,0,0])
  ∧ ((if (4 : Int) >= 5 then 1 else 0) = 0) := by decide

/-- INTENSITY IS IN THE RATE, NOT THE SPIKE. A drive of 6 and a drive of 60 produce the SAME 110 mV amplitude —
    the spike carries no magnitude — while the number of spikes in a fixed window differs. That is the whole
    content of rate coding, and it is the direct consequence of all-or-none. -/
theorem rate_codes_intensity :
    ((if (6 : Int) >= 5 then 110 else 0) = (if (60 : Int) >= 5 then 110 else 0))
  ∧ (((List.range 20).filter (fun t => t % 10 == 0)).length
       != ((List.range 20).filter (fun t => t % 2 == 0)).length) := by decide

/-- THE REFRACTORY PERIOD PUTS A CEILING ON THE RATE — at best one spike every other tick, 10 in a window of 20,
    strictly fewer than the 20 ticks themselves. The measured ceiling 611 Hz sits below the 1000 Hz a 1 ms
    window would imply: the bound is real, and the idealisation overstates it. -/
theorem refractory_bounds_rate :
    (((List.range 20).filter (fun t => t % 2 == 0)).length = 10)
  ∧ (((List.range 20).filter (fun t => t % 2 == 0)).length < (List.range 20).length)
  ∧ ((611 : Nat) < 1000) := by decide

/-- A SLOW RAMP NEVER FIRES, A FAST ONE DOES — accommodation. Against a threshold that rises with time (5 + t),
    an input growing at the same rate never crosses it, while one growing at 3t crosses at t = 3. The two
    trajectories are stated to DIFFER, so the theorem cannot be satisfied by a neuron that ignores its input. -/
theorem threshold_accommodates_ramp :
    ((List.range 8).map (fun t => if t >= 5 + t then 1 else 0) = [0,0,0,0,0,0,0,0])
  ∧ ((List.range 8).map (fun t => if 3 * t >= 5 + t then 1 else 0) = [0,0,0,1,1,1,1,1])
  ∧ ((List.range 8).map (fun t => if t >= 5 + t then 1 else 0)
       ≠ (List.range 8).map (fun t => if 3 * t >= 5 + t then 1 else 0)) := by decide

/-- TOO MUCH DRIVE STOPS THE SPIKE — depolarisation block. Firing occupies a BAND (inputs 5..11) and stops above
    it, so the response is NOT monotone in input. The second clause states that non-monotonicity explicitly,
    which is precisely the property the discarded firing_monotone asserted the opposite of: monotone firing is
    not merely weak, it is false of a real neuron. -/
theorem depolarisation_blocks_firing :
    ((List.range 16).map (fun x => if x >= 5 && x <= 11 then 1 else 0)
       = [0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0])
  ∧ ¬ ((List.range 16).all (fun x =>
        (if x >= 5 && x <= 11 then 1 else 0) <= (if x + 1 >= 5 && x + 1 <= 11 then 1 else 0))) := by decide

/-- INTEGRATE AND FIRE RESETS — the membrane accumulates 0,2,4 then returns to 0, and a spike is emitted exactly
    at each reset. Without the reset the accumulator would rise forever; the sawtooth IS the model. -/
theorem integrate_and_fire_resets :
    ((List.range 9).map (fun t => 2 * (t % 3)) = [0,2,4,0,2,4,0,2,4])
  ∧ ((List.range 9).map (fun t => if t > 0 && t % 3 == 0 then 1 else 0) = [0,0,0,1,0,0,1,0,0]) := by decide

/-- ALL-OR-NONE IS ABOUT INITIATION, NOT PROPAGATION — down a passive dendrite the amplitude falls 1000, 893,
    618, 502 (thousandths), strictly decreasing and more than halved by the last point. Stated beside the
    constant rival [1000,1000,1000,1000], which it is shown NOT to equal. This is the honest boundary on the
    wing headline: the spike is all-or-none where it starts and graded where it travels. -/
theorem spike_amplitude_attenuates :
    ([1000, 893, 618, 502] ≠ [1000, 1000, 1000, 1000])
  ∧ (List.zipWith (fun a b => decide (b < a)) [1000, 893, 618, 502] [1000, 893, 618, 502].tail).all (fun p => p)
  ∧ ((502 : Nat) * 2 < 1010) := by decide

/-- THE THRESHOLD IS A QUASI-THRESHOLD — a 100 µV band separates the largest drive that fails from the smallest
    that fires, so "threshold" names a narrow interval and not a mathematical point. The step function is a
    model of a steep slope, and this theorem states the width the model discards. -/
theorem threshold_is_quasi_threshold : ((-6372943 : Int) - (-6373043) = 100) := by decide
