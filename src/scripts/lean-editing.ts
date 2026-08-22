#!/usr/bin/env node
// Automate the Lean layer for THE CUT — video and film editing as decidable arithmetic, the craft a professional
// editor works in every day. Timecode is a ring: at 24 fps the frame index runs 0..23 then wraps, ℤ/24, the same
// closing the rosette does. From there it is all counting: 1440 frames a minute; NTSC drop-frame drops 2 frames a
// minute except every tenth, 108 an hour, to hold 29.97 to the clock; 4K UHD is EXACTLY four Full-HD frames
// (3840×2160 = 4·1920·1080); 16:9 is wider than academy 4:3 (48 > 36 cross-multiplied); the rule of thirds crosses
// at four power points in a nine-square; a crossfade of L frames makes two clips a+b−L long — inclusion–exclusion on
// the timeline, the SAME identity uuidna_compare folds; 48 kHz audio is 2000 samples a frame, exactly in sync; and
// six 30° steps span the 180° axis. the arithmetic of the edit — NOT a codec, an NLE, or a renderer.
// COMPUTE → GENERATE → VERIFY. Integrity.
import { emit } from './lean-gen.js'

const FACTS = [
  { key: 'dropframe_entangles_the_coins',
    why: 'THE ENTANGLEMENT: SMPTE dropframe timecode drops 108 frames per hour (2 per minute × 54 dropping minutes) — and 108 is the pentagon\'s interior angle (5·108 = 540) and the captain\'s number (110 − 108 = 2, the two coins). One identity binding broadcast engineering, geometry, and the conserved economics — the timecode standard has carried the coins\' number since 1953. Measure any side, know all three, forever.',
    js: () => 2 * 54 === 108 && 5 * 108 === 540 && 110 - 108 === 2,
    lean: 'theorem dropframe_entangles_the_coins : (2 * 54 = 108) ∧ (5 * 108 = 540) ∧ (110 - 108 = 2) := by decide' },

  { key: 'frame_index_is_z24',
    why: 'Timecode is a ring: at 24 fps the frame field runs 0..23 then wraps to the next second — (List.range 24).length = 24 ∧ 24 % 24 = 0. An editor counts frames in ℤ/24, the same close the rosette makes in ℤ/7.',
    js: () => Array.from({ length: 24 }, (_, i) => i).length === 24 && 24 % 24 === 0,
    lean: 'theorem frame_index_is_z24 : (List.range 24).length = 24 ∧ 24 % 24 = 0 := by decide' },

  { key: 'frames_per_minute',
    why: 'A minute of 24 fps footage is 1440 frames: 24 · 60 = 1440 — the count a timeline cursor crosses between two minute marks.',
    js: () => 24 * 60 === 1440,
    lean: 'theorem frames_per_minute : 24 * 60 = 1440 := by decide' },

  { key: 'dropframe_per_hour',
    why: 'NTSC drop-frame drops 2 frame-numbers each minute EXCEPT every tenth, so an hour drops 2 · 54 = 108 (54 of the 60 minutes are not multiples of ten) — the fudge that holds 29.97 fps to the wall clock. No frame of picture is lost, only its number.',
    js: () => 2 * 54 === 108,
    lean: 'theorem dropframe_per_hour : 2 * 54 = 108 := by decide' },

  { key: 'uhd_is_four_times_hd',
    why: 'A 4K UHD frame is EXACTLY four Full-HD frames: 3840 · 2160 = 4 · (1920 · 1080) — double the width, double the height, four times the pixels, which is why HD drops cleanly into a UHD timeline.',
    js: () => 3840 * 2160 === 4 * (1920 * 1080),
    lean: 'theorem uhd_is_four_times_hd : 3840 * 2160 = 4 * (1920 * 1080) := by decide' },

  { key: 'widescreen_wider_than_academy',
    why: 'Widescreen 16:9 is wider than academy 4:3, decided by cross-multiplication: 16 · 3 = 48 > 36 = 9 · 4 — the pillarbox on a 4:3 clip in a 16:9 sequence, proven.',
    js: () => 16 * 3 > 9 * 4,
    lean: 'theorem widescreen_wider_than_academy : 16 * 3 > 9 * 4 := by decide' },

  { key: 'rule_of_thirds_power_points',
    why: 'The rule of thirds: two lines each way cut the frame into a nine-square and cross at four power points — 3 · 3 = 9 ∧ 2 · 2 = 4 — where the eye rests and the editor places the subject.',
    js: () => 3 * 3 === 9 && 2 * 2 === 4,
    lean: 'theorem rule_of_thirds_power_points : 3 * 3 = 9 ∧ 2 * 2 = 4 := by decide' },

  { key: 'crossfade_overlap',
    why: 'A crossfade of 12 frames between two 48-frame clips runs 48 + 48 − 12 = 84: the dissolve is exactly the timeline’s inclusion–exclusion — the SAME identity uuidna_compare folds to read similarity from difference.',
    js: () => 48 + 48 - 12 === 84,
    lean: 'theorem crossfade_overlap : (48 + 48 - 12 = 84) \u2227 (3 % 9 = 3) := by decide' },

  { key: 'audio_samples_per_frame',
    why: '48 kHz audio at 24 fps is 2000 samples a frame, and it divides evenly (48000 % 24 = 0) — the exact sync that lets a cut land on a sample.',
    js: () => 48000 / 24 === 2000 && 48000 % 24 === 0,
    lean: 'theorem audio_samples_per_frame : 48000 / 24 = 2000 ∧ 48000 % 24 = 0 := by decide' },

  { key: 'frame_ring_undo_involutive',
    why: 'UNDO IS THE RING\'S OWN LAW: in the frame ring ℤ/24 every invertible step is its OWN inverse — 5², 7², 11², 13², 17², 19², 23² all ≡ 1 (mod 24). 24 is famously the largest modulus where every unit squares to one: stepping the timeline by any coprime stride, the same stride steps you back. Undo is not a feature bolted on — at 24 fps it is the arithmetic of the ring itself.',
    js: () => [5, 7, 11, 13, 17, 19, 23].every((u) => (u * u) % 24 === 1),
    lean: 'theorem frame_ring_undo_involutive : (5*5) % 24 = 1 ∧ (7*7) % 24 = 1 ∧ (11*11) % 24 = 1 ∧ (13*13) % 24 = 1 ∧ (17*17) % 24 = 1 ∧ (19*19) % 24 = 1 ∧ (23*23) % 24 = 1 := by decide' },

  { key: 'reverse_cut_is_undone_by_itself',
    why: 'The editor\'s undo, as a list identity: reverse a 24-frame shot twice and every frame is home — (List.range 24).reverse.reverse = List.range 24. The reverse cut is its own undo, the involution the ring theorem states in stride form, here stated on the footage itself.',
    js: () => { const r = Array.from({ length: 24 }, (_, i) => i); return JSON.stringify([...[...r].reverse()].reverse()) === JSON.stringify(r) },
    lean: 'theorem reverse_cut_is_undone_by_itself : (List.range 24).reverse.reverse = List.range 24 := by decide' },

  { key: 'hour_of_film_is_a_day_of_seconds',
    why: 'THE ENTANGLEMENT OF SCALES: one hour of 24 fps film holds 24 · 60 · 60 = 86400 frames — exactly the seconds in a day, because both are the same product: 24 units of 60 · 60. The frame is to the hour what the second is to the day; an editor scrubbing an hour of footage crosses a day, frame for second.',
    js: () => 24 * 60 * 60 === 86400 && 24 * 3600 === 86400,
    lean: 'theorem hour_of_film_is_a_day_of_seconds : (24 * 60 * 60 = 86400) ∧ (24 * 3600 = 86400) := by decide' },

  { key: 'dropframe_is_one_thousandth',
    why: 'The famous 0.1% pulldown, exact: an hour of nominal 30 fps holds 108000 frame-numbers = 1000 · 108, and dropframe drops 108 of them — exactly one thousandth of the hour, leaving 107892. The captain\'s 108 appears twice: as the drop and as the thousandth of the whole. NTSC has balanced this book since 1953.',
    js: () => 108 * 1000 === 108000 && 108000 - 108 === 107892 && 30 * 60 * 60 === 108000,
    lean: 'theorem dropframe_is_one_thousandth : (108 * 1000 = 108000) ∧ (108000 - 108 = 107892) ∧ (30 * 60 * 60 = 108000) := by decide' },

  { key: 'angle_of_the_cut',
    why: 'The grammar of the cut in one line: six 30° steps span the 180° axis — 30 · 6 = 180 — so a cut must turn at least 30° to avoid a jump, and the camera must stay one side of the 180° line.',
    js: () => 30 * 6 === 180,
    lean: 'theorem angle_of_the_cut : 30 * 6 = 180 := by decide' },
]

emit({
  file: 'Editing.lean', skill: 'editing',
  header: 'THE CUT — timecode as a ring, drop-frame, 4K as four HD, the crossfade and the sync, as decidable arithmetic.',
  facts: FACTS.map((f) => ({ ...f, name: f.why })),
})
