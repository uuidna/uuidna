#!/usr/bin/env node
// Automate the Lean layer for THE MIX — music production as decidable arithmetic, and the studio's INVOLUTIONS made
// exact. Two everyday operations are self-inverse: REVERSE a clip twice and it returns; INVERT its phase (x ↦ −x)
// twice and it returns. Their FUSION — reverse-then-invert — is itself an involution, applied twice the identity:
// the ultimate test that reverse and inverse compose to a clean self-inverse, proven on a real signal. Around them
// the counting of the studio: the chromatic scale is ℤ/12 (twelve semitones, the octave wraps like the rosette);
// an octave DOUBLES frequency (440→880); 120 BPM is 500 ms a beat, 2 s a 4/4 bar; Nyquist is half the sample rate
// (44.1 k → 22.05 k, the honest ceiling, NOT lossless); MIDI is 7-bit (128 notes, 0..127); 16-bit dynamic range is
// the ~6 dB-per-bit rule of thumb (≈96 dB); and stepping by a perfect fifth (7 semitones) visits all twelve tones —
// the circle of fifths is ONE cycle, 7 coprime to 12, the pentagram idea in sound. HONEST SCOPE: the arithmetic and
// the involutions of the mix — NOT a DAW, a synth, or a mastering chain. COMPUTE → GENERATE → VERIFY. Integrity, not truth.
import { emit } from './lean-gen.js'

const neg = (l: number[]): number[] => l.map((x) => -x)
const rev = (l: number[]): number[] => l.slice().reverse()
const fuse = (l: number[]): number[] => neg(rev(l)) // reverse then invert
const eq = (a: number[], b: number[]): boolean => JSON.stringify(a) === JSON.stringify(b)
const fifths = Array.from({ length: 12 }, (_, k) => (k * 7) % 12)

const FACTS = [
  { key: 'reverse_involutive',
    why: 'Reversing a clip is self-inverse: reverse it twice and the signal returns — ([3,-5,8] : List Int).reverse.reverse = [3,-5,8]. The tape run backward and backward again is the tape.',
    js: () => eq(rev(rev([3, -5, 8])), [3, -5, 8]),
    lean: 'theorem reverse_involutive : ([3, -5, 8] : List Int).reverse.reverse = [3, -5, 8] := by decide' },

  { key: 'phase_inversion_involutive',
    why: 'Phase inversion is self-inverse: flip polarity (x ↦ −x) twice and the signal returns — (([3,-5,8] : List Int).map (−·)).map (−·) = [3,-5,8]. The polarity button, pressed twice, is off.',
    js: () => eq(neg(neg([3, -5, 8])), [3, -5, 8]),
    lean: 'theorem phase_inversion_involutive : (([3, -5, 8] : List Int).map (fun x => -x)).map (fun x => -x) = [3, -5, 8] := by decide' },

  { key: 'reverse_inverse_fused_involutive',
    why: 'THE FUSION, the ultimate test: reverse-then-invert is ITSELF an involution — apply the fused operation twice and the signal returns, ((([3,-5,8] : List Int).reverse.map (−·)).reverse.map (−·)) = [3,-5,8]. Reverse and inverse compose to a clean self-inverse; the two studio mirrors fuse to one.',
    js: () => eq(fuse(fuse([3, -5, 8])), [3, -5, 8]),
    lean: 'theorem reverse_inverse_fused_involutive : ((([3, -5, 8] : List Int).reverse.map (fun x => -x)).reverse.map (fun x => -x)) = [3, -5, 8] := by decide' },

  { key: 'chromatic_is_z12',
    why: 'The chromatic scale is the ring ℤ/12: twelve semitones, and the twelfth is the octave that wraps to the root — (List.range 12).length = 12 ∧ 12 % 12 = 0. Pitch counts in a ring, as the week does in ℤ/7.',
    js: () => Array.from({ length: 12 }, (_, i) => i).length === 12 && 12 % 12 === 0,
    lean: 'theorem chromatic_is_z12 : (List.range 12).length = 12 ∧ 12 % 12 = 0 := by decide' },

  { key: 'octave_doubles_frequency',
    why: 'An octave doubles frequency: A4 at 440 Hz is A5 at 880 — 440 · 2 = 880. The one interval every tuning agrees on.',
    js: () => 440 * 2 === 880,
    lean: 'theorem octave_doubles_frequency : 440 * 2 = 880 := by decide' },

  { key: 'tempo_ms_per_beat',
    why: 'At 120 BPM a beat is 500 ms and a 4/4 bar is 2000 ms: 60000 / 120 = 500 ∧ 4 · 500 = 2000 — the grid a DAW snaps every edit to.',
    js: () => 60000 / 120 === 500 && 4 * 500 === 2000,
    lean: 'theorem tempo_ms_per_beat : 60000 / 120 = 500 ∧ 4 * 500 = 2000 := by decide' },

  { key: 'nyquist_half_samplerate',
    why: 'Nyquist: a 44.1 kHz stream can represent frequencies up to HALF its rate — 44100 / 2 = 22050 Hz, the honest ceiling above which detail aliases. Not lossless, a bound.',
    js: () => 44100 / 2 === 22050,
    lean: 'theorem nyquist_half_samplerate : 44100 / 2 = 22050 := by decide' },

  { key: 'midi_is_seven_bit',
    why: 'MIDI is 7-bit: 128 note numbers and 128 velocities, 0..127 — 2^7 = 128 ∧ 127 < 128. Why note 128 does not exist and velocity tops out at 127.',
    js: () => 2 ** 7 === 128 && 127 < 128,
    lean: 'theorem midi_is_seven_bit : 2^7 = 128 ∧ 127 < 128 := by decide' },

  { key: 'sixteen_bit_dynamic_range',
    why: 'The rule of thumb: ~6 dB of dynamic range per bit, so 16-bit is ≈96 dB — 6 · 16 = 96. An approximation (the exact figure is ~6.02 dB/bit), the number an engineer reaches for.',
    js: () => 6 * 16 === 96,
    lean: 'theorem sixteen_bit_dynamic_range : 6 * 16 = 96 := by decide' },

  { key: 'fifth_cycles_all_twelve',
    why: 'The circle of fifths is ONE cycle: stepping by a perfect fifth (7 semitones) mod 12 visits all twelve tones, because 7 is coprime to 12 — every n in 0..11 appears in [(k·7) mod 12]. The pentagram {5/2} idea, heard in sound.',
    js: () => Array.from({ length: 12 }, (_, n) => n).every((n) => fifths.includes(n)),
    lean: 'theorem fifth_cycles_all_twelve : (List.range 12).all (fun n => ((List.range 12).map (fun k => (k * 7) % 12)).contains n) := by decide' },
]

emit({
  file: 'Production.lean',
  header: 'THE MIX — the studio involutions (reverse, invert, and their fusion) and the counting of pitch, tempo and sample, as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
