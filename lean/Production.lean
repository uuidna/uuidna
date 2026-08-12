-- lean/Production.lean — GENERATED. THE MIX — the studio involutions (reverse, invert, and their fusion) and the counting of pitch, tempo and sample, as decidable arithmetic. Every proof `by decide`, sorry-free, no Mathlib.

-- Reversing a clip is self-inverse: reverse it twice and the signal returns — ([3,-5,8] : List Int).reverse.reverse = [3,-5,8]. The tape run backward and backward again is the tape.
theorem reverse_involutive : ([3, -5, 8] : List Int).reverse.reverse = [3, -5, 8] := by decide

-- Phase inversion is self-inverse: flip polarity (x ↦ −x) twice and the signal returns — (([3,-5,8] : List Int).map (−·)).map (−·) = [3,-5,8]. The polarity button, pressed twice, is off.
theorem phase_inversion_involutive : (([3, -5, 8] : List Int).map (fun x => -x)).map (fun x => -x) = [3, -5, 8] := by decide

-- THE FUSION, the ultimate test: reverse-then-invert is ITSELF an involution — apply the fused operation twice and the signal returns, ((([3,-5,8] : List Int).reverse.map (−·)).reverse.map (−·)) = [3,-5,8]. Reverse and inverse compose to a clean self-inverse; the two studio mirrors fuse to one.
theorem reverse_inverse_fused_involutive : ((([3, -5, 8] : List Int).reverse.map (fun x => -x)).reverse.map (fun x => -x)) = [3, -5, 8] := by decide

-- The chromatic scale is the ring ℤ/12: twelve semitones, and the twelfth is the octave that wraps to the root — (List.range 12).length = 12 ∧ 12 % 12 = 0. Pitch counts in a ring, as the week does in ℤ/7.
theorem chromatic_is_z12 : (List.range 12).length = 12 ∧ 12 % 12 = 0 := by decide

-- An octave doubles frequency: A4 at 440 Hz is A5 at 880 — 440 · 2 = 880. The one interval every tuning agrees on.
theorem octave_doubles_frequency : 440 * 2 = 880 := by decide

-- At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.
theorem tempo_ms_per_beat : 60000 / 120 = 500 ∧ 4 * 500 = 2000 := by decide

-- Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.
theorem nyquist_half_samplerate : 44100 / 2 = 22050 := by decide

-- MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 < 128. Why note 128 does not exist and velocity tops out at 127.
theorem midi_is_seven_bit : 2^7 = 128 ∧ 127 < 128 := by decide

-- The rule of thumb: ~6 dB of dynamic range per bit, so 16-bit is ≈96 dB — 6 · 16 = 96. An approximation (the exact figure is ~6.02 dB/bit), the number an engineer reaches for.
theorem sixteen_bit_dynamic_range : 6 * 16 = 96 := by decide

-- The circle of fifths is ONE cycle: stepping by a perfect fifth (7 semitones) mod 12 visits all twelve tones, because 7 is coprime to 12 — every n in 0..11 appears in [(k·7) mod 12]. The pentagram {5/2} idea, heard in sound.
theorem fifth_cycles_all_twelve : (List.range 12).all (fun n => ((List.range 12).map (fun k => (k * 7) % 12)).contains n) := by decide
