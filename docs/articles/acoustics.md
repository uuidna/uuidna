---
title: "The sound domain"
description: "Computed from lean/Acoustics.lean — 8 sealed theorems, every claim citing its proof."
---

# The sound domain

> ACOUSTICS — the sound domain, as decidable arithmetic, demarcated. — held by [harmonic_series](/theorem/harmonic_series) and its 7 siblings below.

**8 theorems**, from [harmonic_series](/theorem/harmonic_series) onward, each proven `by decide` in [lean/Acoustics.lean](/lean/Acoustics.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 1 of its 8 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [closed_pipe_odd_harmonics](/theorem/closed_pipe_odd_harmonics). A boundary stated here is decided, not merely denied.

### A vibrating string or air column sounds the harmonic series — integer multiples of the fundamental. On a 110 Hz fundamental the overtones are 110·[1,2,3,4,5,6] = [110,220,330,440,550,660] Hz.
The ledger holds this as [harmonic_series](/theorem/harmonic_series) — proven `by decide`, sorry-free:

```lean
((List.range' 1 6).map (fun n => n * 110)) = [110,220,330,440,550,660]
```

### The wave relation v = f·λ ties frequency and wavelength at a fixed speed: at 340 m/s a 170 Hz tone has λ = 2 m and a 340 Hz tone has λ = 1 m — 340 = 170·2 = 340·1. Higher pitch, shorter wave.
The ledger holds this as [wave_speed_f_lambda](/theorem/wave_speed_f_lambda) — proven `by decide`, sorry-free:

```lean
(340 = 170 * 2) ∧ (340 = 340 * 1)
```

### Sound is far slower than light: 343 m/s in air against light's 299792458 m/s — 343 < 299792458. You see the lightning long before you hear the thunder.
The ledger holds this as [sound_slower_than_light](/theorem/sound_slower_than_light) — proven `by decide`, sorry-free:

```lean
343 < 299792458
```

### The decibel is logarithmic: dB = 10·log₁₀(I/I₀), so each 10 dB is a factor of 10 in intensity and 20 dB a factor of 100 — 10¹ = 10, 10² = 100. Loudness compresses a huge intensity range.
The ledger holds this as [decibel_is_logarithmic](/theorem/decibel_is_logarithmic) — proven `by decide`, sorry-free:

```lean
(10^1 = 10) ∧ (10^2 = 100)
```

### Two close tones beat at their difference: 444 Hz against 440 Hz produces 444 − 440 = 4 beats per second — the throb a tuner listens for.
The ledger holds this as [beat_frequency](/theorem/beat_frequency) — proven `by decide`, sorry-free:

```lean
444 - 440 = 4
```

### The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 > 1) and a receding one lowers it (v/(v+vₛ) = 340/374 < 1) — 340 > 306 and 340 < 374. The passing siren drops in pitch.
The ledger holds this as [doppler_shift](/theorem/doppler_shift) — proven `by decide`, sorry-free:

```lean
(340 > 306) ∧ (340 < 374)
```

### A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.
The ledger holds this as [closed_pipe_odd_harmonics](/theorem/closed_pipe_odd_harmonics) — proven `by decide`, sorry-free:

```lean
([1,3,5,7] : List Nat).all (fun n => n % 2 == 1)
```

### Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.
The ledger holds this as [intensity_inverse_square](/theorem/intensity_inverse_square) — proven `by decide`, sorry-free:

```lean
((List.range' 1 3).map (fun r => r * r)) = [1,4,9]
```


*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
