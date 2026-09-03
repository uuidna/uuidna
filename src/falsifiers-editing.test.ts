// editing-falsifiers — THE FALSIFIER LEG FOR THE Editing.lean WING, ONE TEST PER SEALED THEOREM.
//
// A falsifier is not a restatement. Each test below RECOMPUTES the theorem's property from the editing rule that
// produces it — the drop rule walked minute by minute, the timeline built as frame indices, the ring permutation
// applied to all 24 frames — and only then compares against the sealed number. Then it MUTATES that rule and
// asserts the mutated form FAILS. Both halves are required: a check that stays green measures nothing, which is
// the vacuity trap the leg census exists to detect.
//
// Nothing here is a witness. Every recomputation is this project's own arithmetic, and the project's own
// arithmetic is not a witness to itself; these theorems still owe that leg.
import { test } from 'node:test'
import assert from 'node:assert/strict'

// The determinism scan admits no host intrinsic anywhere in this tree, so the three shapes this file needs are
// written out. For the non-negative integers walked below, x - (x % 1) is exactly floor(x), and the comparisons
// ARE the definitions of the other two rather than approximations of them.
const trunc = (x: number): number => x - (x % 1)
const ceilOf = (x: number): number => (x % 1 === 0 ? x : x - (x % 1) + 1)
const maxOf = (...xs: number[]): number => xs.reduce((a, b) => (a > b ? a : b))
const minOf = (...xs: number[]): number => xs.reduce((a, b) => (a < b ? a : b))
const absOf = (x: number): number => (x < 0 ? -x : x)

// ── THE RULES, RESTATED AS PROCEDURES ─────────────────────────────────────────────────────────────────────────
// Each helper encodes a RULE, never its answer, so the sealed constant is something the test arrives at rather
// than something it is handed. Every helper is parameterised precisely where the mutation will be applied.

/** Walk the sixty minute-marks of one hour and drop `perMinute` frame-numbers at each mark that is NOT a
 *  multiple of `except`; `except = 0` means "drop at every minute", the mutation. */
const droppedInHour = (perMinute: number, except: number): number => {
  let dropped = 0
  for (let m = 0; m < 60; m++) if (except === 0 || m % except !== 0) dropped += perMinute
  return dropped
}

/** Interior angle of a regular n-gon, in degrees, from the polygon rule — not from the number it lands on. */
const interiorAngle = (n: number): number => ((n - 2) * 180) / n

/** The frame indices a timeline cursor crosses over `seconds` seconds at `fps`, built one second at a time. */
const timelineFrames = (fps: number, seconds: number): number[] => {
  const out: number[] = []
  for (let s = 0; s < seconds; s++) for (let f = 0; f < fps; f++) out.push(s * fps + f)
  return out
}

/** The frame FIELD of a timecode at tick t under a field of `modulus` values: [field, whole seconds elapsed]. */
const tick = (t: number, modulus: number): [number, number] => [t % modulus, trunc(t / modulus)]

/** Greatest common divisor — the units of a ring are the residues coprime to its modulus. */
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const unitsOf = (m: number): number[] => [...Array(m).keys()].filter((u) => gcd(u, m) === 1)

/** Step the whole frame ring by stride u: the map x ↦ (u·x) mod m, as an explicit permutation of every frame. */
const strideMap = (u: number, m: number): number[] => [...Array(m).keys()].map((x) => (u * x) % m)

/** How many `w`×`h` frames tile a `W`×`H` frame, and whether the tiling is exact (no gap, no overlap). */
const tiling = (W: number, H: number, w: number, h: number): { tiles: number; exact: boolean } => {
  const across = W / w, down = H / h
  const exact = Number.isInteger(across) && Number.isInteger(down)
  return { tiles: exact ? across * down : NaN, exact }
}

/** Fit a `num`:`den` picture inside a 1920×1080 frame by height, and report the pillarbox bar width per side. */
const pillarboxBar = (num: number, den: number): number => (1920 - (1080 * num) / den) / 2

