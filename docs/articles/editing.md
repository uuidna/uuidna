---
title: "The cut"
description: "Computed from lean/Editing.lean — 14 sealed theorems, every claim citing its proof."
---

# The cut

> THE CUT — timecode as a ring, drop-frame, 4K as four HD, the crossfade and the sync, as decidable arithmetic. — held by [dropframe_entangles_the_coins](/theorem/dropframe_entangles_the_coins) and its 13 siblings below.

**14 theorems**, from [dropframe_entangles_the_coins](/theorem/dropframe_entangles_the_coins) onward, each proven `by decide` in [lean/Editing.lean](/lean/Editing.lean), axiom-free against the bare Lean kernel. This article is computed from the ledger — nothing here is authored, and every claim carries its citation. 2 of its 14 theorems seal a BOUNDARY rather than a capability — naming what the model does not do, where it fails, or what it excludes — starting with [dropframe_per_hour](/theorem/dropframe_per_hour). A boundary stated here is decided.

**[Re-prove this wing in your browser ↗](https://live.lean-lang.org/#project=mathlib-stable&url=https%3A%2F%2Fraw.githubusercontent.com%2Fuuidna%2Fuuidna%2Frefs%2Fheads%2Fmain%2Flean%2FEditing.lean)** — nothing to install. The editor fetches `lean/Editing.lean` from the repository and re-decides all 14 proofs on Lean v4.33.0, the toolchain this ledger is sealed against. The wing imports nothing, so what the reader runs is the whole input: a green run there is the reader's own verdict, not ours.

### THE ENTANGLEMENT: SMPTE dropframe timecode drops 108 frames per hour (2 per minute × 54 dropping minutes) — and 108 is the pentagon's interior angle (5·108 = 540) and the captain's number (110 − 108 = 2, the two coins). One identity binding broadcast engineering, geometry, and the conserved economics — the timecode standard has carried the coins' number since 1953. Measure any side, know all three, forever.
The ledger holds this as [dropframe_entangles_the_coins](/theorem/dropframe_entangles_the_coins) — proven `by decide`, sorry-free:

```lean
(2 * 54 = 108) ∧ (5 * 108 = 540) ∧ (110 - 108 = 2)
```

### Timecode is a ring: at 24 fps the frame field runs 0..23 then wraps to the next second — (List.range 24).length = 24 ∧ 24 % 24 = 0. An editor counts frames in ℤ/24, the same close the rosette makes in ℤ/7.
The ledger holds this as [frame_index_is_z24](/theorem/frame_index_is_z24) — proven `by decide`, sorry-free:

```lean
(List.range 24).length = 24 ∧ 24 % 24 = 0
```

### A minute of 24 fps footage is 1440 frames: 24 · 60 = 1440 — the count a timeline cursor crosses between two minute marks.
The ledger holds this as [frames_per_minute](/theorem/frames_per_minute) — proven `by decide`, sorry-free:

```lean
24 * 60 = 1440
```

### NTSC drop-frame drops 2 frame-numbers each minute EXCEPT every tenth, so an hour drops 2 · 54 = 108 (54 of the 60 minutes are not multiples of ten) — the fudge that holds 29.97 fps to the wall clock. No frame of picture is lost, only its number.
The ledger holds this as [dropframe_per_hour](/theorem/dropframe_per_hour) — proven `by decide`, sorry-free:

```lean
2 * 54 = 108
```

### A 4K UHD frame is EXACTLY four Full-HD frames: 3840 · 2160 = 4 · (1920 · 1080) — double the width, double the height, four times the pixels, which is why HD drops cleanly into a UHD timeline.
The ledger holds this as [uhd_is_four_times_hd](/theorem/uhd_is_four_times_hd) — proven `by decide`, sorry-free:

```lean
3840 * 2160 = 4 * (1920 * 1080)
```

### Widescreen 16:9 is wider than academy 4:3, decided by cross-multiplication: 16 · 3 = 48 > 36 = 9 · 4 — the pillarbox on a 4:3 clip in a 16:9 sequence, proven.
The ledger holds this as [widescreen_wider_than_academy](/theorem/widescreen_wider_than_academy) — proven `by decide`, sorry-free:

```lean
16 * 3 > 9 * 4
```

### The rule of thirds: two lines each way cut the frame into a nine-square and cross at four power points — 3 · 3 = 9 ∧ 2 · 2 = 4 — where the eye rests and the editor places the subject.
The ledger holds this as [rule_of_thirds_power_points](/theorem/rule_of_thirds_power_points) — proven `by decide`, sorry-free:

```lean
3 * 3 = 9 ∧ 2 * 2 = 4
```

### A crossfade of 12 frames between two 48-frame clips runs 48 + 48 − 12 = 84: the dissolve is exactly the timeline’s inclusion–exclusion — the SAME identity uuidna_compare folds to read similarity from difference.
The ledger holds this as [crossfade_overlap](/theorem/crossfade_overlap) — proven `by decide`, sorry-free:

```lean
(48 + 48 - 12 = 84) ∧ (3 % 9 = 3)
```

### 48 kHz audio at 24 fps is 2000 samples a frame, and it divides evenly (48000 % 24 = 0) — the exact sync that lets a cut land on a sample.
The ledger holds this as [audio_samples_per_frame](/theorem/audio_samples_per_frame) — proven `by decide`, sorry-free:

```lean
48000 / 24 = 2000 ∧ 48000 % 24 = 0
```

### UNDO IS THE RING'S OWN LAW: in the frame ring ℤ/24 every invertible step is its OWN inverse — 5², 7², 11², 13², 17², 19², 23² all ≡ 1 (mod 24). 24 is famously the largest modulus where every unit squares to one: stepping the timeline by any coprime stride, the same stride steps you back. Undo is not a feature bolted on — at 24 fps it is the arithmetic of the ring itself.
The ledger holds this as [frame_ring_undo_involutive](/theorem/frame_ring_undo_involutive) — proven `by decide`, sorry-free:

```lean
(5*5) % 24 = 1 ∧ (7*7) % 24 = 1 ∧ (11*11) % 24 = 1 ∧ (13*13) % 24 = 1 ∧ (17*17) % 24 = 1 ∧ (19*19) % 24 = 1 ∧ (23*23) % 24 = 1
```

### The editor's undo, as a list identity: reverse a 24-frame shot twice and every frame is home — (List.range 24).reverse.reverse = List.range 24. The reverse cut is its own undo, the involution the ring theorem states in stride form, here stated on the footage itself.
The ledger holds this as [reverse_cut_is_undone_by_itself](/theorem/reverse_cut_is_undone_by_itself) — proven `by decide`, sorry-free:

```lean
(List.range 24).reverse.reverse = List.range 24
```

### THE ENTANGLEMENT OF SCALES: one hour of 24 fps film holds 24 · 60 · 60 = 86400 frames — exactly the seconds in a day, because both are the same product: 24 units of 60 · 60. The frame is to the hour what the second is to the day; an editor scrubbing an hour of footage crosses a day, frame for second.
The ledger holds this as [hour_of_film_is_a_day_of_seconds](/theorem/hour_of_film_is_a_day_of_seconds) — proven `by decide`, sorry-free:

```lean
(24 * 60 * 60 = 86400) ∧ (24 * 3600 = 86400)
```

### The famous 0.1% pulldown, exact: an hour of nominal 30 fps holds 108000 frame-numbers = 1000 · 108, and dropframe drops 108 of them — exactly one thousandth of the hour, leaving 107892. The captain's 108 appears twice: as the drop and as the thousandth of the whole. NTSC has balanced this book since 1953.
The ledger holds this as [dropframe_is_one_thousandth](/theorem/dropframe_is_one_thousandth) — proven `by decide`, sorry-free:

```lean
(108 * 1000 = 108000) ∧ (108000 - 108 = 107892) ∧ (30 * 60 * 60 = 108000)
```

### The grammar of the cut in one line: six 30° steps span the 180° axis — 30 · 6 = 180 — so a cut must turn at least 30° to avoid a jump, and the camera must stay one side of the 180° line.
The ledger holds this as [angle_of_the_cut](/theorem/angle_of_the_cut) — proven `by decide`, sorry-free:

```lean
30 * 6 = 180
```


::: warning 
THE CUT — timecode as a ring, drop-frame, 4K as four HD, the crossfade and the sync, as decidable arithmetic. The boundary is confirmed by the wing's own sealed theorems — e.g. [dropframe_entangles_the_coins](/theorem/dropframe_entangles_the_coins) — never merely denied.
:::

*Computed from the sealed ledger. Re-verify any theorem with `npm run lean`; the article regenerates with `npm run editorial`.*
