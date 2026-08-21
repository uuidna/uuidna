-- lean/Acoustics.lean — GENERATED. ACOUSTICS — the sound domain, as decidable arithmetic, demarcated. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

/-- A vibrating string or air column sounds the harmonic series — integer multiples of the fundamental. On a 110
    Hz fundamental the overtones are 110·[1,2,3,4,5,6] = [110,220,330,440,550,660] Hz. -/
theorem harmonic_series : ((List.range' 1 6).map (fun n => n * 110)) = [110,220,330,440,550,660] := by decide

/-- The wave relation v = f·λ ties frequency and wavelength at a fixed speed: at 340 m/s a 170 Hz tone has λ = 2
    m and a 340 Hz tone has λ = 1 m — 340 = 170·2 = 340·1. Higher pitch, shorter wave. -/
theorem wave_speed_f_lambda : (340 = 170 * 2) ∧ (340 = 340 * 1) := by decide

/-- Sound is far slower than light: 343 m/s in air against light's 299792458 m/s — 343 < 299792458. You see the
    lightning long before you hear the thunder. -/
theorem sound_slower_than_light : 343 < 299792458 := by decide

/-- The decibel is logarithmic: dB = 10·log₁₀(I/I₀), so each 10 dB is a factor of 10 in intensity and 20 dB a
    factor of 100 — 10¹ = 10, 10² = 100. Loudness compresses a huge intensity range. -/
theorem decibel_is_logarithmic : (10^1 = 10) ∧ (10^2 = 100) := by decide

/-- Two close tones beat at their difference: 444 Hz against 440 Hz produces 444 − 440 = 4 beats per second —
    the throb a tuner listens for. -/
theorem beat_frequency : 444 - 440 = 4 := by decide

/-- The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 > 1) and a
    receding one lowers it (v/(v+vₛ) = 340/374 < 1) — 340 > 306 and 340 < 374. The passing siren drops in pitch. -/
theorem doppler_shift : (340 > 306) ∧ (340 < 374) := by decide

/-- A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end.
    Each is odd: n mod 2 = 1. An open pipe would sound all of them. -/
theorem closed_pipe_odd_harmonics : ([1,3,5,7] : List Nat).all (fun n => n % 2 == 1) := by decide

/-- Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances
    [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness. -/
theorem intensity_inverse_square : ((List.range' 1 3).map (fun r => r * r)) = [1,4,9] := by decide