/** Cut a frame with `k` evenly spaced internal lines each way: the cells it makes and where the lines cross. */
const thirdsGrid = (k: number): { cells: number; powerPoints: number } => {
  const lines = [...Array(k).keys()].map((i) => (i + 1) / (k + 1))
  const points: string[] = []
  for (const x of lines) for (const y of lines) points.push(`${x},${y}`)
  const spans = [...Array(k + 1).keys()]
  return { cells: spans.length * spans.length, powerPoints: new Set(points).size }
}

/** Two clips of `len` frames each, the second starting `overlap` frames before the first ends: the frames the
 *  timeline actually occupies, counted as a SET — inclusion–exclusion done by construction rather than by
 *  formula, so a wrong formula cannot agree with it by accident. */
const timelineSpan = (len: number, overlap: number): number => {
  const occupied = new Set<number>()
  for (let i = 0; i < len; i++) occupied.add(i)
  const start = len - overlap
  for (let i = 0; i < len; i++) occupied.add(start + i)
  return occupied.size
}

/** Chop `samples` audio samples into `fps` frame-sized chunks: the size of each and what is left over. */
const chunkAudio = (samples: number, fps: number): { per: number; leftOver: number; even: boolean } => {
  const per = trunc(samples / fps)
  const leftOver = samples - per * fps
  return { per, leftOver, even: leftOver === 0 }
}

/** Turn the camera around the action axis in `step`-degree moves and report where `moves` of them land. */
const arcAfter = (step: number, moves: number): number => {
  let deg = 0
  for (let i = 0; i < moves; i++) deg += step
  return deg
}

// ── THE FALSIFIERS ────────────────────────────────────────────────────────────────────────────────────────────

test('dropframe_per_hour — the drop rule walked minute by minute gives 108; dropping at EVERY minute must not', () => {
  // (a) recompute: 2 frame-numbers at each minute-mark that is not a multiple of ten
  const dropping = [...Array(60).keys()].filter((m) => m % 10 !== 0)
  assert.equal(dropping.length, 54, 'six of the sixty minute-marks are multiples of ten and drop nothing')
  assert.equal(droppedInHour(2, 10), 108, 'dropframe_per_hour: 2 · 54 = 108 arrived at by walking the hour')
  assert.equal(droppedInHour(2, 10), 2 * dropping.length)

  // (b) mutate: remove the every-tenth exemption, and the sealed count must no longer be reachable
  assert.equal(droppedInHour(2, 0), 120)
  assert.notEqual(droppedInHour(2, 0), 108, 'a rule with no exemption cannot land on 108 — the check bites')
  assert.notEqual(droppedInHour(1, 10), 108, 'dropping one number a minute is 54, not 108')
  assert.throws(() => assert.equal(droppedInHour(2, 0), 108))
})

test('dropframe_entangles_the_coins — 108 reached three independent ways; a hexagon must break all three', () => {
  // (a) recompute each of the three conjuncts from its own rule, never from the shared literal
  const drop = droppedInHour(2, 10)                 // broadcast: the hour's dropped frame-numbers
  const angle = interiorAngle(5)                    // geometry: the pentagon's interior angle
  assert.equal(drop, 108)
  assert.equal(angle, 108)
  assert.equal(drop, angle, 'the entanglement: the drop count and the pentagon angle are the same number')
  assert.equal(5 * angle, 540, '5 · 108 = 540, the pentagon\'s total interior angle')
  assert.equal(5 * angle, (5 - 2) * 180, 'and 540 again from the polygon rule, independently')
  assert.equal(110 - drop, 2, '110 − 108 = 2, the two coins left over')

  // (b) mutate: swap the pentagon for a hexagon and every one of the three bindings must fail at once
  const hex = interiorAngle(6)
  assert.equal(hex, 120)
  assert.notEqual(hex, drop, 'a hexagon does not meet the drop count')
  assert.notEqual(6 * hex, 540)
  assert.notEqual(110 - hex, 2, '110 − 120 is negative — the coins do not survive the mutation')
  assert.throws(() => assert.equal(interiorAngle(6), droppedInHour(2, 10)))
})

