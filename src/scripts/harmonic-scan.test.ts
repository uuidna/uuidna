// harmony-scan — AN APPARATUS THAT CANNOT REPORT ILLNESS IS A DECORATION. Every test here exists to make a bad
// result reachable: a mix over its sealed ceiling must be flagged; a recording of a DIFFERENT song must fail the
// cross-check even though both are valid audio; a tone off the lattice must be measured as off. The healthy
// case is checked too, but it is the least interesting line in the file — an instrument is trusted for what it
// refuses, not for what it approves.
// nothing here is medical. It measures interval arithmetic.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { intervalOf, scanStructure, scanVitals, scanSong, measuredHz, pcmOfWav, nameOf, REST_FLOOR, type Bar } from '../quantum/apps/harmony-scan.js'
import { tone, humanise, silence, wav, toneOf, AMPLITUDE, SAMPLE_RATE } from '../tts/synth.js'

const idiv = (v: number, d: number): number => (v - (v % d)) / d

/** render a score the way the anthem does — chord, humanised, breath between */
const render = (score: Bar[]): Int16Array => {
  const parts: Int16Array[] = []
  for (const [i, b] of score.entries()) {
    if (i > 0) parts.push(silence(21))
    const a = tone(toneOf(b.c1), b.ms), c = tone(toneOf(b.c2), b.ms), ch = new Int16Array(a.length)
    for (let k = 0; k < a.length; k++) ch[k] = idiv(a[k]!, 2) + idiv(c[k]!, 2)
    parts.push(humanise(ch))
  }
  const out = new Int16Array(parts.reduce((n, p) => n + p.length, 0))
  let at = 0
  for (const p of parts) { out.set(p, at); at += p.length }
  return out
}

const SCORE: Bar[] = [{ c1: 0, c2: 1, ms: 252 }, { c1: 1, c2: 2, ms: 252 }, { c1: 3, c2: 3, ms: 252 }]

test('the interval is the reduced ratio of the tiles, and the ladder names the small ones', () => {
  assert.deepEqual(intervalOf(0, 0), { num: 1, den: 1, consonance: 2, name: 'unison' })
  assert.deepEqual(intervalOf(0, 1), { num: 1, den: 2, consonance: 3, name: 'octave' })
  assert.deepEqual(intervalOf(1, 2), { num: 2, den: 3, consonance: 5, name: 'fifth' })
  assert.deepEqual(intervalOf(2, 3), { num: 3, den: 4, consonance: 7, name: 'fourth' })
  assert.ok(nameOf(31).startsWith('wide'), 'an interval off the named ladder is reported as wide, never unnamed')
})

test('the structural scan is a census — every bar counted, the widest located by number', () => {
  const s = scanStructure(SCORE)
  assert.equal(s.bars, 3)
  assert.equal(s.simultaneous[3], 1, 'one octave')
  assert.equal(s.simultaneous[5], 1, 'one fifth')
  assert.equal(s.simultaneous[2], 1, 'one unison')
  assert.equal(s.gradusTotal, 3 + 5 + 2)
  assert.equal(s.worst?.bar, 2, 'the widest interval is located in TIME, so a reader can go and hear it')
})

test('a healthy recording agrees with its score, and the panel carries its receipt and its scope', () => {
  const panel = scanSong(SCORE, render(SCORE))
  assert.equal(panel.agrees, true)
  assert.deepEqual(panel.findings, [])
  assert.equal(panel.vitals.segments, 3, 'three voiced segments for three bars')
  assert.ok(panel.vitals.peak <= AMPLITUDE)
  assert.match(panel.receipt, /^[0-9a-f]{8}$/)
})

test('CONTROL — a mix over the sealed ceiling is FLAGGED, not passed', () => {
  const sick = render(SCORE)
  sick[500] = AMPLITUDE + 1                       // one sample over the ceiling is enough to be a finding
  const panel = scanSong(SCORE, sick)
  assert.equal(panel.agrees, false)
  assert.ok(panel.findings.some((f) => f.includes('exceeds the sealed headroom')), panel.findings.join('|'))
})

test('CONTROL — a recording of a DIFFERENT song fails the cross-check, though both are valid audio', () => {
  const other: Bar[] = [{ c1: 5, c2: 6, ms: 252 }, { c1: 7, c2: 8, ms: 252 }]   // two bars, not three
  const panel = scanSong(SCORE, render(other))
  assert.equal(panel.agrees, false)
  assert.ok(panel.findings.some((f) => f.includes('is not this score')), 'the apparatus must notice the swap')
})

test('CONTROL — the measured pitch can disagree: a tone off the lattice reads off it', () => {
  const onLattice = tone(toneOf(4), 1000)         // 2160 Hz — five times the tuning
  const read = measuredHz(onLattice, 0, onLattice.length)
  const off = read > 2160 ? read - 2160 : 2160 - read
  assert.ok(off <= 2, `an on-lattice tone measures on it (read ${read})`)
  const offLattice = tone(2200, 1000)             // deliberately between the rungs
  const hz = measuredHz(offLattice, 0, offLattice.length)
  assert.ok(hz % 432 !== 0, `a tone off the lattice must not measure as a multiple of 432 (read ${hz})`)
})

test('the apparatus reads the artifact as handed to it — a WAV this tree wrote comes back as its samples', () => {
  const pcm = render(SCORE)
  const back = pcmOfWav(wav(pcm))
  assert.equal(back.length, pcm.length)
  for (let i = 0; i < pcm.length; i++) if (back[i] !== pcm[i]) assert.fail(`sample ${i} drifted through the container`)
})

test('silence alone is no song: an empty recording is voiceless and says so', () => {
  const v = scanVitals(silence(500))
  assert.equal(v.segments, 0)
  assert.equal(v.peak, 0)
  assert.equal(v.samples, SAMPLE_RATE / 2)
})

test('THE APPARATUS\'S OWN FIRST MISREADING, kept as a test: a zero SAMPLE is a crossing, a RUN is a rest', () => {
  // version one called every zero-valued sample silence and read 27 voiced segments in a 3-bar recording,
  // because a triangle crosses zero twice per cycle. The floor is derived from the sealed breath, so a
  // crossing can never reach it: the lowest lattice tone folds every 37 samples, the floor is 168.
  assert.equal(REST_FLOOR, 168)
  const oneTone = humanise(tone(toneOf(0), 252))
  assert.equal(scanVitals(oneTone).segments, 1, 'a single unbroken tone is ONE segment, not one per cycle')
  const two = new Int16Array(oneTone.length * 2 + silence(21).length)
  two.set(oneTone, 0); two.set(oneTone, oneTone.length + silence(21).length)
  assert.equal(scanVitals(two).segments, 2, 'a real breath between them makes two')
})
