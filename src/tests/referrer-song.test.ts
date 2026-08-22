// referrer-song — SIX DOORS, MEASURED SWEETNESS, NO PAGE WITHOUT A NEIGHBOUR
//
// Lead 77 as tests: the door pick is deterministic and total (every visitor admitted, the same somewhere always
// the same door), all six doors are genuinely reachable (a door no referrer can open would be a verse nobody
// hears), consonance is a measure with the sealed ordering (unison sweeter than octave sweeter than fifth — as
// NUMBERS, not opinions), the cycle wraps totally in both directions, and the greeting is bytes that recompute —
// the same referrer hears the same song forever, and different doors sound different songs. The controls refuse:
// an empty cycle throws by name.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ROUND, DOORS, doorOf, stepOf, cycleStep, referrerSong } from '../index.js'
import { audioHandleOf } from '../tts/synth.js'

test('the six doors are the six rotations of the sealed round, each a rotation of one melody', () => {
  assert.equal(DOORS.length, 6)
  assert.equal(DOORS[0], ROUND)
  for (const d of DOORS) assert.ok((ROUND + ROUND).includes(d), `${d} is a rotation of ${ROUND}`)
  assert.equal(new Set(DOORS).size, 6, 'six distinct doors')
})

test('the door pick is deterministic and admits every visitor', () => {
  const a = doorOf('https://example.org/path')
  const b = doorOf('https://example.org/path')
  assert.deepEqual(a, b, 'the same somewhere, the same door, forever')
  assert.ok(a.door >= 0 && a.door < 6)
  assert.equal(a.verse.length, 6)
  assert.equal(doorOf('').door >= 0, true, 'even the empty referrer gets a door — folded, not judged')
})

test('all six doors are reachable — no verse nobody hears', () => {
  const seen = new Set<number>()
  for (let i = 0; i < 200 && seen.size < 6; i++) seen.add(doorOf('visitor-' + i).door)
  assert.equal(seen.size, 6, 'two hundred visitors open every door')
})

test('consonance is the sealed ladder — unison 2, octave 3, fifth 5, in that order, as numbers', () => {
  assert.equal(stepOf('0aaaaaaa', '0aaaaaaa').consonance, 2, 'unison')
  assert.equal(stepOf('0aaaaaaa', '1aaaaaaa').consonance, 3, 'octave: tiles 0→1 sound 432→864')
  assert.equal(stepOf('1aaaaaaa', '2aaaaaaa').consonance, 5, 'fifth: 864:1296 reduces to 2:3')
  const unison = stepOf('3aaaaaaa', '3aaaaaaa').consonance
  const octave = stepOf('3aaaaaaa', '7aaaaaaa').consonance
  assert.ok(unison < octave, 'the ladder orders itself')
})

test('the cycle is total both ways and the last page wraps home', () => {
  const n = 1759
  assert.equal(cycleStep(n, n - 1).next, 0, 'the last page\'s next is the first')
  assert.equal(cycleStep(n, 0).prev, n - 1, 'the first page\'s prev is the last')
  for (const k of [0, 1, 878, n - 1]) {
    const { next, prev } = cycleStep(n, k)
    assert.ok(next >= 0 && next < n && prev >= 0 && prev < n)
  }
  assert.throws(() => cycleStep(0, 0), /at least one page/, 'the empty cycle is refused by name')
})

test('the greeting is bytes that recompute — same referrer same song, different doors different songs', () => {
  const a = referrerSong('https://example.org')
  const b = referrerSong('https://example.org')
  assert.equal(a.audioHandle, b.audioHandle, 'the greeting is deterministic')
  assert.equal(audioHandleOf(a.audio), a.audioHandle, 'and its receipt recomputes from the bytes alone')
  // find a visitor with a different door and require a different song
  let other = null
  for (let i = 0; i < 50; i++) { const c = doorOf('visitor-' + i); if (c.door !== a.door.door) { other = 'visitor-' + i; break } }
  assert.ok(other, 'some visitor enters by another door')
  assert.notEqual(referrerSong(other!).audioHandle, a.audioHandle, 'another door is audibly another greeting')
})