test('frame_index_is_z24 — the frame field is the ring of 24; a field of 25 must fail to wrap', () => {
  // (a) recompute: the field runs 0..23 and closes at 24
  const field = [...Array(24).keys()]
  assert.equal(field.length, 24, 'frame_index_is_z24: (List.range 24).length = 24')
  assert.deepEqual([field[0], field[23]], [0, 23], 'the field runs 0..23, never reaching 24')
  assert.equal(24 % 24, 0, 'and 24 closes the ring')
  assert.deepEqual(tick(23, 24), [23, 0], 'the last frame of the first second')
  assert.deepEqual(tick(24, 24), [0, 1], 'one tick later the field is home and the second has advanced')
  // every tick of three seconds stays inside the field, and the field visits each index equally
  const visits = new Map<number, number>()
  for (let t = 0; t < 24 * 3; t++) {
    const [f] = tick(t, 24)
    assert.ok(field.includes(f), 'the frame field never leaves 0..23')
    visits.set(f, (visits.get(f) ?? 0) + 1)
  }
  assert.deepEqual([...new Set(visits.values())], [3], 'three seconds visit every frame index exactly three times')

  // (b) mutate: a 25-value field does not close at 24 — the wrap the theorem asserts is gone
  assert.notEqual(24 % 25, 0, 'in a field of 25 the twenty-fourth tick has not wrapped')
  assert.deepEqual(tick(24, 25), [24, 0], 'it reports frame 24 of second 0, which no 24 fps timecode can show')
  assert.notEqual([...Array(25).keys()].length, 24)
  assert.throws(() => assert.deepEqual(tick(24, 25), [0, 1]))
})

test('frames_per_minute — a cursor built second by second crosses 1440 frames; 25 fps must not', () => {
  // (a) recompute: build the frames of one minute rather than multiplying
  const minute = timelineFrames(24, 60)
  assert.equal(minute.length, 1440, 'frames_per_minute: 24 · 60 = 1440, counted by construction')
  assert.equal(minute.length, 24 * 60)
  assert.deepEqual([minute[0], minute[1439]], [0, 1439], 'contiguous from the first frame to the last')
  assert.equal(new Set(minute).size, 1440, 'no frame is crossed twice')

  // (b) mutate: change the rate, or lose a second, and the count must move off 1440
  assert.equal(timelineFrames(25, 60).length, 1500)
  assert.notEqual(timelineFrames(25, 60).length, 1440, 'at 25 fps the minute is 1500 frames')
  assert.notEqual(timelineFrames(24, 59).length, 1440, 'a minute one second short is 1416')
  assert.throws(() => assert.equal(timelineFrames(25, 60).length, 1440))
})

test('uhd_is_four_times_hd — a UHD frame is tiled EXACTLY by four HD frames; a half-height UHD must not be', () => {
  // (a) recompute: tile the larger frame with the smaller one and count the tiles
  const t = tiling(3840, 2160, 1920, 1080)
  assert.equal(t.exact, true, 'the tiling has no gap and no overlap')
  assert.equal(t.tiles, 4, 'uhd_is_four_times_hd: two across and two down')
  assert.equal(3840 * 2160, t.tiles * (1920 * 1080), 'and the pixel counts agree with the tiling')
  assert.equal(3840 / 1920, 2160 / 1080, 'both dimensions double, which is why the drop-in is clean')

  // (b) mutate: double only the width, and four HD frames no longer fit
  const flat = tiling(3840, 1080, 1920, 1080)
  assert.equal(flat.tiles, 2)
  assert.notEqual(flat.tiles, 4, 'a 3840×1080 frame holds two HD frames, not four')
  assert.notEqual(3840 * 1080, 4 * (1920 * 1080))
  assert.equal(tiling(3840, 2160, 1920, 1200).exact, false, 'an off-ratio tile does not divide the frame at all')
  assert.throws(() => assert.equal(tiling(3840, 1080, 1920, 1080).tiles, 4))
})

