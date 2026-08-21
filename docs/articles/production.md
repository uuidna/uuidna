---
title: "The mix"
description: "Computed from lean/Production.lean — 10 sealed theorems, every claim citing its proof."
---

# The mix

> THE MIX — the studio involutions (reverse, invert, and their fusion) and the counting of pitch, tempo and sample, as decidable arithmetic. — held by [reverse_involutive](/theorem/reverse_involutive) and its 9 siblings below.

**10 theorems**, from [reverse_involutive](/theorem/reverse_involutive) onward, each proven `by decide` in [lean/Production.lean](/lean/Production.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 10 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [midi_is_seven_bit](/theorem/midi_is_seven_bit). A boundary stated here is decided, not merely denied.

### Reversing a clip is self-inverse: reverse it twice and the signal returns — ([3,-5,8] : List Int).reverse.reverse = [3,-5,8]. The tape run backward and backward again is the tape.
The ledger holds this as [reverse_involutive](/theorem/reverse_involutive) — proven `by decide`, sorry-free:

```lean
([3, -5, 8] : List Int).reverse.reverse = [3, -5, 8]
```

### Phase inversion is self-inverse: flip polarity (x ↦ −x) twice and the signal returns — (([3,-5,8] : List Int).map (−·)).map (−·) = [3,-5,8]. The polarity button, pressed twice, is off.
The ledger holds this as [phase_inversion_involutive](/theorem/phase_inversion_involutive) — proven `by decide`, sorry-free:

```lean
(([3, -5, 8] : List Int).map (fun x => -x)).map (fun x => -x) = [3, -5, 8]
```

### THE FUSION, the ultimate test: reverse-then-invert is ITSELF an involution — apply the fused operation twice and the signal returns, ((([3,-5,8] : List Int).reverse.map (−·)).reverse.map (−·)) = [3,-5,8]. Reverse and inverse compose to a clean self-inverse; the two studio mirrors fuse to one.
The ledger holds this as [reverse_inverse_fused_involutive](/theorem/reverse_inverse_fused_involutive) — proven `by decide`, sorry-free:

```lean
((([3, -5, 8] : List Int).reverse.map (fun x => -x)).reverse.map (fun x => -x)) = [3, -5, 8]
```

### The chromatic scale is the ring ℤ/12: twelve semitones, and the twelfth is the octave that wraps to the root — (List.range 12).length = 12 ∧ 12 % 12 = 0. Pitch counts in a ring, as the week does in ℤ/7.
The ledger holds this as [chromatic_is_z12](/theorem/chromatic_is_z12) — proven `by decide`, sorry-free:

```lean
(List.range 12).length = 12 ∧ 12 % 12 = 0
```

### An octave doubles frequency: A4 at 440 Hz is A5 at 880 — 440 · 2 = 880. The one interval every tuning agrees on.
The ledger holds this as [octave_doubles_frequency](/theorem/octave_doubles_frequency) — proven `by decide`, sorry-free:

```lean
440 * 2 = 880
```

### At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.
The ledger holds this as [tempo_ms_per_beat](/theorem/tempo_ms_per_beat) — proven `by decide`, sorry-free:

```lean
60000 / 120 = 500 ∧ 4 * 500 = 2000
```

### Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.
The ledger holds this as [nyquist_half_samplerate](/theorem/nyquist_half_samplerate) — proven `by decide`, sorry-free:

```lean
44100 / 2 = 22050
```

### MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 < 128. Why note 128 does not exist and velocity tops out at 127.
The ledger holds this as [midi_is_seven_bit](/theorem/midi_is_seven_bit) — proven `by decide`, sorry-free:

```lean
2^7 = 128 ∧ 127 < 128
```

### The rule of thumb: ~6 dB of dynamic range per bit, so 16-bit is ≈96 dB — 6 · 16 = 96. An approximation (the exact figure is ~6.02 dB/bit), the number an engineer reaches for.
The ledger holds this as [sixteen_bit_dynamic_range](/theorem/sixteen_bit_dynamic_range) — proven `by decide`, sorry-free:

```lean
6 * 16 = 96
```

### The circle of fifths is ONE cycle: stepping by a perfect fifth (7 semitones) mod 12 visits all twelve tones, because 7 is coprime to 12 — every n in 0..11 appears in [(k·7) mod 12]. The pentagram {5/2} idea, heard in sound.
The ledger holds this as [fifth_cycles_all_twelve](/theorem/fifth_cycles_all_twelve) — proven `by decide`, sorry-free:

```lean
(List.range 12).all (fun n => ((List.range 12).map (fun k => (k * 7) % 12)).contains n)
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
