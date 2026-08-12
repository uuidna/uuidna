#!/usr/bin/env node
// Automate the Lean layer for ACOUSTICS — the sound domain, as decidable arithmetic, demarcated. The harmonic
// series stacks integer multiples of the fundamental; the wave speed is v = f·λ; sound (343 m/s) is far slower
// than light; the decibel scale is logarithmic (each 10 dB is ×10 intensity); two tones beat at their difference;
// the Doppler shift raises pitch on approach and lowers it on recession; a closed pipe sounds only odd harmonics;
// and intensity falls as the inverse square of distance. HONEST SCOPE: the arithmetic of sound waves — exact
// ratios and cycles, not a full acoustics derivation, distinct from the music/432 ladder in BioPhysics.
import { emit } from './lean-gen.js'

const R = (a: number, b: number) => Array.from({ length: b - a }, (_, i) => a + i)

const FACTS = [
  { key: 'harmonic_series',
    why: 'A vibrating string or air column sounds the harmonic series — integer multiples of the fundamental. On a 110 Hz fundamental the overtones are 110·[1,2,3,4,5,6] = [110,220,330,440,550,660] Hz.',
    js: () => JSON.stringify(R(1, 7).map((n) => n * 110)) === JSON.stringify([110, 220, 330, 440, 550, 660]),
    lean: "theorem harmonic_series : ((List.range' 1 6).map (fun n => n * 110)) = [110,220,330,440,550,660] := by decide" },

  { key: 'wave_speed_f_lambda',
    why: 'The wave relation v = f·λ ties frequency and wavelength at a fixed speed: at 340 m/s a 170 Hz tone has λ = 2 m and a 340 Hz tone has λ = 1 m — 340 = 170·2 = 340·1. Higher pitch, shorter wave.',
    js: () => 340 === 170 * 2 && 340 === 340 * 1,
    lean: 'theorem wave_speed_f_lambda : (340 = 170 * 2) ∧ (340 = 340 * 1) := by decide' },

  { key: 'sound_slower_than_light',
    why: 'Sound is far slower than light: 343 m/s in air against light\'s 299792458 m/s — 343 < 299792458. You see the lightning long before you hear the thunder.',
    js: () => 343 < 299792458,
    lean: 'theorem sound_slower_than_light : 343 < 299792458 := by decide' },

  { key: 'decibel_is_logarithmic',
    why: 'The decibel is logarithmic: dB = 10·log₁₀(I/I₀), so each 10 dB is a factor of 10 in intensity and 20 dB a factor of 100 — 10¹ = 10, 10² = 100. Loudness compresses a huge intensity range.',
    js: () => 10 ** 1 === 10 && 10 ** 2 === 100,
    lean: 'theorem decibel_is_logarithmic : (10^1 = 10) ∧ (10^2 = 100) := by decide' },

  { key: 'beat_frequency',
    why: 'Two close tones beat at their difference: 444 Hz against 440 Hz produces 444 − 440 = 4 beats per second — the throb a tuner listens for.',
    js: () => 444 - 440 === 4,
    lean: 'theorem beat_frequency : 444 - 440 = 4 := by decide' },

  { key: 'doppler_shift',
    why: 'The Doppler shift: an approaching source raises the observed frequency (f′/f = v/(v−vₛ) = 340/306 > 1) and a receding one lowers it (v/(v+vₛ) = 340/374 < 1) — 340 > 306 and 340 < 374. The passing siren drops in pitch.',
    js: () => 340 > 306 && 340 < 374,
    lean: 'theorem doppler_shift : (340 > 306) ∧ (340 < 374) := by decide' },

  { key: 'closed_pipe_odd_harmonics',
    why: 'A closed (stopped) pipe sounds only the ODD harmonics — 1, 3, 5, 7 — because a node sits at the closed end. Each is odd: n mod 2 = 1. An open pipe would sound all of them.',
    js: () => [1, 3, 5, 7].every((n) => n % 2 === 1),
    lean: 'theorem closed_pipe_odd_harmonics : ([1,3,5,7] : List Nat).all (fun n => n % 2 == 1) := by decide' },

  { key: 'intensity_inverse_square',
    why: 'Sound intensity falls as the inverse square of distance: the spreading front dilutes as r², so at distances [1,2,3] the intensity divides by [1,4,9] — I ∝ 1/r². Double the distance, quarter the loudness.',
    js: () => JSON.stringify(R(1, 4).map((r) => r * r)) === JSON.stringify([1, 4, 9]),
    lean: "theorem intensity_inverse_square : ((List.range' 1 3).map (fun r => r * r)) = [1,4,9] := by decide" },
]

// compute → generate → verify. The sound domain — harmonics, v=fλ, the decibel, beats, Doppler, pipe modes, the
// inverse square — as decidable arithmetic, demarcated: exact ratios of sound waves, not a full acoustics derivation.
emit({ file: 'Acoustics.lean', skill: 'acoustics',
  header: 'ACOUSTICS — the sound domain, as decidable arithmetic, demarcated. The harmonic series stacks integer multiples of the fundamental; the wave speed is v = f·λ; sound (343 m/s) is far slower than light; the decibel scale is logarithmic (each 10 dB is ×10 intensity); two tones beat at their difference; the Doppler shift raises pitch on approach and lowers it on recession; a closed pipe sounds only odd harmonics; and intensity falls as the inverse square of distance. HONEST SCOPE: the arithmetic of sound waves — exact ratios and cycles, not a full acoustics derivation, distinct from the music/432 ladder in BioPhysics.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })) })