test('widescreen_wider_than_academy — the pillarbox is positive; a 16:9 clip in 16:9 must give no bars', () => {
  // (a) recompute: the inequality IS the pillarbox — fit each picture by height and measure the bar
  const academyBar = pillarboxBar(4, 3)
  assert.equal(academyBar, 240, 'a 4:3 clip fitted by height leaves 240 px of bar each side of a 16:9 frame')
  assert.ok(academyBar > 0, 'widescreen_wider_than_academy: bars appear, so 16:9 is the wider shape')
  assert.ok(16 * 3 > 9 * 4, 'the same fact by cross-multiplication: 48 > 36')
  assert.equal(16 / 9 > 4 / 3, academyBar > 0, 'the ratio comparison and the pillarbox agree, both ways')

  // (b) mutate: give the sequence the clip's own shape and the strict inequality must fail
  assert.equal(pillarboxBar(16, 9), 0, 'a 16:9 clip in a 16:9 frame leaves no bar')
  assert.equal(16 * 9 > 9 * 16, false, 'and cross-multiplication is no longer strict')
  assert.ok(pillarboxBar(21, 9) < 0, 'a wider-than-16:9 clip overflows instead — letterbox, not pillarbox')
  assert.throws(() => assert.ok(pillarboxBar(16, 9) > 0))
})

test('rule_of_thirds_power_points — two lines each way make 9 cells and 4 crossings; one line each way must not', () => {
  // (a) recompute: generate the lines, the cells they bound and the points they cross at
  const thirds = thirdsGrid(2)
  assert.equal(thirds.cells, 9, 'rule_of_thirds_power_points: 3 · 3 = 9 cells')
  assert.equal(thirds.powerPoints, 4, 'and 2 · 2 = 4 crossings where the eye rests')
  assert.equal(thirds.cells, 3 * 3)
  assert.equal(thirds.powerPoints, 2 * 2)

  // (b) mutate: halve the lines and both counts must move
  const halved = thirdsGrid(1)
  assert.deepEqual([halved.cells, halved.powerPoints], [4, 1], 'one line each way: four cells, one centre point')
  assert.notEqual(halved.cells, 9)
  assert.notEqual(halved.powerPoints, 4)
  assert.throws(() => assert.deepEqual(thirdsGrid(1), { cells: 9, powerPoints: 4 }))
})

test('crossfade_overlap — the dissolve is inclusion–exclusion on the timeline; a butt cut must not span 84', () => {
  // (a) recompute: occupy the timeline as a SET of frame indices, so the span is counted, not formulated
  const span = timelineSpan(48, 12)
  assert.equal(span, 84, 'crossfade_overlap: 48 + 48 − 12 = 84, arrived at by occupying frames')
  assert.equal(span, 48 + 48 - 12)
  // the second conjunct, 3 % 9 = 3: a trim smaller than its handle is left whole by the handle
  assert.equal(3 % 9, 3, 'a 3-frame trim inside a 9-frame handle is the trim itself')

  // (b) mutate: drop the overlap, or double-count it, and the span must miss 84
  assert.equal(timelineSpan(48, 0), 96, 'a butt cut occupies both clips in full')
  assert.notEqual(timelineSpan(48, 0), 84, 'forgetting the subtraction is exactly the 96 the theorem denies')
  assert.notEqual(timelineSpan(48, 24), 84, 'a longer dissolve is a shorter timeline, not the same one')
  assert.notEqual(9 % 3, 3, 'and the residue is order-sensitive: swapping the operands gives 0')
  assert.throws(() => assert.equal(timelineSpan(48, 0), 84))
})

