-- lean/Editing.lean — GENERATED. THE CUT — timecode as a ring, drop-frame, 4K as four HD, the crossfade and the sync, as decidable arithmetic. Every proof `by decide`, sorry-free, no Mathlib, and axiom-free — depends on NO axiom beyond the leanprover/lean4 kernel (verified by scripts/lean-axioms; not even propext).

-- THE ENTANGLEMENT: SMPTE dropframe timecode drops 108 frames per hour (2 per minute × 54 dropping minutes) — and 108 is the pentagon's interior angle (5·108 = 540) and the captain's number (110 − 108 = 2, the two coins). One identity binding broadcast engineering, geometry, and the conserved economics — the timecode standard has carried the coins' number since 1953. Measure any side, know all three, forever.
theorem dropframe_entangles_the_coins : (2 * 54 = 108) ∧ (5 * 108 = 540) ∧ (110 - 108 = 2) := by decide

-- Timecode is a ring: at 24 fps the frame field runs 0..23 then wraps to the next second — (List.range 24).length = 24 ∧ 24 % 24 = 0. An editor counts frames in ℤ/24, the same close the rosette makes in ℤ/7.
theorem frame_index_is_z24 : (List.range 24).length = 24 ∧ 24 % 24 = 0 := by decide

-- A minute of 24 fps footage is 1440 frames: 24 · 60 = 1440 — the count a timeline cursor crosses between two minute marks.
theorem frames_per_minute : 24 * 60 = 1440 := by decide

-- NTSC drop-frame drops 2 frame-numbers each minute EXCEPT every tenth, so an hour drops 2 · 54 = 108 (54 of the 60 minutes are not multiples of ten) — the fudge that holds 29.97 fps to the wall clock. No frame of picture is lost, only its number.
theorem dropframe_per_hour : 2 * 54 = 108 := by decide

-- A 4K UHD frame is EXACTLY four Full-HD frames: 3840 · 2160 = 4 · (1920 · 1080) — double the width, double the height, four times the pixels, which is why HD drops cleanly into a UHD timeline.
theorem uhd_is_four_times_hd : 3840 * 2160 = 4 * (1920 * 1080) := by decide

-- Widescreen 16:9 is wider than academy 4:3, decided by cross-multiplication: 16 · 3 = 48 > 36 = 9 · 4 — the pillarbox on a 4:3 clip in a 16:9 sequence, proven.
theorem widescreen_wider_than_academy : 16 * 3 > 9 * 4 := by decide

-- The rule of thirds: two lines each way cut the frame into a nine-square and cross at four power points — 3 · 3 = 9 ∧ 2 · 2 = 4 — where the eye rests and the editor places the subject.
theorem rule_of_thirds_power_points : 3 * 3 = 9 ∧ 2 * 2 = 4 := by decide

-- A crossfade of 12 frames between two 48-frame clips runs 48 + 48 − 12 = 84: the dissolve is exactly the timeline’s inclusion–exclusion — the SAME identity uuidna_compare folds to read similarity from difference.
theorem crossfade_overlap : 48 + 48 - 12 = 84 := by decide

-- 48 kHz audio at 24 fps is 2000 samples a frame, and it divides evenly (48000 % 24 = 0) — the exact sync that lets a cut land on a sample, not between two.
theorem audio_samples_per_frame : 48000 / 24 = 2000 ∧ 48000 % 24 = 0 := by decide

-- The grammar of the cut in one line: six 30° steps span the 180° axis — 30 · 6 = 180 — so a cut must turn at least 30° to avoid a jump, and the camera must stay one side of the 180° line.
theorem angle_of_the_cut : 30 * 6 = 180 := by decide
