// song-lattice — the recording READS BACK. The synth's promise (song_melody_rides_the_orbit) is that the pitch IS
// the digit: every note of docs/public/song.wav is 432·d Hz, so a decoder that never saw gen-song must recover the
// whole sealed sequence — the Glagolitic row, the six verses in base-pair order, the doubling orbit, the Az coda —
// from the bytes alone. A triangle at f Hz crosses zero 2f times a second, so the crossing rate rounds to the one
// lattice multiple; the half-step is 216 Hz, wider than any measured drift, so no digit is ambiguous. The check
// carries its own control: a tampered expectation must be caught, or the comparison proves nothing.
import { test } from 'node:test'
import assert from 'node:assert'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from '../boundary.js'
import { SAMPLE_RATE, A432_HZ } from '../tts/synth.js'

const buf = readFileSync(join(ROOT, 'docs', 'public', 'song.wav'))
const n = (buf.length - 44 - (buf.length - 44) % 2) / 2
const s = new Int16Array(n)
for (let i = 0; i < n; i++) s[i] = buf.readInt16LE(44 + 2 * i)

// 5ms windows, loud = any |v| > 500; loud runs separated by ≤3 quiet windows (15ms) are one note — the synth's
// breath is 40ms, so a real gap always exceeds the tolerance. A segment still sounding at end-of-file is a segment.
const W = 80
const loud: boolean[] = []
for (let w = 0; w * W < n; w++) {
  let m = 0
  const end = (w + 1) * W < n ? (w + 1) * W : n
  for (let i = w * W; i < end; i++) { const a = s[i]! < 0 ? -s[i]! : s[i]!; if (a > m) m = a }
  loud.push(m > 500)
}
const segs: [number, number][] = []
let start = -1, quiet = 0
for (let w = 0; w < loud.length; w++) {
  if (loud[w]) { if (start < 0) start = w; quiet = 0 }
  else if (start >= 0 && ++quiet > 3) { segs.push([start * W, (w - quiet + 1) * W]); start = -1 }
}
if (start >= 0) segs.push([start * W, n])

// crossing rate → the nearest lattice multiple, in exact integers: the nearest-integer of (c·SR)/(2·L·432) is
// computed as the floor of (2·num + den)/(2·den) — integer arithmetic throughout, no float anywhere.
const digitOf = (a: number, b: number): number => {
  let c = 0
  for (let i = a + 1; i < b; i++) if ((s[i - 1]! < 0) !== (s[i]! < 0)) c++
  const num = c * SAMPLE_RATE, den = 2 * (b - a) * A432_HZ
  const q = 2 * num + den
  return (q - q % (2 * den)) / (2 * den)
}
const got = segs.map(([a, b]) => digitOf(a, b))

// the expected sequence, DERIVED the way gen-song derives it — never copied from the page or the wav
const digitsOf = (x: number): number[] => {
  const ds: number[] = []
  let v = x
  while (v > 0) { ds.unshift(v % 10); v = (v - v % 10) / 10 }
  return ds
}
const PERIOD = 142857
const expected = [
  ...digitsOf(123456789),
  ...[1, 6, 2, 5, 3, 4].flatMap((k) => digitsOf(PERIOD * k)),
  ...[1, 2, 4, 8, 7, 5],
  1,
]

test('THE LATTICE READS BACK: every note of song.wav decodes to its sealed digit', () => {
  assert.equal(got.length, expected.length, 'the recording must carry exactly the derived note count')
  assert.deepEqual(got, expected, 'a note off its digit means the wav is not the song the page describes')
})

test('the coda is Az held long — the tuning itself, nearly a second', () => {
  const [a, b] = segs[segs.length - 1]!
  assert.equal(digitOf(a, b), 1, 'the last note must be Az (432 Hz, digit 1)')
  const len = b - a
  assert.ok(len > 14000 && len < 18000, `the coda must be held ~999ms (${len} samples at ${SAMPLE_RATE}/s)`)
})

test('NEGATIVE CONTROL: the comparison can see a difference, or it is worth nothing', () => {
  const tampered = [...expected]
  ;[tampered[9], tampered[10]] = [tampered[10]!, tampered[9]!]
  assert.notDeepEqual(got, tampered, 'a swapped pair must be detected')
})