test('audio_samples_per_frame — 48000 samples chop evenly into 24 frames; 44100 must leave a remainder', () => {
  // (a) recompute: chop the second of audio into frame-sized chunks and check the chunks, not the quotient
  const chopped = chunkAudio(48000, 24)
  assert.equal(chopped.per, 2000, 'audio_samples_per_frame: 48000 / 24 = 2000 samples a frame')
  assert.equal(chopped.leftOver, 0, 'and 48000 % 24 = 0 — nothing is left over')
  assert.equal(chopped.even, true, 'so a cut can land exactly on a sample')
  const rebuilt = [...Array(24).keys()].map(() => chopped.per).reduce((a, b) => a + b, 0)
  assert.equal(rebuilt, 48000, 'the 24 chunks put the whole second back together')

  // (b) mutate: change the sample rate and the even landing must be lost
  const cd = chunkAudio(44100, 24)
  assert.deepEqual([cd.per, cd.leftOver, cd.even], [1837, 12, false], '44100 leaves 12 samples over the frames')
  assert.notEqual(44100 % 24, 0, 'so a cut at a frame boundary falls between samples')
  assert.notEqual(cd.per, 2000)
  assert.throws(() => assert.equal(chunkAudio(44100, 24).leftOver, 0))
})

test('frame_ring_undo_involutive — every stride of the 24-frame ring undoes itself; in a ring of 25 it must not', () => {
  // (a) recompute: find the units by coprimality, then apply each stride PERMUTATION twice to all 24 frames
  const home = [...Array(24).keys()]
  const units = unitsOf(24)
  assert.deepEqual(units, [1, 5, 7, 11, 13, 17, 19, 23], 'the invertible strides of the 24-frame ring')
  for (const u of units) {
    const once = strideMap(u, 24)
    const twice = once.map((x) => once[x])
    assert.deepEqual(twice, home, `frame_ring_undo_involutive: stepping by ${u} twice brings every frame home`)
    assert.equal((u * u) % 24, 1, `and the same fact as a residue: ${u}² ≡ 1 (mod 24)`)
    if (u !== 1) assert.notDeepEqual(once, home, `stride ${u} really moves the footage first`)
  }

  // (b) mutate: change the modulus and the involution must break
  const m = 25
  const broken = strideMap(3, m)
  assert.notDeepEqual(broken.map((x) => broken[x]), [...Array(m).keys()],
    'in a ring of 25 the stride 3 applied twice is the stride 9 — the footage does not come home')
  assert.notEqual((3 * 3) % m, 1)
  const twenty = strideMap(3, 20)
  assert.notDeepEqual(twenty.map((x) => twenty[x]), [...Array(20).keys()], 'nor at 20 fps')
  assert.throws(() => assert.equal((3 * 3) % 25, 1))
})

test('reverse_cut_is_undone_by_itself — reversing a 24-frame shot twice restores it; once, or with a slip, must not', () => {
  // (a) recompute: reverse the actual footage twice
  const shot = [...Array(24).keys()]
  const once = [...shot].reverse()
  const twice = [...once].reverse()
  assert.deepEqual(twice, shot, 'reverse_cut_is_undone_by_itself: the reverse cut is its own undo')
  assert.equal(twice.length, 24)
  assert.deepEqual([once[0], once[23]], [23, 0], 'the single reverse really did turn the shot around')

  // (b) mutate: stop one reversal short, or slip a frame between them, and the shot must not come home
  assert.notDeepEqual(once, shot, 'one reversal is not an undo')
  const slipped = [...once.slice(1), once[0]].reverse()
  assert.notDeepEqual(slipped, shot, 'a one-frame slip survives the second reversal')
  const dropped = [...once.slice(0, 23)].reverse()
  assert.notDeepEqual(dropped, shot, 'and a lost frame is never restored by reversing again')
  assert.throws(() => assert.deepEqual([...shot].reverse(), shot))
})

test('hour_of_film_is_a_day_of_seconds — the hour of frames and the day of seconds are counted apart and meet at 86400', () => {
  // (a) recompute BOTH sides independently, each by its own accumulation, then compare them
  let framesInAnHour = 0
  for (let minute = 0; minute < 60; minute++) framesInAnHour += timelineFrames(24, 60).length
  assert.equal(framesInAnHour, 86400, 'sixty minutes of 24 fps footage, minute by minute')

  let secondsInADay = 0
  for (let hour = 0; hour < 24; hour++) secondsInADay += 60 * 60
  assert.equal(secondsInADay, 86400, 'twenty-four hours of seconds, hour by hour')
  assert.equal(framesInAnHour, secondsInADay,
    'hour_of_film_is_a_day_of_seconds: frame for second, the same product 24 · 60 · 60 read two ways')
  assert.equal(24 * 3600, 86400, 'and the second sealed form of the same product')

  // (b) mutate: change the rate and the two accumulations must part company
  let atTwentyFive = 0
  for (let minute = 0; minute < 60; minute++) atTwentyFive += timelineFrames(25, 60).length
  assert.equal(atTwentyFive, 90000)
  assert.notEqual(atTwentyFive, secondsInADay, 'an hour at 25 fps is 90000 frames — no longer a day of seconds')
  assert.throws(() => assert.equal(atTwentyFive, 86400))
})

test('dropframe_is_one_thousandth — the hour drops exactly a thousandth of its frame-numbers; no-exemption must not', () => {
  // (a) recompute: build the nominal hour, apply the drop rule to it, and take the ratio
  const nominal = 30 * 60 * 60
  assert.equal(nominal, 108000, 'an hour of nominal 30 fps holds 108000 frame-numbers')
  assert.equal(108 * 1000, nominal, 'which is 1000 · 108 — the captain\'s number as the thousandth')
  const dropped = droppedInHour(2, 10)
  assert.equal(dropped, 108)
  assert.equal(nominal - dropped, 107892, 'dropframe_is_one_thousandth: 108000 − 108 = 107892 remain')
  assert.equal(nominal / dropped, 1000, 'and the drop is exactly one thousandth of the hour')

  // (b) mutate: drop at every minute and the thousandth must be lost
  const greedy = droppedInHour(2, 0)
  assert.equal(nominal - greedy, 107880)
  assert.notEqual(nominal - greedy, 107892, 'a rule with no exemption leaves the wrong number of frames')
  assert.notEqual(nominal / greedy, 1000, 'and the ratio is 900, not a thousandth')
  assert.notEqual(30 * 60 * 59, 108000, 'nor does an hour one minute short hold the nominal count')
  assert.throws(() => assert.equal(nominal / droppedInHour(2, 0), 1000))
})

test('angle_of_the_cut — six 30° moves reach the 180° axis; six moves of any other minimum must not', () => {
  // (a) recompute: turn the camera in 30° steps and count the moves that land on the axis
  assert.equal(arcAfter(30, 6), 180, 'angle_of_the_cut: 30 · 6 = 180, accumulated a move at a time')
  const moves = [...Array(24).keys()].map((i) => i + 1).filter((n) => arcAfter(30, n) === 180)
  assert.deepEqual(moves, [6], 'exactly one number of 30° moves lands on the axis, and it is six')
  assert.ok(arcAfter(30, 5) < 180 && arcAfter(30, 7) > 180, 'five moves fall short and seven overshoot')

  // (b) mutate: change the minimum step and six moves must miss the axis
  assert.equal(arcAfter(29, 6), 174)
  assert.notEqual(arcAfter(29, 6), 180, 'a step below the 30° minimum never reaches the line in six moves')
  assert.notEqual(arcAfter(20, 6), 180, 'nor does a 20° step — that one needs nine')
  assert.equal(arcAfter(20, 9), 180)
  assert.notEqual(arcAfter(30, 5), 180)
  assert.throws(() => assert.equal(arcAfter(29, 6), 180))
})
